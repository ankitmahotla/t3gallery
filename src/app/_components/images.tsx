"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import useImageStore from "~/context/store";
import type { ImageData, Props } from "~/types";

export function Images({ images }: Props) {
    const [displayCheckbox, setDisplayCheckbox] = useState(false)
    const { selectedImages, addSelectedImage, removeSelectedImage, cancelImageSelection } = useImageStore();

    const handleImageClick = (image: ImageData) => {
        const isSelected = selectedImages.some((selectedImage) => selectedImage.id === image.id);

        if (isSelected) {
            removeSelectedImage(image.id);
        } else {
            addSelectedImage(image);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full flex items-center justify-between my-6 px-24">
                <div className="text-xl">{selectedImages.length > 0 ? `Selected Images: ${selectedImages.length}` : ""}</div>
                <Button
                    variant={displayCheckbox ? "destructive" : "default"}
                    onClick={() => {
                        setDisplayCheckbox(prev => !prev);
                        displayCheckbox && cancelImageSelection();
                    }}>
                    {displayCheckbox ? `Cancel` : `Select Images`}
                </Button>
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
                        <div className="flex justify-between items-center mt-2 p-1">
                            {image.name.slice(0, 10)}
                            {displayCheckbox && <Checkbox onClick={() => handleImageClick(image)} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}