import { HomePosts } from "@/components/home-posts";
import { auth } from "@/lib/auth";
import { getPosts } from "@/lib/queries";

export const revalidate = 900;

const limit = 10;

export default async function Home() {
  const initialData = await getPosts(limit, 1);
  const user = await auth.getUser();

  return (
    <main className="w-full text-primary my-4 px-2 flex flex-col min-h-screen items-center">
      <h1 className="text-tiny text-foreground uppercase font-bold px-2">
        Hot topics
      </h1>
      {!initialData || !initialData.posts || initialData.posts.length === 0 ? (
        <div className="text-primary-500 text-center my-auto">
          <p>No posts yet </p>
          <a className="hover:underline underline-offset-2" href="/create">
            Create one
          </a>
        </div>
      ) : (
        <HomePosts
          initialData={initialData}
          limit={limit}
          userId={user?.id || null}
        />
      )}
    </main>
  );
}
