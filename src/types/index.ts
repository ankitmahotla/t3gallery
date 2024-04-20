export interface ImageData {
    id: number;
    url: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
}


export interface Props {
    images: ImageData[];
}