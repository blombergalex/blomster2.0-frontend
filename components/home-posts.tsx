"use client";

import { getPosts } from "@/lib/queries";
import { HomepagePostsData } from "@/lib/schemas";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const HomePosts = ({
  initialData,
  limit,
}: {
  initialData: HomepagePostsData;
  limit: number;
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
      refetchOnMount: false,
    });

  const currentPosts = data.pages.map((page) => page?.posts || []).flat();

  return (
    <section className="flex flex-col gap-2 w-full px-2 items-center">
      {currentPosts.map(({ id, title, author }) => (
        <Link key={id} href={`/post/${id}`}>
          <span>{author.username}</span>
          <h2>{title}</h2>
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
  const loader = useRef(null)

  useEffect(() => {
    const {current } = loader
    if (!current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !isFetchingNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(current)
    return () => {
      observer.unobserve(current)
    }
  }, [loader, fetchNextPage, isFetchingNextPage])

  if (!hasNextPage) {
    return null
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
