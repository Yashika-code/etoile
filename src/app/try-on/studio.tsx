'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Upload,
  Camera,
  RefreshCw,
  Download,
  Calendar,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Check,
  X,
  SlidersHorizontal,
  Crosshair
} from 'lucide-react';

import { PRODUCTS, getProductBySlug, formatINR } from '@/data/products';
import { Product } from '@/types';
import {
  detectEarAnchors,
  EstimatedEarAnchors,
  getGeometricPortraitFallback
} from '@/lib/faceDetection';
import {
  renderTryOnCanvas,
  loadImage,
  exportCanvasToDataUrl,
  downloadCanvasImage,
  OverlayRenderSettings,
  DEFAULT_RENDER_SETTINGS
} from '@/lib/canvasRenderer';
import { validateImageFile, readFileAsDataUrl } from '@/lib/imageValidation';

export default function TryOnStudio() {
  const searchParams = useSearchParams();
  const initialProductId = searchParams.get('product') || PRODUCTS[0].id;

  // Selected jewelry item
  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    return getProductBySlug(initialProductId) || PRODUCTS[0];
  });

  // Portrait input state
  const [portraitSource, setPortraitSource] = useState<string | null>(null);
  const [portraitImgElement, setPortraitImgElement] = useState<HTMLImageElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Vision detection & rendering state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [detectedAnchors, setDetectedAnchors] = useState<EstimatedEarAnchors | null>(null);
  const [detectionWarning, setDetectionWarning] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  // Manual micro-adjustments
  const [renderSettings, setRenderSettings] = useState<OverlayRenderSettings>(DEFAULT_RENDER_SETTINGS);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Interactive Click-to-Pin Mode: 'left' | 'right' | null
  const [pinTarget, setPinTarget] = useState<'left' | 'right' | null>(null);

  // Comparison view mode: 'rendered' | 'side-by-side' | 'slider'
  const [viewMode, setViewMode] = useState<'rendered' | 'side-by-side' | 'slider'>('rendered');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // DOM Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Bind video element to mediaStream as soon as camera becomes active
  useEffect(() => {
    if (cameraActive && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch((e) => {
        console.warn('Video play interrupted:', e);
      });
    }
  }, [cameraActive, cameraStream]);

  // Clean up media streams on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Sync selected product if URL query param changes
  useEffect(() => {
    const urlProd = searchParams.get('product');
    if (urlProd) {
      const p = getProductBySlug(urlProd);
      if (p) setSelectedProduct(p);
    }
  }, [searchParams]);

  // Load image element when portraitSource changes
  useEffect(() => {
    if (!portraitSource) {
      setPortraitImgElement(null);
      setDetectedAnchors(null);
      setIsRendered(false);
      return;
    }

    let isMounted = true;
    loadImage(portraitSource)
      .then((img) => {
        if (isMounted) {
          setPortraitImgElement(img);
          processPortraitWithAI(img);
        }
      })
      .catch(() => {
        if (isMounted) {
          setErrorNotice('Could not load the chosen portrait. Please try another image.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [portraitSource]);

  // Trigger re-render whenever selected product, settings, or anchors change
  useEffect(() => {
    if (!portraitImgElement || !detectedAnchors || !canvasRef.current) return;

    let isMounted = true;
    loadImage(selectedProduct.overlayAsset)
      .then((overlayImg) => {
        if (!isMounted || !canvasRef.current || !portraitImgElement) return;

        renderTryOnCanvas({
          targetCanvas: canvasRef.current,
          portraitImage: portraitImgElement,
          overlayImage: overlayImg,
          anchors: detectedAnchors,
          product: selectedProduct,
          settings: renderSettings
        });
        setIsRendered(true);
      })
      .catch((err) => {
        console.error('Failed to render virtual try-on overlay:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedProduct, detectedAnchors, renderSettings, portraitImgElement]);

  // Face Detection Pipeline
  const processPortraitWithAI = async (img: HTMLImageElement) => {
    setIsProcessing(true);
    setErrorNotice(null);
    setDetectionWarning(null);

    try {
      const anchors = await detectEarAnchors(img);
      setDetectedAnchors(anchors);
      if (anchors.warningMessage) {
        setDetectionWarning(anchors.warningMessage);
      }
    } catch {
      const fallbackAnchors = getGeometricPortraitFallback(img);
      setDetectedAnchors(fallbackAnchors);
    } finally {
      setIsProcessing(false);
    }
  };

  // Click-to-Pin Direct Placement Handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !detectedAnchors) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Normalized coordinates on native canvas (0 to 1)
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;

    if (pinTarget === 'left') {
      setDetectedAnchors({
        ...detectedAnchors,
        leftEar: { x: clickX, y: clickY }
      });
      setPinTarget(null);
    } else if (pinTarget === 'right') {
      setDetectedAnchors({
        ...detectedAnchors,
        rightEar: { x: clickX, y: clickY }
      });
      setPinTarget(null);
    } else {
      // Automatic nearest-ear placement on single click
      const distToLeft = Math.hypot(clickX - detectedAnchors.leftEar.x, clickY - detectedAnchors.leftEar.y);
      const distToRight = Math.hypot(clickX - detectedAnchors.rightEar.x, clickY - detectedAnchors.rightEar.y);

      if (distToLeft < distToRight) {
        setDetectedAnchors({
          ...detectedAnchors,
          leftEar: { x: clickX, y: clickY }
        });
      } else {
        setDetectedAnchors({
          ...detectedAnchors,
          rightEar: { x: clickX, y: clickY }
        });
      }
    }
  };

  // 1. File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorNotice(validation.error || 'Invalid image file.');
      return;
    }

    stopCamera();
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPortraitSource(dataUrl);
    } catch {
      setErrorNotice('Error reading file. Please try again.');
    }
  };

  // 2. Sample Demo Portrait Handler
  const handleUseDemoPortrait = () => {
    stopCamera();
    setPortraitSource('/portraits/editorial-model.svg');
  };

  // 3. Camera Capture Handlers
  const startCamera = async () => {
    setCameraError(null);
    setErrorNotice(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam is not supported or permitted in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setCameraStream(stream);
      setCameraActive(true);
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      let msg = 'Could not access camera.';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        msg = 'Camera permission denied. Please enable camera access in your browser address bar.';
      } else if (error.name === 'NotFoundError') {
        msg = 'No camera device detected.';
      }
      setCameraError(msg);
      setCameraActive(false);
    }
  };

  const capturePhotoFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
    stopCamera();
    setPortraitSource(dataUrl);
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  const handleClearPortrait = () => {
    stopCamera();
    setPortraitSource(null);
    setPortraitImgElement(null);
    setDetectedAnchors(null);
    setIsRendered(false);
    setErrorNotice(null);
    setDetectionWarning(null);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const filename = `etoile-${selectedProduct.slug}-tryon.png`;
    downloadCanvasImage(canvasRef.current, filename);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[#C5A880]/20 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Virtual Try-On Salon</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A]">
              Haute Joaillerie Visualization
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#C5A880]/30 text-xs text-[#8C827A] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>Private In-Browser Vision • No Server Uploads</span>
          </div>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Portrait & Try-On Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viewport Frame */}
            <div className="relative w-full bg-[#EFECE6] border border-[#C5A880]/30 shadow-xl overflow-hidden flex items-center justify-center min-h-[460px] sm:min-h-[560px]">
              {/* STATE 1: No Portrait Selected */}
              {!portraitSource && !cameraActive && (
                <div className="p-8 max-w-md text-center space-y-6">
                  <div className="w-16 h-16 bg-white border border-[#C5A880]/40 mx-auto flex items-center justify-center text-[#C5A880]">
                    <Sparkles className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-serif text-2xl text-[#1A1A1A]">Select Your Portrait</h2>
                    <p className="text-xs text-[#8C827A] leading-relaxed">
                      For best results, upload a clear front-facing portrait or snap a photo with your hair pushed behind your ears.
                    </p>
                  </div>

                  {cameraError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 text-left flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{cameraError}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3.5 px-6 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Your Photo</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <button
                      onClick={startCamera}
                      className="w-full py-3.5 px-6 bg-white border border-[#C5A880]/50 text-[#1A1A1A] hover:bg-black/5 text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-[#C5A880]" />
                      <span>Use Live Webcam</span>
                    </button>

                    <button
                      onClick={handleUseDemoPortrait}
                      className="w-full py-2.5 px-6 bg-transparent text-[#8C827A] hover:text-[#1A1A1A] text-xs uppercase tracking-wider font-medium transition-colors border-t border-[#C5A880]/20 pt-3"
                    >
                      Try with Studio Editorial Model
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 2: Live Webcam with verified video streaming */}
              {cameraActive && (
                <div className="relative w-full h-full min-h-[500px] bg-black flex flex-col items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full max-h-[70vh] object-contain -scale-x-100"
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-[50%] h-[70%] border-2 border-dashed border-[#C5A880]/70 rounded-full" />
                  </div>

                  <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-20">
                    <button
                      onClick={capturePhotoFromCamera}
                      className="px-6 py-3 bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#C5A880] text-xs uppercase tracking-widest font-medium flex items-center gap-2 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Capture Photo</span>
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-4 py-3 bg-black/60 text-white text-xs uppercase tracking-widest hover:bg-black/80"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 3: Portrait Loaded & Rendered */}
              {portraitSource && !cameraActive && (
                <div className="relative w-full flex items-center justify-center bg-black/5 p-2">
                  {isProcessing && (
                    <div className="absolute inset-0 bg-[#FAF8F5]/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-4">
                      <RefreshCw className="w-8 h-8 text-[#C5A880] animate-spin" />
                      <div className="text-center space-y-1">
                        <span className="font-serif text-lg text-[#1A1A1A] block">
                          Calibrating Ear Geometry
                        </span>
                        <span className="text-xs text-[#8C827A]">
                          Rendering {selectedProduct.name} onto your portrait...
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Click-to-Pin Banner */}
                  {pinTarget && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#1A1A1A]/90 backdrop-blur-md text-[#FAF8F5] px-4 py-2 text-xs flex items-center gap-2 shadow-lg border border-[#C5A880]">
                      <Crosshair className="w-4 h-4 text-[#C5A880] animate-pulse" />
                      <span>
                        Click directly on your <strong>{pinTarget === 'left' ? "Left Ear (viewer's left)" : "Right Ear (viewer's right)"}</strong> in the photo
                      </span>
                      <button
                        onClick={() => setPinTarget(null)}
                        className="ml-2 text-white/70 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    title="Click anywhere to reposition earrings directly onto your ears"
                    className={`max-w-full max-h-[70vh] object-contain shadow-md cursor-crosshair ${
                      viewMode === 'side-by-side' ? 'hidden' : 'block'
                    }`}
                  />

                  {viewMode === 'slider' && portraitSource && isRendered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center p-2">
                      <div
                        className="relative max-w-full max-h-[70vh] overflow-hidden"
                        style={{
                          width: canvasRef.current?.clientWidth,
                          height: canvasRef.current?.clientHeight
                        }}
                      >
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${sliderPosition}%` }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={portraitSource}
                            alt="Original Portrait"
                            className="w-full h-full object-contain pointer-events-none max-w-none"
                            style={{
                              width: canvasRef.current?.clientWidth,
                              height: canvasRef.current?.clientHeight
                            }}
                          />
                          <div className="absolute top-3 left-3 bg-black/75 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
                            Before
                          </div>
                        </div>

                        <div className="absolute top-3 right-3 bg-black/75 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
                          After (Try-On)
                        </div>

                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-auto cursor-ew-resize flex items-center justify-center shadow-lg"
                          style={{ left: `${sliderPosition}%` }}
                        >
                          <div className="w-7 h-7 rounded-full bg-[#1A1A1A] text-[#C5A880] border border-[#C5A880] flex items-center justify-center text-xs shadow-md">
                            ↔
                          </div>
                        </div>

                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderPosition}
                          onChange={(e) => setSliderPosition(Number(e.target.value))}
                          className="absolute inset-0 opacity-0 cursor-ew-resize pointer-events-auto w-full h-full"
                          aria-label="Comparison slider"
                        />
                      </div>
                    </div>
                  )}

                  {viewMode === 'side-by-side' && portraitSource && (
                    <div className="w-full grid grid-cols-2 gap-2 bg-white p-2">
                      <div className="relative border border-[#C5A880]/30 flex items-center justify-center p-1 bg-[#FAF8F5]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={portraitSource}
                          alt="Original Portrait"
                          className="max-h-[60vh] object-contain"
                        />
                        <span className="absolute top-2 left-2 bg-black/75 text-white text-[9px] uppercase tracking-widest px-2 py-0.5">
                          Original
                        </span>
                      </div>
                      <div className="relative border border-[#C5A880]/30 flex items-center justify-center p-1 bg-[#FAF8F5]">
                        {canvasRef.current && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={exportCanvasToDataUrl(canvasRef.current)}
                            alt="Virtual Try-On"
                            className="max-h-[60vh] object-contain"
                          />
                        )}
                        <span className="absolute top-2 left-2 bg-[#C5A880] text-[#1A1A1A] font-semibold text-[9px] uppercase tracking-widest px-2 py-0.5">
                          Try-On
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {errorNotice && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>{errorNotice}</span>
                </div>
                <button
                  onClick={() => setErrorNotice(null)}
                  className="text-amber-800 hover:text-amber-950"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {detectionWarning && (
              <div className="p-3 bg-stone-100 border border-stone-300 text-xs text-stone-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#C5A880]" />
                <span>{detectionWarning}</span>
              </div>
            )}

            {/* Viewport Control Bar */}
            {portraitSource && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white border border-[#C5A880]/20 text-xs">
                {/* 1-Click Pin Placement Action */}
                <div className="flex items-center gap-2">
                  <span className="text-[#8C827A] uppercase tracking-wider text-[10px]">Pin directly:</span>
                  <button
                    onClick={() => setPinTarget(pinTarget === 'left' ? null : 'left')}
                    className={`px-2.5 py-1.5 border text-xs flex items-center gap-1.5 transition-colors ${
                      pinTarget === 'left'
                        ? 'bg-[#C5A880] text-[#1A1A1A] border-[#C5A880]'
                        : 'border-[#C5A880]/40 text-[#1A1A1A] hover:bg-stone-50'
                    }`}
                  >
                    <Crosshair className="w-3 h-3" />
                    <span>Pin Left Ear</span>
                  </button>
                  <button
                    onClick={() => setPinTarget(pinTarget === 'right' ? null : 'right')}
                    className={`px-2.5 py-1.5 border text-xs flex items-center gap-1.5 transition-colors ${
                      pinTarget === 'right'
                        ? 'bg-[#C5A880] text-[#1A1A1A] border-[#C5A880]'
                        : 'border-[#C5A880]/40 text-[#1A1A1A] hover:bg-stone-50'
                    }`}
                  >
                    <Crosshair className="w-3 h-3" />
                    <span>Pin Right Ear</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowControls(!showControls)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs uppercase tracking-wider transition-colors ${
                      showControls
                        ? 'bg-[#C5A880] text-[#1A1A1A] border-[#C5A880]'
                        : 'border-[#C5A880]/40 text-[#1A1A1A] hover:bg-stone-100'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Fine Tuning</span>
                  </button>

                  <button
                    onClick={handleClearPortrait}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 text-[#8C827A] hover:text-[#1A1A1A] hover:bg-stone-100 text-xs uppercase tracking-wider"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Fine Tuning Panel */}
            {showControls && portraitSource && (
              <div className="p-5 bg-white border border-[#C5A880]/30 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <span className="font-serif text-sm font-medium text-[#1A1A1A]">
                    Precision Earring Placement (You can also click directly on your ears in the photo!)
                  </span>
                  <button
                    onClick={() => setRenderSettings(DEFAULT_RENDER_SETTINGS)}
                    className="text-[10px] text-[#C5A880] hover:underline uppercase tracking-wider"
                  >
                    Reset Defaults
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Ear Individual Positioning */}
                  <div className="p-3 bg-[#FAF8F5] border border-stone-200 space-y-2">
                    <span className="font-medium text-[#1A1A1A] text-[11px] block">
                      Left Earring Position (Viewer&apos;s Left)
                    </span>
                    <div>
                      <label className="text-[10px] text-[#8C827A] flex justify-between">
                        <span>Horizontal Shift</span>
                        <span>{renderSettings.leftOffsetX}px</span>
                      </label>
                      <input
                        type="range"
                        min="-120"
                        max="120"
                        value={renderSettings.leftOffsetX}
                        onChange={(e) =>
                          setRenderSettings({
                            ...renderSettings,
                            leftOffsetX: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#8C827A] flex justify-between">
                        <span>Vertical Shift (Height)</span>
                        <span>{renderSettings.leftOffsetY}px</span>
                      </label>
                      <input
                        type="range"
                        min="-120"
                        max="120"
                        value={renderSettings.leftOffsetY}
                        onChange={(e) =>
                          setRenderSettings({
                            ...renderSettings,
                            leftOffsetY: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Right Ear Individual Positioning */}
                  <div className="p-3 bg-[#FAF8F5] border border-stone-200 space-y-2">
                    <span className="font-medium text-[#1A1A1A] text-[11px] block">
                      Right Earring Position (Viewer&apos;s Right)
                    </span>
                    <div>
                      <label className="text-[10px] text-[#8C827A] flex justify-between">
                        <span>Horizontal Shift</span>
                        <span>{renderSettings.rightOffsetX}px</span>
                      </label>
                      <input
                        type="range"
                        min="-120"
                        max="120"
                        value={renderSettings.rightOffsetX}
                        onChange={(e) =>
                          setRenderSettings({
                            ...renderSettings,
                            rightOffsetX: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#8C827A] flex justify-between">
                        <span>Vertical Shift (Height)</span>
                        <span>{renderSettings.rightOffsetY}px</span>
                      </label>
                      <input
                        type="range"
                        min="-120"
                        max="120"
                        value={renderSettings.rightOffsetY}
                        onChange={(e) =>
                          setRenderSettings({
                            ...renderSettings,
                            rightOffsetY: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Sizing & Rotation */}
                  <div>
                    <label className="text-[11px] text-[#8C827A] flex justify-between">
                      <span>Earring Scale Multiplier</span>
                      <span>{Math.round(renderSettings.scaleMultiplier * 100)}%</span>
                    </label>
                    <input
                      type="range"
                      min="0.4"
                      max="1.6"
                      step="0.05"
                      value={renderSettings.scaleMultiplier}
                      onChange={(e) =>
                        setRenderSettings({
                          ...renderSettings,
                          scaleMultiplier: Number(e.target.value)
                        })
                      }
                      className="w-full accent-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#8C827A] flex justify-between">
                      <span>Rotation Tilt</span>
                      <span>{renderSettings.rotationDeg}°</span>
                    </label>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      value={renderSettings.rotationDeg}
                      onChange={(e) =>
                        setRenderSettings({
                          ...renderSettings,
                          rotationDeg: Number(e.target.value)
                        })
                      }
                      className="w-full accent-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2 border-t border-stone-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={renderSettings.showLeftEar}
                      onChange={(e) =>
                        setRenderSettings({ ...renderSettings, showLeftEar: e.target.checked })
                      }
                      className="accent-[#C5A880]"
                    />
                    <span>Show Left Earring</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={renderSettings.showRightEar}
                      onChange={(e) =>
                        setRenderSettings({ ...renderSettings, showRightEar: e.target.checked })
                      }
                      className="accent-[#C5A880]"
                    />
                    <span>Show Right Earring</span>
                  </label>
                </div>
              </div>
            )}

            <p className="text-[11px] text-[#8C827A] text-center italic">
              AI Visualization — Click directly on your earlobe in the photo at any time to instantly lock the earring in place.
            </p>
          </div>

          {/* RIGHT: Product Switching Carousel & Appointment CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border border-[#C5A880]/30 p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                    Currently Wearing
                  </span>
                  <h2 className="font-serif text-2xl text-[#1A1A1A] font-medium mt-0.5">
                    {selectedProduct.name}
                  </h2>
                  <span className="text-xs text-[#8C827A]">
                    {selectedProduct.metal} ({selectedProduct.karat}) • {selectedProduct.dimensions}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif text-lg font-medium text-[#1A1A1A] block">
                    {formatINR(selectedProduct.price)}
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 uppercase tracking-wider inline-block">
                    {selectedProduct.availability}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  disabled={!portraitSource || !isRendered}
                  className="w-full py-3 px-4 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] disabled:opacity-40 disabled:pointer-events-none text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Look</span>
                </button>

                <Link
                  href={`/appointment?product=${selectedProduct.id}&intent=appointment`}
                  className="w-full py-3 px-4 bg-white border border-[#C5A880]/60 text-[#1A1A1A] hover:bg-stone-50 text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Book Salon</span>
                </Link>
              </div>
            </div>

            <div className="bg-white/80 border border-[#C5A880]/20 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#1A1A1A]">
                  Switch Earrings Instantly
                </h3>
                <span className="text-[11px] text-[#8C827A]">
                  {PRODUCTS.length} Creations Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                {PRODUCTS.map((prod) => {
                  const isSelected = prod.id === selectedProduct.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod)}
                      className={`text-left p-2.5 border transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-[#C5A880] bg-[#FAF8F5] ring-1 ring-[#C5A880]'
                          : 'border-stone-200 bg-white hover:border-[#C5A880]/50'
                      }`}
                    >
                      <div className="relative w-12 h-12 bg-[#FAF8F5] border border-stone-200 shrink-0 p-1">
                        <Image
                          src={prod.catalogImage}
                          alt={prod.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#1A1A1A] truncate">
                          {prod.name}
                        </h4>
                        <span className="text-[11px] text-[#8C827A] block">
                          {formatINR(prod.price)}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                            Applied
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A880]/30 space-y-2 text-xs text-[#8C827A]">
              <div className="flex items-center gap-2 font-medium text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Precision Pinning Feature</span>
              </div>
              <p className="leading-relaxed">
                Hair volume or unique portrait angles can sometimes obscure standard landmarks. You can click <strong>Pin Left Ear</strong> or <strong>Pin Right Ear</strong> and click directly on your earlobe in the photo for pixel-perfect placement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
