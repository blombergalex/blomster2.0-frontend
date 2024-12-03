export type ServerActionResponse = {error: string} | undefined | void

export const handleServerActionError = (response: ServerActionResponse) => {
  if (response?.error) {
    throw Error(response.error)
  }
}