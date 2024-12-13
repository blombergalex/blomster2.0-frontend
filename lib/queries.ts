import { client } from "./client";
import { homepagePostsSchema, postPageSchema } from "./schemas";

export const getPost = async (id: string) => {
  try {
    const response = await client.get(`/posts/${id}`);

    const { data, error } = postPageSchema.safeParse(response.data)
    if (error) {
      return null
    }

    return data
  } catch {
    return null;
  }
}

// do same as below for post page to render comments
export const getPosts = async () => {
  // hämta ut posts från backend
  // parse posts to make sure data is right
  // if no posts return null

  try {
    const response = await client.get('/posts') //var get requesten görs

    const {data, error} = homepagePostsSchema.safeParse(response.data)
    if (error) {
      return null
    }

    return data
  } catch {
    return null;
  }
}
