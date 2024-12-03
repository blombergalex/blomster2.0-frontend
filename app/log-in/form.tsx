"use client";

import { logInSchema } from "@/lib/schemas";

import { Button, Input } from "@nextui-org/react";
// import { toast } from "sonner";
import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  errorClasses,
  secondaryButtonClasses,
  inputClasses,
} from "@/utils/classes";
import { FieldError } from "@/components/field-error";

export const LogInForm = () => {
  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (variables:z.infer<typeof logInSchema>) => {
  //     handleServerError(await logIn(variables))
  //   },
  //   onError: (error) => toast.error(error.message),
  //   onSuccess: (result, variables) => {
  //     console.log({result, variables})
  //     toast.success(`Logged in with ${variables.email}`);
  //   }
  // });

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <form
      // onSubmit={handleSubmit((values) => mutate(values))}
      onSubmit={() => console.log("Logging in")}
      className="flex w-full flex-col max-w-md gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("username")}
            label="Email"
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
          />
          {errors.password && (
            <FieldError error={errors.password}/>
          )}
        </div>
        <Button className={secondaryButtonClasses} type="submit" size="sm">
          {/* {isPending ? "Logging in..." : "Log in"} */}
          Log in
        </Button>
      </div>
    </form>
  );
};
