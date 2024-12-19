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
    console.error("Access token is missing.");
    return { error: "You need to be logged in to comment" };
  }
  console.log("Access token:", accessToken.value);

  let postId;
  console.log("Request Data:", parsedData);
  try {
    const response = await client.post(`/post/${postId}`, parsedData, { //
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