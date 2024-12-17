import { Button } from "@nextui-org/react"

export const Votes = ({userId, score, upvotes, downvotes}:{
  postId: string
  userId: string | null
  score: number
  upvotes: string[]
  downvotes: string[]
}) => {
  return <div className="mt-4 flex itemx-center gap-1">
    <button>⬆︎</button>
    <span className="min-w-8 text-center">{score}</span>
    <button>⬇︎</button>
  </div>
}