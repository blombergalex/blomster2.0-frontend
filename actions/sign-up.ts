"use server";

import { client } from "@/lib/client";
import type { ServerActionResponse } from "@/lib/error-handling";
import { signUpSchema, SignUpValues } from "@/lib/schemas";
import { redirect } from "next/navigation";

export const signUp = async (
  data: SignUpValues
): Promise<ServerActionResponse> => {
  const parsedData = signUpSchema.parse(data);

  try {
    await client.post('/sign-up', parsedData)
  } catch (error) {
    console.log(error)
  }

  redirect('/log-in')
};
