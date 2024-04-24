import { ImageActions } from "~/components/image-actions";
import PostImage from "~/components/post-image";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-col items-center justify-center">
      <ImageActions />
      <div className="flex flex-wrap items-end justify-center gap-4 p-4">
        {images.map((image) => (
          <PostImage image={image} />
        ))}
      </div>
    </div>
  );
}
