"use server"

import { auth } from "@/lib/auth"
import { client } from "@/lib/client";
import { handleAxiosError } from "@/lib/error-handling";
import { commentSchema, type CommentValues } from "@/lib/schemas"

import { revalidatePath } from "next/cache";

export const createComment = async (data: CommentValues) => {
  const parsedData = commentSchema.parse(data)
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: "You need to be logged in to comment" };
  }

  let id;

  try {
    //gör en post request till /posts (som stämmer överens med post requesten i backend)
    const response = await client.post("/posts/:id", parsedData, { // kanske ska va `/posts/${postId}`
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    id = response.data.id;
  } catch (error) {
    return handleAxiosError(error);
  }

  if (!id || typeof id !== "string") {
    return { error: "Could not revalidate page" };
  }

  revalidatePath(`/post/${id}`)
};