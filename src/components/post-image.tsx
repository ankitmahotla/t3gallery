"use client";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import useImageStore from "~/context/store";
import { ImageData } from "~/types";

export default function PostImage({ image }: { image: ImageData }) {
  const {
    selectedImages,
    addSelectedImage,
    removeSelectedImage,
    cancelImageSelection,
    displayCheckbox,
    toggleDisplayCheckbox,
  } = useImageStore();

  const handleImageClick = (image: ImageData) => {
    const isSelected = selectedImages.some(
      (selectedImage) => selectedImage.id === image.id,
    );

    if (isSelected) {
      removeSelectedImage(image.id);
    } else {
      addSelectedImage(image);
    }
  };
  return (
    <div key={image.id} className="flex w-48 flex-col">
      <Link href={`/img/${image.id}`}>
        <Image
          src={image.url}
          style={{ objectFit: "contain" }}
          width={192}
          height={192}
          className="max-h-48"
          alt={image.name}
        />
      </Link>
      <div className="mt-2 flex items-center justify-between p-1">
        {image.name.slice(0, 10)}
        {displayCheckbox && (
          <Checkbox onClick={() => handleImageClick(image)} />
        )}
      </div>
    </div>
  );
}
