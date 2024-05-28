import React, { useRef, useState, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";

// hooks
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";

const centerCropImage = (width: number, height: number) => {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
    width,
    height
  );
};

interface ImageCropProp {
  src: string | null;
  onCropComplete: (image: Blob | null) => void;
}

const ImageCrop: React.FC<ImageCropProp> = ({ src, onCropComplete }) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const fileUrlRef = useRef<string>("");
  const imageRef = useRef<HTMLImageElement>();

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imageRef.current = e.target as HTMLImageElement;
    const { width, height } = e.target as HTMLImageElement;
    setCrop(centerCropImage(width, height));
  };

  const handleCropComplete = async () => {
    if (completedCrop) {
      const imageBlob = await userCrop(completedCrop);
      onCropComplete(imageBlob);
    }
  };

  const getCroppedImage = (
    image: HTMLImageElement,
    crop: Crop,
    imageName: string
  ): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalWidth / image.height;

    const cropWidth = crop.width || 0;
    const cropHeight = crop.height || 0;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        (crop.x || 0) * scaleX,
        (crop.y || 0) * scaleY,
        cropWidth * scaleX,
        cropHeight * scaleY,
        0,
        0,
        cropWidth,
        cropHeight
      );
    }

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");

          return;
        }

        const newBlob = blob;

        // @ts-ignore;
        newBlob.name = imageName;
        window.URL.revokeObjectURL(fileUrlRef.current);
        fileUrlRef.current = window.URL.createObjectURL(newBlob);
        resolve(newBlob);
      }, "image/jpg");
    });
  };

  const userCrop = async (crop: Crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageBlob = await getCroppedImage(
        imageRef.current,
        crop,
        "newAvatar.jpg"
      );

      return croppedImageBlob;
    }
    return null;
  };

  useEffect(() => {
    return () => {
      window.URL.revokeObjectURL(fileUrlRef.current);
    };
  }, []);

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imageRef?.current) {
        handleCropComplete();
      }
    },
    100,
    // @ts-ignore
    [completedCrop]
  );
  console.log(src);

  if (!src) {
    return null;
  }

  return (
    <ReactCrop
      crop={crop}
      onChange={(e) => setCrop(e)}
      aspect={1}
      ruleOfThirds
      circularCrop
      minHeight={120}
      minWidth={120}
      onComplete={(e) => setCompletedCrop(e)}
    >
      <img src={src} onLoad={handleImageLoad} alt="Profile Avatar" />
    </ReactCrop>
  );
};

export default ImageCrop;
