import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import { Images } from "./_components/images";

export const dynamic = "force-dynamic"

async function LoggedIn() {
  const images = await getMyImages();
  return (
    <Images images={images} />
  )
}

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in </div>
      </SignedOut>
      <SignedIn>
        <LoggedIn />
      </SignedIn>
    </main>
  );
}