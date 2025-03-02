import { Post } from '../models/post.model';

/**
 * Generates a random number between the given lower and upper limits.
 *
 * @param lower - The lower limit for the random number (inclusive). Default is 100_00_00.
 * @param upper - The upper limit for the random number (inclusive). Default is 999_99_99.
 * @returns A random number between lower and upper limits.
 */
export function generateRandomNumber(lower: number = 100_00_00, upper: number = 999_99_99): number {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * Generates the next post ID based on the existing posts.
 *
 * @param posts - Array of existing posts to determine the next ID.
 * @returns The next available post ID (e.g., max ID + 1 or 1 if no posts exist).
 */
export function generateNextPostId(posts: Post[]): number {
  return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
}

/**
 * Formats a date (Date object or ISO string) to the format "MMM d, yyyy" (e.g., "Feb 20, 2025").
 *
 * @param date - The date to format, either a Date object or ISO string (e.g., "2025-02-20T08:00:00Z").
 * @returns A formatted string in the format "Feb 20, 2025" or an empty string if the date is invalid.
 */
export function formatDate(date: Date | string): string {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}