'use client'

import { CardBody } from "@nextui-org/react"

export const comment = () => {
  return (
    <CardBody>
        {(isCommentAuthor || isPostAuthor) && (
          <DeleteCommentButton postId={post_id} commentId={id} />
        )}
          <p className="text-tiny uppercase font-bold">@{user}</p>
          <small className="text-default-500">{reformattedDate}</small>
          <p>{content}</p>
        </CardBody>
  )
}