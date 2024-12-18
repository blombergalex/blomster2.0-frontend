"use server"

import { auth } from "@/lib/auth"
import { client } from "@/lib/client";
import { handleAxiosError } from "@/lib/error-handling";
import { commentActionSchema, type CommentValues } from "@/lib/schemas"

import { revalidatePath } from "next/cache";

export const createComment = async (data: CommentValues) => {
  const parsedData = commentActionSchema.parse(data)
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: "You need to be logged in to comment" };
  }

  let postId;

  try {
    //gör en post request till /posts (som stämmer överens med post requesten i backend)
    // const response = await client.post("/posts/:id", parsedData, { // kanske ska va `/posts/${postId}`
    const response = await client.post(`/posts/${postId}`, parsedData, { // kanske ska va `/posts/${postId}`

      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    postId = response.data.id;
  } catch (error) {
    return handleAxiosError(error);
  }

  if (!postId || typeof postId !== "string") {
    return { error: "Could not revalidate page" };
  }

  revalidatePath(`/post/${postId}`)
};