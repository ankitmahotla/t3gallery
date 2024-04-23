"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import useImageStore from "~/context/store";
import type { ImageData, Props } from "~/types";

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 text-red-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

export function Images({ images }: Props) {
  const [displayCheckbox, setDisplayCheckbox] = useState(false);
  const {
    selectedImages,
    addSelectedImage,
    removeSelectedImage,
    cancelImageSelection,
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
    <div className="flex flex-col items-center justify-center">
      <div className="my-6 flex w-full items-center justify-between px-24">
        <div className="text-xl">
          {selectedImages.length > 0
            ? `Selected Images: ${selectedImages.length}`
            : ""}
        </div>
        <div className="flex items-center gap-2">
          {selectedImages.length > 0 && (
            <Button>
              <DeleteIcon />
            </Button>
          )}
          <Button
            variant={displayCheckbox ? "destructive" : "default"}
            onClick={() => {
              setDisplayCheckbox((prev) => !prev);
              displayCheckbox && cancelImageSelection();
            }}
          >
            {displayCheckbox ? `Cancel` : `Select Images`}
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-center gap-4 p-4">
        {images.map((image) => (
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
        ))}
      </div>
    </div>
  );
}
