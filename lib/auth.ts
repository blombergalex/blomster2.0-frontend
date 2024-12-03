import { cookies } from "next/headers"

const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies()

  cookieStore.set('acces-token', accessToken, { httpOnly: true})
}