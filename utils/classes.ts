import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const buttonClasses = "bg-primary w-fit border-1 border-foreground";
export const logOutButtonClasses = "border-1 border-foreground w-fit bg-transparent self-center"


export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}