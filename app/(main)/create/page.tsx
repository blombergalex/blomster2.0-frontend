import { CreatePostForm } from "./form";

export default function createPage () {    
  return (
    <main className="w-full px-2 flex flex-col my-4 flex-grow items-center">
      <h1 className="text-tiny text-foreground uppercase font-bold p-2">
        create post
      </h1>
      <CreatePostForm />
    </main>
  );
}