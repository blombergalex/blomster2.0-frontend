'use server'

import { auth } from "@/lib/auth"
import { client } from "@/lib/client";
import { handleAxiosError } from "@/lib/error-handling";
import { revalidatePath } from "next/cache";

export const deleteComment = async (postId: string, commentId: string) => {
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: "You need to be logged in to delete a comment" };
  }

  try {
    await client.delete(`/post/${postId}/${commentId}`, { 
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
  } catch (error) {
    return handleAxiosError(error);
  }

  revalidatePath(`/post/${postId}`);
}