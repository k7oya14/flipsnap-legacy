"use client";

import React, { useState, useCallback } from "react";
import { Area, MediaSize } from "react-easy-crop";
import CropperModal from "../../components/create-post/CropperModal";
import getCroppedImg from "../../lib/getCroppedImg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";
export const ASPECT_RATIO = 6 / 1;
export const CROP_WIDTH = 400;

// const useStyles = makeStyles({
//   root: {
//     "& .file-upload-container": {
//       width: 500,
//       marginTop: 10,
//       "& .button": {
//         backgroundColor: "#00A0FF",
//         color: "white",
//       },
//     },
//     "& .img-container": {
//       marginTop: 40,
//       width: `${CROP_WIDTH}px`,
//       height: `${CROP_WIDTH / ASPECT_RATIO}px`,
//       display: "flex",
//       alinItems: "center",
//       borderRadius: 5,
//       border: "1px solid gray",
//       overflow: "hidden",
//       backgroundColor: "#EAEAEA",
//       "& .img": {
//         width: "100%",
//         objectFit: "contain",
//         backgroundColor: "#EAEAEA",
//       },
//       "& .no-img": {
//         backgroundColor: "#EAEAEA",
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "#000",
//       },
//     },
//   },
// });

type Props = {
  setCroppedImage: (blob: Blob) => void;
  front: boolean;
};

const CropImage = (props: Props) => {
  const { setCroppedImage, front } = props;
  /** Cropモーダルの開閉 */
  const [isOpen, setIsOpen] = useState(false);

  /** アップロードした画像URL */
  const [imgSrc, setImgSrc] = useState("");

  /** 画像の拡大縮小倍率 */
  const [zoom, setZoom] = useState(1);
  /** 画像拡大縮小の最小値 */
  const [minZoom, setMinZoom] = useState(1);

  /** 切り取る領域の情報 */
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  /** 切り取る領域の情報 */
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  /** 切り取ったあとの画像URL */
  const [croppedImgSrc, setCroppedImgSrc] = useState("");

  /**
   * ファイルアップロード後
   * 画像ファイルのURLをセットしモーダルを表示する
   */
  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (reader.result) {
            setImgSrc(reader.result.toString() || "");
            setIsOpen(true);
          }
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    []
  );
  /**
   * Cropper側で画像データ読み込み完了
   * Zoomの最小値をセットしZoomの値も更新
   */
  const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
    const { width, height } = mediaSize;
    const mediaAspectRadio = width / height;
    if (mediaAspectRadio > ASPECT_RATIO) {
      // 縦幅に合わせてZoomを指定
      const result = CROP_WIDTH / ASPECT_RATIO / height;
      setZoom(result);
      setMinZoom(result);
      return;
    }
    // 横幅に合わせてZoomを指定
    const result = CROP_WIDTH / width;
    setZoom(result);
    setMinZoom(result);
  }, []);

  /**
   * 切り取り完了後、切り取り領域の情報をセット
   */
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  /**
   * 切り取り後の画像を生成し画面に表示
   */
  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <div className="min-w-full flex items-center text-center flex-col">
        <Input
          type="file"
          accept="image/*"
          name={front ? "imgFront" : "imgBack"}
          id={front ? "imgFront" : "imgBack"}
          required
          aria-describedby={front ? "imgFront-error" : "imgBack-error"}
          className="border border-slate-400 p-2"
          onChange={onFileChange}
        />
        <DialogContent className="max-w-[90vw] w-[500px] flex items-center text-center justify-center">
          <CropperModal
            crop={crop}
            setCrop={setCrop}
            zoom={zoom}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            imgSrc={imgSrc}
            showCroppedImage={showCroppedImage}
            onMediaLoaded={onMediaLoaded}
            minZoom={minZoom}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};
export default CropImage;
