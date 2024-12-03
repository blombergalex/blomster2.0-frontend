"use server";

import { client } from "@/lib/client";
import { handleAxiosError, type ServerActionResponse } from "@/lib/error-handling";
import { logInSchema, LogInValues } from "@/lib/schemas";
import { redirect } from "next/navigation";

export const logIn = async (
  data: LogInValues
): Promise<ServerActionResponse> => {
  const parsedData = logInSchema.parse(data);

  try {
    await client.post('/log-in', parsedData)
  } catch (error) {
    return handleAxiosError(error)    
  }

  redirect('/posts')
};
