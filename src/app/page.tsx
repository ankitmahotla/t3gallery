import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Images } from "./_components/images";

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in{" "}
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
