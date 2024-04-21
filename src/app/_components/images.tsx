"use client"
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "~/components/ui/checkbox";
import useImageStore from "~/context/store";
import type { ImageData, Props } from "~/types";

export function Images({ images }: Props) {
    const { selectedImages, addSelectedImage, removeSelectedImage } = useImageStore();

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
            {selectedImages.length > 0 && <div className="my-5 text-xl">Selected Images: {selectedImages.length}</div>}
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
                            <Checkbox onClick={() => handleImageClick(image)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}