import { Product } from '@/types';
import { EstimatedEarAnchors } from './faceDetection';

export interface OverlayRenderSettings {
  offsetX: number;     // manual micro-adjustment in pixels (-150 to +150)
  offsetY: number;     // manual micro-adjustment in pixels (-150 to +150)
  leftOffsetX: number; // independent left ear adjustment
  leftOffsetY: number;
  rightOffsetX: number; // independent right ear adjustment
  rightOffsetY: number;
  scaleMultiplier: number; // 0.4x to 1.6x
  rotationDeg: number; // -45 to +45
  shadowOpacity: number; // 0 to 0.6
  showLeftEar: boolean;
  showRightEar: boolean;
}

export const DEFAULT_RENDER_SETTINGS: OverlayRenderSettings = {
  offsetX: 0,
  offsetY: 0,
  leftOffsetX: 0,
  leftOffsetY: 0,
  rightOffsetX: 0,
  rightOffsetY: 0,
  scaleMultiplier: 1.0,
  rotationDeg: 0,
  shadowOpacity: 0.28,
  showLeftEar: true,
  showRightEar: true
};

/**
 * Loads an image from URL or data URL into an HTMLImageElement
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image asset from: ${src}`));
    img.src = src;
  });
}

/**
 * Renders the virtual jewelry try-on onto a target HTMLCanvasElement.
 * Uses high-DPI scaling, crisp imageSmoothing, realistic drop-shadowing, and precise anatomical positioning.
 */
export async function renderTryOnCanvas({
  targetCanvas,
  portraitImage,
  overlayImage,
  anchors,
  product,
  settings = DEFAULT_RENDER_SETTINGS
}: {
  targetCanvas: HTMLCanvasElement;
  portraitImage: HTMLImageElement;
  overlayImage: HTMLImageElement;
  anchors: EstimatedEarAnchors;
  product: Product;
  settings?: OverlayRenderSettings;
}): Promise<void> {
  const ctx = targetCanvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Could not acquire 2D canvas context');

  // Match native portrait resolution for maximum clarity (no pixelation)
  const width = portraitImage.naturalWidth || portraitImage.width || 800;
  const height = portraitImage.naturalHeight || portraitImage.height || 1000;

  if (targetCanvas.width !== width || targetCanvas.height !== height) {
    targetCanvas.width = width;
    targetCanvas.height = height;
  }

  // Ensure high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 1. Draw base portrait at full native clarity
  ctx.drawImage(portraitImage, 0, 0, width, height);

  // 2. Earring sizing & placement relative to detected face scale
  const { anchorConfig } = product;
  const baseEarringWidth = width * anchors.faceWidth * anchorConfig.defaultScale * settings.scaleMultiplier;
  const overlayAspect = (overlayImage.naturalHeight || 340) / (overlayImage.naturalWidth || 240);
  const baseEarringHeight = baseEarringWidth * overlayAspect;

  // Manual & automatic roll angles
  const manualRotRad = (settings.rotationDeg * Math.PI) / 180;
  const totalLeftRotation = anchors.rollAngle + manualRotRad;
  const totalRightRotation = anchors.rollAngle + manualRotRad;

  // Anchor point within overlay asset
  const pivotX = baseEarringWidth * anchorConfig.anchorPoint.x;
  const pivotY = baseEarringHeight * anchorConfig.anchorPoint.y;

  // Render left earring (viewer's left side)
  if (settings.showLeftEar) {
    const lx =
      anchors.leftEar.x * width +
      settings.offsetX +
      settings.leftOffsetX +
      anchorConfig.horizontalOffset * width;
    const ly =
      anchors.leftEar.y * height +
      settings.offsetY +
      settings.leftOffsetY +
      anchorConfig.verticalOffset * height;

    renderSingleEarring({
      ctx,
      overlayImage,
      x: lx,
      y: ly,
      width: baseEarringWidth,
      height: baseEarringHeight,
      pivotX,
      pivotY,
      rotation: totalLeftRotation,
      isFlipped: false,
      shadowOpacity: settings.shadowOpacity
    });
  }

  // Render right earring (viewer's right side)
  if (settings.showRightEar) {
    const rx =
      anchors.rightEar.x * width +
      settings.offsetX +
      settings.rightOffsetX +
      anchorConfig.horizontalOffset * width;
    const ry =
      anchors.rightEar.y * height +
      settings.offsetY +
      settings.rightOffsetY +
      anchorConfig.verticalOffset * height;

    renderSingleEarring({
      ctx,
      overlayImage,
      x: rx,
      y: ry,
      width: baseEarringWidth,
      height: baseEarringHeight,
      pivotX,
      pivotY,
      rotation: totalRightRotation,
      isFlipped: true,
      shadowOpacity: settings.shadowOpacity
    });
  }
}

interface SingleEarringParams {
  ctx: CanvasRenderingContext2D;
  overlayImage: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  pivotX: number;
  pivotY: number;
  rotation: number;
  isFlipped: boolean;
  shadowOpacity: number;
}

function renderSingleEarring({
  ctx,
  overlayImage,
  x,
  y,
  width,
  height,
  pivotX,
  pivotY,
  rotation,
  isFlipped,
  shadowOpacity
}: SingleEarringParams) {
  ctx.save();

  // Move origin to estimated earlobe anchor
  ctx.translate(x, y);
  ctx.rotate(rotation);

  if (isFlipped) {
    ctx.scale(-1, 1);
  }

  // Draw delicate contact shadow on skin for grounded luxury realism
  if (shadowOpacity > 0) {
    ctx.save();
    ctx.shadowColor = `rgba(18, 12, 8, ${shadowOpacity})`;
    ctx.shadowBlur = Math.max(4, width * 0.08);
    ctx.shadowOffsetX = isFlipped ? -width * 0.03 : width * 0.03;
    ctx.shadowOffsetY = height * 0.04;

    ctx.drawImage(overlayImage, -pivotX, -pivotY, width, height);
    ctx.restore();
  }

  // Draw the actual jewelry overlay
  ctx.drawImage(overlayImage, -pivotX, -pivotY, width, height);

  ctx.restore();
}

/**
 * Exports current canvas state to high-quality PNG data URL
 */
export function exportCanvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png', 1.0);
}

/**
 * Triggers native browser download of generated image
 */
export function downloadCanvasImage(canvas: HTMLCanvasElement, filename: string): void {
  const dataUrl = exportCanvasToDataUrl(canvas);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
