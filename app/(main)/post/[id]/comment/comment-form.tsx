'use client'

import { createComment } from "@/actions/create-comment"
import { FieldError } from "@/components/field-error"
import { handleServerActionError, toastServerError } from "@/lib/error-handling"
import { commentActionSchema, CommentValues } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button, Input } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export const CommentForm = ({post_id}: {post_id:string}) => {

  console.log(post_id)
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CommentValues) => {
      handleServerActionError(await createComment(values)) 
    },
    onError: toastServerError,
    onSuccess: () => {
      reset()
    }
  })
  
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<CommentValues>({
    resolver: zodResolver(commentActionSchema),
    defaultValues: {
      post_id
    }
  })
  
  return (
    <form
      onSubmit={handleSubmit(values => mutate(values))}
      className="w-full gap-4 px-4 items-center"
    >
        <div className="flex items-center gap-3">
          <Input className="" {...register('content')} label='Comment...' name='content' required />
          <Button type='submit'>
            {isPending ? 'Adding...' : 'Add comment'}
          </Button>
        </div>
        {errors && (
          <div>
            <FieldError error={errors.content} />
          </div>
        )}
    </form>
  )
}