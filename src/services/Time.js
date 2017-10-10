// @flow
import { isEqual } from 'date-fns';

export const ONE_DAY = 86400 * 1000;

const setDateWithBoundary = (date: Date): void => {
  date.setHours(BOUNDARY_HOUR, BOUNDARY_MINUTES, 0, 0);
};

const getTodayWorkableDate = (): Date => {
  const today = new Date();
  setDateWithBoundary(today);
  return today;
};

export const getTodayWorkableDayTime = (): number => getTodayWorkableDate().getTime();

export const getLastWorkableDayTime = (): number => {
  const today = getTodayWorkableDate();
  const todayWeekNumber = today.getDay();

  let offsetTime = ONE_DAY; // one day
  if (todayWeekNumber <= 1) {
    // sunday or monday
    offsetTime += ONE_DAY;
  }
  if (todayWeekNumber === 1) {
    // monday
    offsetTime += ONE_DAY;
  }

  return today.getTime() - offsetTime;
};

export const BOUNDARY_HOUR = 10;
export const BOUNDARY_MINUTES = 30;

export const isDateEqual = (a: Date, b: Date) => isEqual(a.setHours(0, 0, 0, 0), b.setHours(0, 0, 0, 0));

export const differenceInBusinessDays = (aTime: number, bTime: number): number => {
  const a = new Date(aTime);
  const b = new Date(bTime);
  setDateWithBoundary(a);
  setDateWithBoundary(b);

  let days = 0;
  if (b.getTime() === a.getTime()) {
    return days;
  }

  while (b < a) {
    const dayOfWeek = b.getDay();
    if (dayOfWeek !== 6 && dayOfWeek !== 0) {
      days++;
    }
    b.setTime(b.getTime() + ONE_DAY);
  }

  return days;
};
