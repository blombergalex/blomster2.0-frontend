import { getPosts } from "@/lib/queries";
import Link from "next/link";

export const revalidate = 900;

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="w-full text-primary my-4 px-2 flex flex-col min-h-screen items-center">
      <h1 className="text-tiny text-foreground uppercase font-bold px-2">
        Welcome to Blomster
      </h1>
      {!posts || posts.length === 0 ? (
        <div className="text-primary-500 text-center my-auto">
          <p>No posts yet </p>
          <a className="hover:underline underline-offset-2" href="/create">
            Create one
          </a>
        </div>
      ) : (
        <section className="flex flex-col gap-2 w-full px-2 items-center">
          {posts.map(({ id, title, author }) => (
            <Link key={id} href={`/post/${id}`}>
              <span>{author.username}</span>
              <h2>{title}</h2>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
