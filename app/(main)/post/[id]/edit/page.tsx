import { auth } from "@/lib/auth";
import { getPost } from "@/lib/queries";
import { notFound } from "next/navigation";
import { EditPostForm } from "./form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);
  const user = await auth.getUser();
  const isPostAuthor = user && user.id === post?.author.id;

  if (!post || !isPostAuthor) {
    return notFound();
  }

  return (
    <main className="w-full px-2 flex flex-col my-4 flex-grow items-center">
      <h1 className="text-tiny text-foreground uppercase font-bold p-2">
        Edit post page
      </h1>
      <EditPostForm
        defaultValues={{ title: post.title, content: post.content }}
        postId={post.id}
      />
    </main>
  );
}
