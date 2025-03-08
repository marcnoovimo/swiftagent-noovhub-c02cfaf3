
import React, { useState, useRef, useCallback } from 'react';
import { Camera, RotateCw, Check, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ScanOptions } from './types';

interface DocumentScannerProps {
  onCapture: (imageData: string, options: ScanOptions) => Promise<void>;
  options: ScanOptions;
  onClose: () => void;
}

const DocumentScanner: React.FC<DocumentScannerProps> = ({ onCapture, options, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  // Initialize camera
  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraActive(true);
      toast.success('Caméra activée');
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Impossible d\'accéder à la caméra. Veuillez vérifier les autorisations.');
    }
  }, []);

  // Capture image from camera
  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL (base64 encoded image)
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      
      // Stop camera after capture
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setIsCameraActive(false);
      }
    }
  }, [stream]);

  // Retry scan
  const retryCapture = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  // Save the scanned document
  const saveDocument = useCallback(async () => {
    if (!capturedImage) return;
    
    setIsLoading(true);
    try {
      await onCapture(capturedImage, options);
      toast.success('Document scanné et enregistré avec succès');
      onClose();
    } catch (error) {
      console.error('Error saving scanned document:', error);
      toast.error('Erreur lors de l\'enregistrement du document');
    } finally {
      setIsLoading(false);
    }
  }, [capturedImage, onCapture, options, onClose]);

  // Clean up when component unmounts
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Start camera when component mounts
  React.useEffect(() => {
    startCamera();
  }, [startCamera]);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
        {!capturedImage ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-contain"
          />
        ) : (
          <img 
            src={capturedImage} 
            alt="Document scanné" 
            className="w-full h-full object-contain"
          />
        )}
        
        <canvas ref={canvasRef} className="hidden" />
        
        {!isCameraActive && !capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              variant="outline" 
              onClick={startCamera}
              className="bg-background/80"
            >
              <Camera className="mr-2" size={18} />
              Activer la caméra
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {!capturedImage ? (
          <>
            <Button variant="outline" onClick={onClose}>
              <FileX className="mr-2" size={18} />
              Annuler
            </Button>
            <Button 
              onClick={captureImage}
              disabled={!isCameraActive}
              className="bg-noovimo-500 text-white hover:bg-noovimo-600"
            >
              <Camera className="mr-2" size={18} />
              Capturer
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={retryCapture}>
              <RotateCw className="mr-2" size={18} />
              Réessayer
            </Button>
            <Button 
              onClick={saveDocument}
              disabled={isLoading}
              className="bg-noovimo-500 text-white hover:bg-noovimo-600"
            >
              <Check className="mr-2" size={18} />
              {isLoading ? 'Traitement...' : 'Enregistrer'}
            </Button>
          </>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>Document: <span className="font-medium">{options.documentName}</span></p>
        <p>Catégorie: <span className="font-medium">{options.category}</span></p>
        <p>
          Classification: <span className="font-medium">
            {options.autoClassify ? 'Automatique' : 'Manuelle'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DocumentScanner;
