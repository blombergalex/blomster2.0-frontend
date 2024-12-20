"use client";

import { logInSchema, LogInValues } from "@/lib/schemas";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { FieldError } from "@/components/field-error";
import {
  handleServerActionError,
  toastServerError,
} from "@/lib/error-handling";
import { logIn } from "@/actions/log-in";

export const LogInForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LogInValues) => {
      handleServerActionError(await logIn(values));
    },
    onError: toastServerError,
    onSuccess: (result, values) => {
      console.log({ result, values });
      toast.success(`Logged in with ${values.username}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col max-w-md gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <div className="w-2/3">
          <Input {...register("username")} label="Username" />
          {errors.username && <FieldError error={errors.username} />}
        </div>
        <div className="w-2/3">
          <Input {...register("password")} type="password" label="Password" />
          {errors.password && <FieldError error={errors.password} />}
        </div>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Logging in..." : "Log in"}
        </Button>
      </div>
    </form>
  );
};
