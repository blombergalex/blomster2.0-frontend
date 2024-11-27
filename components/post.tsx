import { Card, CardBody, CardHeader } from "@nextui-org/react";

import Link from "next/link";

export const Post = () => {

  const slug = "dummy-slug"

  return (
    <Link
      href={`/post/${slug}`}
      className="w-full rounded-sm text-background p-2 md:w-2/3"
    >
      <Card className="flex w-full py-4 border-2 border-white bg-primary text-primary-foreground">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start z-0">
          <p className="text-tiny uppercase font-bold">@{"username"}</p>
          <h4 className="font-bold text-large">{"title"}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 px-4">
          <p>{"trimmedContent"}</p>
        </CardBody>
      </Card>
    </Link>
  );
};
