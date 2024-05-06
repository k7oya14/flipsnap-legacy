"use client";

// import { Button, makeStyles, Modal, Slider } from "@material-ui/core";
import React from "react";
import Cropper, { Area, MediaSize } from "react-easy-crop";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modal: {
// width: 420,
// height: 500,
// backgroundColor: "white",
// display: "flex",
// justifyContent: "center",
// flexFlow: "column",
// borderRadius: "0px 0px 10px 10px",
//     "& .crop-container": {
//       height: 400,
//       borderRadius: "10px 10px 0px 0px",
//       backgroundColor: "#f4f7fb",
//       position: "relative",
//       "& .container": {},
//       "& .crop-area": {
//         border: "3px solid #00A0FF",
//       },
//       "& .media": {},
//     },
//     "& .controls": {
//       height: 40,
//       marginLeft: 50,
//       marginRight: 50,
//       display: "flex",
//       alignItems: "center",
//       marginTop: 10,
//       "& .zoom-range": {
//         color: "#00A0FF",
//       },
//     },
//     "& .buttons": {
//       height: 40,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       marginRight: 90,
//       marginLeft: 90,
//       marginBottom: 10,
//       "& .close": {
//         backgroundColor: "gray",
//         color: "#fff",
//       },
//       "& .ok": {
//         backgroundColor: "#00A0FF",
//         color: "#fff",
//       },
//     },
//   },
// });
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
  return (
    <DialogContent className="w-[90vw] h-screen flex items-center text-center justify-center">
      <div className="bg-white flex justify-center flex-col ">
        <DialogHeader>
          <div className="relative w-[90vw] h-96 bg-[#333]">
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
          <div className="controls">
            <Slider
              defaultValue={[1]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => {
                setZoom(value[0]);
              }}
              className="zoom-range"
            />
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button className="close" onClick={onClose}>
            Close
          </Button>
          <Button
            className="ok"
            onClick={() => {
              onClose();
              showCroppedImage();
            }}
          >
            OK
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};
export default CropperModal;
