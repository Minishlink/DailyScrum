const ONE_DAY = 86400 * 1000;

export const getLastWorkableDayTime = () => {
  const today = new Date();
  today.setHours(BOUNDARY_HOUR, BOUNDARY_MINUTES, 0, 0); // TODO customize this hour in settings
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
