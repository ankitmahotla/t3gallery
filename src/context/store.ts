import { create } from "zustand";
import type { ImageData } from "~/types";

interface ImageStoreState {
  selectedImages: ImageData[];
  displayCheckbox: boolean;
  addSelectedImage: (image: ImageData) => void;
  removeSelectedImage: (id: number) => void;
  cancelImageSelection: () => void;
  toggleDisplayCheckbox: () => void;
}

const useImageStore = create<ImageStoreState>((set) => ({
  selectedImages: [],
  displayCheckbox: false,
  addSelectedImage: (image) =>
    set((state) => ({ selectedImages: [...state.selectedImages, image] })),
  removeSelectedImage: (id) =>
    set((state) => ({
      selectedImages: state.selectedImages.filter((image) => image.id !== id),
    })),
  cancelImageSelection: () => {
    set(() => ({ selectedImages: [] }));
  },
  toggleDisplayCheckbox: () => {
    set((state) => ({ displayCheckbox: !state.displayCheckbox }));
  },
}));

export default useImageStore;
