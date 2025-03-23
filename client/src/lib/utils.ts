import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedPostDate = (date: string | Date) => {
  const now = moment();
  const postDate = moment(date);

  if (now.isSame(postDate, 'day')) {
    const hoursAgo = now.diff(postDate, 'hours');
    if (hoursAgo < 1) {
      const minutesAgo = now.diff(postDate, 'minutes');
      return `${minutesAgo} minutes ago`;
    }
    return `${hoursAgo} hours ago`;
  } else if (now.isSame(postDate, 'year')) {
    return postDate.format('DD MMM');
  } else {
    return postDate.format('DD MMM YYYY');
  }
};
