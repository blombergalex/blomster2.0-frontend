import { Button, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { postActionSchema, type PostValues } from "@/lib/schemas";
import { FieldError } from "@/components/field-error";
import {
  handleServerActionError,
  toastServerError,
} from "@/lib/error-handling";
import { createPost } from "@/actions/create-post";

export const CreatePostForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PostValues) => {
      handleServerActionError(await createPost(values));
    },
    onError: toastServerError,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValues>({
    resolver: zodResolver(postActionSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col gap-4 md:w-2/3"
    >
      <Input {...register("title")} label="Title" />
      {errors.title && <FieldError error={errors.title} />}
      <Textarea {...register("content")} label="Your content here..." />
      {errors.content && <FieldError error={errors.title} />}
      <Button type="submit">
        {isPending ? "Uploading post..." : "Post"}
      </Button>
    </form>
  );
};
