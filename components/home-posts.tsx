"use client";

import { getPosts } from "@/lib/queries";
import { HomepagePostsData } from "@/lib/schemas";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Votes } from "./votes";

export const HomePosts = ({
  initialData,
  limit,
  userId,
}: {
  initialData: HomepagePostsData;
  limit: number;
  userId: string | null;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) => {
        return await getPosts(limit, pageParam);
      },
      getNextPageParam: (lastPage) => lastPage?.nextPage,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      initialPageParam: 1,
    });

  const currentPosts = data.pages.map((page) => page?.posts || []).flat();

  return (
    <section className="flex flex-col gap-2 w-full px-2 items-center">
      {currentPosts.map(({ id, title, author, score, upvotes, downvotes }) => (
        <Link
          key={id}
          href={`/post/${id}`}
          className="w-full rounded-sm p-2 md:w-2/3"
        >
          <Card className="flex w-full py-4 border-2 border-white bg-primary text-primary-foreground">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start z-0">
              <p className="text-tiny uppercase font-bold">
                @{author.username}
              </p>
              <h4 className="font-bold text-large">{title}</h4>
              <Votes
                postId={id}
                score={score}
                upvotes={upvotes}
                downvotes={downvotes}
                userId={userId}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 px-4">
              {/* <p>{trimmedContent}</p> */}
            </CardBody>
          </Card>
        </Link>
      ))}
      <Loader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
};

const Loader = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) => {
  const loader = useRef(null);

  useEffect(() => {
    const { current } = loader;
    if (!current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(current);
    return () => {
      observer.unobserve(current);
    };
  }, [loader, fetchNextPage, isFetchingNextPage]);

  if (!hasNextPage) {
    return null;
  }

  return (
    <svg
      ref={loader}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
