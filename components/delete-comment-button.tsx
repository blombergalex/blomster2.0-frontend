"use client";

import { deleteComment } from "@/actions/delete-comment";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
      <Button className="hidden m-3 sm:flex p-1" onClick={() => mutate()} disabled={isPending}>
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
      <Button className="font-semibold m-2">
        <XMarkIcon
          className="h-6 w-6 text-primary-500 sm:hidden"
          onClick={() => mutate()}
        />
      </Button>
    </div>
  );
};
