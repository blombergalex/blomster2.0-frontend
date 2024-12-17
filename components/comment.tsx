'use client'

import { auth } from "@/lib/auth";
import { PostPageData } from "@/lib/schemas";
import { CardBody } from "@nextui-org/react"

export const Comment = async ({
  _id, 
  author, 
  content
}:Pick<PostPageData["comments"][number], "_id" | "author" | "content">
) => {

  const user = await auth.getUser();
  const isCommentAuthor = user && user.id === author;
  
  return (
    <CardBody>
        {/* {(isCommentAuthor || isPostAuthor) && ( */} 
          {/* <DeleteCommentButton postId={post_id} commentId={id} /> */}
        {/* )} */}
          <p className="text-tiny uppercase font-bold">@{author}</p>
          <p>{content}</p>
        </CardBody>
  )
}