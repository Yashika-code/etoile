import type { FaceLandmarker as FaceLandmarkerType } from '@mediapipe/tasks-vision';

let faceLandmarkerInstance: FaceLandmarkerType | null = null;
let loadPromise: Promise<FaceLandmarkerType | null> | null = null;

export interface DetectionPoint {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  z?: number;
}

export interface EstimatedEarAnchors {
  leftEar: DetectionPoint;   // Earlobe anchor on viewer's left
  rightEar: DetectionPoint;  // Earlobe anchor on viewer's right
  faceWidth: number;         // distance between temples / ear roots
  faceHeight: number;        // forehead to chin
  rollAngle: number;         // tilt in radians
  confidence: 'high' | 'medium' | 'estimated';
  warningMessage?: string;
}

/**
 * Initializes Google MediaPipe Face Landmarker via client-side WebAssembly.
 * Silences internal diagnostic messages cleanly.
 */
export async function getFaceLandmarker(): Promise<FaceLandmarkerType | null> {
  if (faceLandmarkerInstance) {
    return faceLandmarkerInstance;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    const origError = console.error;
    const origWarn = console.warn;

    const filterLog = (args: any[]) => {
      const msg = args.map((a) => (typeof a === 'string' ? a : '')).join(' ');
      return msg.includes('XNNPACK') || msg.includes('TensorFlow Lite') || msg.includes('INFO:');
    };

    console.error = (...args: any[]) => {
      if (!filterLog(args)) origError.apply(console, args);
    };
    console.warn = (...args: any[]) => {
      if (!filterLog(args)) origWarn.apply(console, args);
    };

    try {
      const { FilesetResolver, FaceLandmarker } = await import('@mediapipe/tasks-vision');

      try {
        const vision = await FilesetResolver.forVisionTasks('/mediapipe/wasm');
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: '/mediapipe/models/face_landmarker.task',
            delegate: 'GPU'
          },
          outputFaceBlendshapes: false,
          runningMode: 'IMAGE',
          numFaces: 1
        });
        faceLandmarkerInstance = landmarker;
        return landmarker;
      } catch {
        try {
          const vision = await FilesetResolver.forVisionTasks('/mediapipe/wasm');
          const landmarker = await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: '/mediapipe/models/face_landmarker.task',
              delegate: 'CPU'
            },
            outputFaceBlendshapes: false,
            runningMode: 'IMAGE',
            numFaces: 1
          });
          faceLandmarkerInstance = landmarker;
          return landmarker;
        } catch {
          const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
          );
          const landmarker = await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
              delegate: 'CPU'
            },
            outputFaceBlendshapes: false,
            runningMode: 'IMAGE',
            numFaces: 1
          });
          faceLandmarkerInstance = landmarker;
          return landmarker;
        }
      }
    } catch {
      return null;
    } finally {
      console.error = origError;
      console.warn = origWarn;
    }
  })();

  return loadPromise;
}

function createNormalizedCanvas(
  source: HTMLImageElement | HTMLCanvasElement
): HTMLCanvasElement {
  if (source instanceof HTMLCanvasElement) {
    return source;
  }

  const canvas = document.createElement('canvas');
  const nw = source.naturalWidth || source.width || 800;
  const nh = source.naturalHeight || source.height || 1000;

  const maxDim = 1280;
  let targetWidth = nw;
  let targetHeight = nh;

  if (targetWidth > maxDim || targetHeight > maxDim) {
    const scale = maxDim / Math.max(targetWidth, targetHeight);
    targetWidth = Math.round(targetWidth * scale);
    targetHeight = Math.round(targetHeight * scale);
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
  }

  return canvas;
}

/**
 * Calculates anatomically validated earlobe piercing positions.
 * 
 * MediaPipe Face Mesh landmark mapping:
 * - Landmark 234: Subject's right preauricular root (viewer's left tragus level)
 * - Landmark 454: Subject's left preauricular root (viewer's right tragus level)
 * - Landmark 132: Subject's right gonion / mandibular jaw angle (viewer's left)
 * - Landmark 361: Subject's left gonion / mandibular jaw angle (viewer's right)
 * - Landmark 172: Lower earlobe margin (subject's right)
 * - Landmark 397: Lower earlobe margin (subject's left)
 * 
 * In real human portraits, the pierced earlobe hangs:
 * - Below the tragus level (towards the angle of the jaw).
 * - Distinctly lateral (outward) from the cheek contour by ~0.08 to 0.11 of face width.
 */
