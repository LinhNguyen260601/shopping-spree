import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names.
 *
 * @param inputs - The inputs to merge.
 * @returns The merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
