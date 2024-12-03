"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "Sonner";
import { useMutation } from "@tanstack/react-query";

import { signUpSchema, type SignUpValues } from "@/lib/schemas";
import {
  secondaryButtonClasses,
  inputClasses,
} from "@/utils/classes";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { signUp } from "@/actions/sign-up";
import { FieldError } from "@/components/field-error";

export const SignUpForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values:SignUpValues) => {
      handleServerActionError(await signUp(values))
    },
    onError: toastServerError,
    onSuccess: () => toast.success('Account created successfully') //hur trigga success toast?
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema), //varför körs den inte om formulär submittas tomt? 
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col max-w-md gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("username")}
            label="Username"
            required
          />
          {errors.username && (
            <FieldError error={errors.username}/>
          )}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("password")}
            type="password"
            label="Password"
            required
          />
          {errors.password && (
            <FieldError error={errors.password}/>
          )}
        </div>
        <Button className={secondaryButtonClasses} type="submit" size="sm" disabled={isPending}>
          {isPending ? 'Creating...' : 'Sign up'}
        </Button>
      </div>
    </form>
  );
};
