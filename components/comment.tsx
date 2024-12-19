import { auth } from "@/lib/auth";
import { CardBody } from "@nextui-org/react";
import { DeleteCommentButton } from "./delete-comment-button";

interface CommentProps {
  _id: string;
  author: string;
  content: string;
  isPostAuthor: boolean | null;
}

export const Comment = async ({_id, author, content, isPostAuthor} : CommentProps) => {
  const user = await auth.getUser();
  const isCommentAuthor = user && user.id === author;

  return (
    <CardBody className="px-4">
      {(isPostAuthor || isCommentAuthor) && (
        <DeleteCommentButton _id={_id} />
      )}
      <p className="text-tiny uppercase font-bold">@{author}</p>
      <p>{content}</p>
    </CardBody>
  );
};
