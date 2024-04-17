import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/39b20fe3-5d7f-4d5c-9d8e-7f2999a9fda1-cghdv3.jpg",
  "https://utfs.io/f/7b66b6bd-bc8c-4431-b61f-1aef68f9f948-6vm94g.jpg",
  "https://utfs.io/f/4efb50a0-6734-4133-9e10-5ebfd2629cd7-cia7t7.jpg",
  "https://utfs.io/f/95cc3a7c-5d7d-4927-bfd2-01c25ab56250-uikwby.jpg"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}))

export default async function HomePage() {
  const posts = await db.query.posts.findMany()
  console.log(posts)
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {
          mockImages.map((image) => (
            <div key={image.id} className="w-48">
              <img src={image.url} />
            </div>
          ))
        }
      </div>
    </main>
  );
}