export async function detectEarAnchors(
  imageSource: HTMLImageElement | HTMLCanvasElement
): Promise<EstimatedEarAnchors> {
  const origError = console.error;
  console.error = (...args: any[]) => {
    const msg = args.map((a) => (typeof a === 'string' ? a : '')).join(' ');
    if (msg.includes('XNNPACK') || msg.includes('INFO:')) return;
    origError.apply(console, args);
  };

  try {
    const landmarker = await getFaceLandmarker();
    if (!landmarker) {
      return getGeometricPortraitFallback(imageSource);
    }

    const normalizedCanvas = createNormalizedCanvas(imageSource);
    const result = landmarker.detect(normalizedCanvas);

    if (!result || !result.faceLandmarks || result.faceLandmarks.length === 0) {
      return getGeometricPortraitFallback(imageSource);
    }

    const landmarks = result.faceLandmarks[0];

    // Tragus & ear roots
    const ptRightEarTragus = landmarks[234] || landmarks[127]; // Viewer's Left
    const ptLeftEarTragus = landmarks[454] || landmarks[356];  // Viewer's Right
    const ptRightJaw = landmarks[132] || landmarks[58];        // Viewer's Left Jaw Angle
    const ptLeftJaw = landmarks[361] || landmarks[288];        // Viewer's Right Jaw Angle

    // Additional lower ear boundary landmarks when available in 468 mesh
    const ptRightLowerLobe = landmarks[172] || landmarks[132];
    const ptLeftLowerLobe = landmarks[397] || landmarks[361];

    const ptChin = landmarks[152];
    const ptForehead = landmarks[10];
    const ptEyeLeft = landmarks[263];
    const ptEyeRight = landmarks[33];

    // Head roll calculation from outer eye corners
    const deltaX = ptEyeLeft.x - ptEyeRight.x;
    const deltaY = ptEyeLeft.y - ptEyeRight.y;
    const rollAngle = Math.atan2(deltaY, deltaX);

    // Face metrics
    const faceWidth = Math.hypot(ptLeftEarTragus.x - ptRightEarTragus.x, ptLeftEarTragus.y - ptRightEarTragus.y);
    const faceHeight = Math.hypot(ptChin.x - ptForehead.x, ptChin.y - ptForehead.y);

    // Anatomical earlobe piercing offsets:
    // 1. Vertical: Earlobe hangs midway between tragus and jaw angle, approximately +0.10 * faceHeight below tragus
    // 2. Lateral: Piercing is situated on the hanging fleshy lobe, ~0.085 * faceWidth OUTWARD from the tragus
    const lobeVerticalDrop = faceHeight * 0.105;
    const lobeLateralOutward = faceWidth * 0.085;

    const cosRoll = Math.cos(rollAngle);
    const sinRoll = Math.sin(rollAngle);

    // Viewer's Left Ear (Subject's Right):
    // Outward direction is -X in viewer space
    // Downward direction is +Y in viewer space
    const leftAnchorX = ptRightEarTragus.x - cosRoll * lobeLateralOutward + sinRoll * lobeVerticalDrop;
    const leftAnchorY = ptRightEarTragus.y - sinRoll * lobeLateralOutward + cosRoll * lobeVerticalDrop;

    // Viewer's Right Ear (Subject's Left):
    // Outward direction is +X in viewer space
    // Downward direction is +Y in viewer space
    const rightAnchorX = ptLeftEarTragus.x + cosRoll * lobeLateralOutward - sinRoll * lobeVerticalDrop;
    const rightAnchorY = ptLeftEarTragus.y + sinRoll * lobeLateralOutward + cosRoll * lobeVerticalDrop;

    return {
      leftEar: { x: leftAnchorX, y: leftAnchorY },
      rightEar: { x: rightAnchorX, y: rightAnchorY },
      faceWidth,
      faceHeight,
      rollAngle,
      confidence: 'high'
    };
  } catch {
    return getGeometricPortraitFallback(imageSource);
  } finally {
    console.error = origError;
  }
}

/**
 * Standard portrait fallback based on canonical photography head proportions
 */
export function getGeometricPortraitFallback(
  imageSource: HTMLImageElement | HTMLCanvasElement
): EstimatedEarAnchors {
  return {
    leftEar: { x: 0.25, y: 0.54 },
    rightEar: { x: 0.75, y: 0.54 },
    faceWidth: 0.40,
    faceHeight: 0.52,
    rollAngle: 0,
    confidence: 'estimated',
    warningMessage:
      'Standard portrait alignment applied. Click directly on your ears or use Fine Tuning to adjust.'
  };
}
