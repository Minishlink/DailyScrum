const ONE_DAY = 86400*1000;

export const getLastWorkableDayTime = () => {
  const today = new Date();
  today.setHours(9, 0, 0, 0);
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
