"use client";

import { editPost } from "@/actions/edit-post";
import { FieldError } from "@/components/field-error";
import {
  handleServerActionError,
  toastServerError,
} from "@/lib/error-handling";
import { postActionSchema, PostPageData, type PostValues } from "@/lib/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const EditPostForm = ({
  defaultValues,
  postId,
}: {
  defaultValues: Pick<PostPageData, "title" | "content">;
  postId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PostValues) => {
      handleServerActionError(await editPost({ data: values, postId }));
    },
    onError: toastServerError,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValues>({
    resolver: zodResolver(postActionSchema),
    defaultValues
  });

  return (
    <main className="w-full px-2 flex flex-col my-4 items-center">
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="flex w-full flex-col gap-4 md:w-2/3"
      >
        <Input {...register("title")} label="Title">
          {defaultValues.title}
        </Input>
        <FieldError error={errors.title} />
        <Textarea {...register("content")} label="Your content here...">
          {defaultValues.content}
        </Textarea>
        <FieldError error={errors.content} />
        <Button className={"self-end"} type="submit">
          {isPending ? "Updating post..." : "Update post"}
        </Button>
      </form>
    </main>
  );
};
