import { formatDistance } from "date-fns";

export const formatRelativeDate = (date: Date | string) =>
  `${formatDistance(new Date(date), Date.now())} ago`;
