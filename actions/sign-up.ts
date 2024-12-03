"use server";

import { client } from "@/lib/client";
import { handleAxiosError, type ServerActionResponse } from "@/lib/error-handling";
import { signUpSchema, SignUpValues } from "@/lib/schemas";
import { redirect } from "next/navigation";

export const signUp = async (
  data: SignUpValues
): Promise<ServerActionResponse> => {
  const parsedData = signUpSchema.parse(data);

  try {
    await client.post('/sign-up', parsedData)
  } catch (error) {
    return handleAxiosError(error)    
  }

  redirect('/log-in')
};
