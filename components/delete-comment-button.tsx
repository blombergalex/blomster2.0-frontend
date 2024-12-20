"use client";

import { deleteComment } from "@/actions/delete-comment";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

export const DeleteCommentButton = ({ _id }: { _id: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deleteComment(_id))
    },
    onError: toastServerError,
  });

  return (
    <div className="absolute right-1 top-1">
      <Button className="m-3 p-1 h-fit" onClick={() => mutate()} disabled={isPending}>
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
};
