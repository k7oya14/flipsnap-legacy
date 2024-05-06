import React, { useState, useEffect } from "react";
import Cropper, { Area, MediaSize } from "react-easy-crop";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  crop: {
    x: number;
    y: number;
  };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  showCroppedImage: () => void;
  onMediaLoaded: (mediaSize: MediaSize) => void;
  minZoom: number;
};

const CropperModal: React.FC<Props> = ({
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  onClose,
  imgSrc,
  showCroppedImage,
  onMediaLoaded,
}) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRendered(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!rendered) {
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center flex-col ">
      <div className="relative w-full h-[60vh] min-h-[200px] sm:min-h-[400px] bg-transparent mt-4 mb-2">
        <Cropper
          image={imgSrc}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={true}
        />
      </div>
      <DialogFooter>
        <Button className="" onClick={onClose}>
          Close
        </Button>
        <Button
          className="mb-1 sm:mb-0"
          onClick={() => {
            onClose();
            showCroppedImage();
          }}
        >
          OK
        </Button>
      </DialogFooter>
    </div>
  );
};

export default CropperModal;
