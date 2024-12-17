import { cn } from "@/utils/classes";

export const Votes = ({
  userId,
  score,
  upvotes,
  downvotes,
}: {
  postId: string;
  userId: string | null;
  score: number;
  upvotes: string[];
  downvotes: string[];
}) => {
  return (
    <div className="mt-4 flex itemx-center gap-1">
      <button
        className={cn(
          "text-primary-400",
          userId && upvotes.includes(userId) && "text-background"
        )}
      >
        ⬆︎
      </button>
      <span className="min-w-8 text-center">{score}</span>
      <button  className={cn(
          'text-primary-400',
          userId && downvotes.includes(userId) && 'text-background',
        )}>⬇︎</button>
    </div>
  );
};
