import { Duration, add, isAfter } from "date-fns";

export const addTime = (date: Date, duration: Duration): Date => add(date, duration);
export const isAfterDate = (date: Date, expiration: Date): boolean => isAfter(date, expiration);