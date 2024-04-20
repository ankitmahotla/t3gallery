import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import { Images } from "./_components/images";

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const images = await getMyImages();
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in </div>
      </SignedOut>
      <SignedIn>
        <Images images={images} />
      </SignedIn>
    </main>
  );
}