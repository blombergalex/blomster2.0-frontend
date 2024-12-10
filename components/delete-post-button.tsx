"use client";

import { deletePost } from "@/actions/delete-post";
import { secondaryButtonClasses } from "@/utils/classes";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "Sonner";

export const DeletePostButton = ({ postId }: { postId: string }) => {
  // const { mutate } = useMutation({
  //   mutationFn: () => deletePost(postId),
  //   onError: (error) => toast.error(error.message),
  //   onSuccess: () => toast.success("Deleted post"),
  //   onMutate: () => toast.loading("Deleting post"),
  //   onSettled: () => toast.dismiss(),
  // });

  return (
    <Button className={secondaryButtonClasses} onClick={() => 
      deletePost()}>
    {/* mutate()}> */}
      Delete
    </Button>
  );
};
