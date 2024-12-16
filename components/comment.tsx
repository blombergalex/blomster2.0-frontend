'use client'

import { auth } from "@/lib/auth";
import { CommentValues } from "@/lib/schemas";
import { CardBody } from "@nextui-org/react"

export const Comment = async ({_id, author, content}:{id:string, author:string, content: string}> // or use pick<> from commentT ?  
) => {

  const user = await auth.getUser();
  const isCommentAuthor = user && user.id === comment.author.id;
  
  return (
    <CardBody>
        {/* {(isCommentAuthor || isPostAuthor) && ( */} */}
          {/* <DeleteCommentButton postId={post_id} commentId={id} /> */}
        )}
          <p className="text-tiny uppercase font-bold">@{author.username}</p>
          <p>{content}</p>
        </CardBody>
  )
}