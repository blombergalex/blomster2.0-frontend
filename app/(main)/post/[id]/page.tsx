import { DeletePostButton } from "@/components/delete-post-button";
import { auth } from "@/lib/auth";
import { getPost } from "@/lib/queries";
import { Comment } from "@/components/comment";
import { CommentForm } from "./comment/comment-form";

import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { notFound } from "next/navigation";

export const revalidate = 900;

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  const user = await auth.getUser();
  const isPostAuthor = user && user.id === post.author.id;

  return (
    <main className="flex flex-col justify-between gap-10 min-h-screen">
      <Card className="py-4 shadow-none rounded-none w-full z-0">
        <CardHeader className="pb-0 pt-2 px-4 justify-between flex-wrap">
          <div className="w-full md:w-fit">
            <p className="text-tiny uppercase font-bold">
              {post.author.username}
            </p>
            <h4 className="font-bold text-large">{post.title}</h4>
          </div>
          {isPostAuthor && (
            <div className="flex gap-1">
              <Link href={`/post/${post.id}/edit`}>
                <Button>
                  Edit
                </Button>
              </Link>
              <DeletePostButton postId={post.id}/>
            </div>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-4">
          <p className="text-md p-1">{post.content}</p>
        </CardBody>
      </Card>
      <Card className="my-4 px-4 bg-background rounded-none shadow-none">
        <p className="text-tiny uppercase font-semibold m-4">Comments</p>
        {post.comments &&
          post.comments.map(({ _id, content, author}) => (
            <Comment 
              key={_id}
              _id={_id}
              content={content}
              author={author}
              isPostAuthor={isPostAuthor}
            />
          ))}
        {user && <CommentForm post_id={post.id} />}
      </Card>
    </main>
  );
}
