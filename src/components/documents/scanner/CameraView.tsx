
import React, { useRef, useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CameraViewProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  // Initialize camera
  const startCamera = async () => {
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
  };

  // Capture image from camera
  const captureImage = () => {
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
      
      // Stop camera after capture
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setIsCameraActive(false);
      }
      
      onCapture(imageData);
    }
  };

  // Start camera when component mounts
  useEffect(() => {
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-contain"
        />
        
        <canvas ref={canvasRef} className="hidden" />
        
        {!isCameraActive && (
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

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onCancel}>
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
      </div>
    </div>
  );
};

export default CameraView;
