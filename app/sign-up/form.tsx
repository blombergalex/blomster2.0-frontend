"use client";

import { Button, Input } from "@nextui-org/react";
// import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useMutation } from "@tanstack/react-query";

import { signUpSchema } from "@/lib/schemas";
import {
  secondaryButtonClasses,
  errorClasses,
  inputClasses,
} from "@/utils/classes";

export const SignUpForm = () => {
  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (variables:z.infer<typeof signUpSchema>) => {
  //     handleServerError(await signUp(variables))
  //   },
  //   onError: (error) => toast.error(error.message),
  //   onSuccess: () => toast.success('Account created successfully')
  // })

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form
      // onSubmit={handleSubmit((values) => mutate(values))}
      onSubmit={() => console.log("Signing up")}
      className="flex w-full flex-col max-w-md gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("email")}
            label="Email"
            name="email"
            required
          />
          {errors.email && (
            <span className={errorClasses}>{errors.email.message}</span>
          )}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("username")}
            label="Username"
            required
          />
          {errors.username && (
            <span className={errorClasses}>{errors.username.message}</span>
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
            <span className={errorClasses}>{errors.password.message}</span>
          )}
        </div>
        <Button className={secondaryButtonClasses} type="submit" size="sm">
          {/* {isPending ? 'Creating...' : 'Sign up'} */}
          Sign up
        </Button>
      </div>
    </form>
  );
};
