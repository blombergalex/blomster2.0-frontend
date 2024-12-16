'use client'

import { auth } from "@/lib/auth";
import { CardBody } from "@nextui-org/react"

export const comment = async () => {

  const user = await auth.getUser();
  const isCommentAuthor = user && user.id === comment.author.id;
  
  return (
    <CardBody>
        {(isCommentAuthor || isPostAuthor) && (
          <DeleteCommentButton postId={post_id} commentId={id} />
        )}
          <p className="text-tiny uppercase font-bold">@{author.username}</p>
          <p>{content}</p>
        </CardBody>
  )
}