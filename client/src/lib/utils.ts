import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedPostDate = (date: string | Date) => {
  const now = moment();
  const postDate = moment(date);

  const diffInSeconds = postDate.diff(now, "seconds");
  const absDiff = Math.abs(diffInSeconds);

  if (absDiff < 60) {
    return diffInSeconds < 0 ? `${absDiff} seconds ago` : `${absDiff} seconds later`;
  }

  const diffInMinutes = postDate.diff(now, "minutes");
  if (Math.abs(diffInMinutes) < 60) {
    return diffInMinutes < 0 ? `${Math.abs(diffInMinutes)} minutes ago` : `${Math.abs(diffInMinutes)} minutes later`;
  }

  const diffInHours = postDate.diff(now, "hours");
  if (Math.abs(diffInHours) < 24) {
    return diffInHours < 0 ? `${Math.abs(diffInHours)} hours ago` : `${Math.abs(diffInHours)} hours later`;
  }

  if (now.isSame(postDate, "year")) {
    return postDate.format("DD MMM");
  } else {
    return postDate.format("DD MMM YYYY");
  }
};