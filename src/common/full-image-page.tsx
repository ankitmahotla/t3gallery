import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
    const image = await getImage(props.id)
    const uploaderInfo = await clerkClient.users.getUser(image.userId)

    return <div className="flex h-full w-full min-w-0">
        <div className="flex-shrink flex justify-center items-center">
            <img src={image.url} className="flex-shrink object-contain" />
        </div>
        <div className="flex w-48 flex-shrink-0 flex-col border-l">
            <div className="text-lg text-center p-2 border-b">{image.name}</div>
            <div className="flex flex-col p-2">
                <span>Uploaded By:</span>
                <span>{uploaderInfo.fullName}</span>
            </div>
            <div className="flex flex-col p-2">
                <span>Uploaded On:</span>
                <span>{new Date(image.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="p-2">
                <form
                    action={async () => {
                        "use server";
                        await deleteImage(props.id);
                    }}
                >
                    <Button type="submit" variant="destructive">
                        Delete
                    </Button>
                </form>
            </div>
        </div>
    </div>
}