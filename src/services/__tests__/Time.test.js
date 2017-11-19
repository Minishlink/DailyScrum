import { differenceInBusinessDays } from '../Time';

describe('Time', () => {
  describe('differenceInBusinessDays', () => {
    const baseDateTime = new Date('2017-11-13T10:45:00.000Z').getTime();
    it('returns 0 on the same day', () => {
      expect(differenceInBusinessDays(baseDateTime, baseDateTime)).toEqual(0);
    });

    it('returns 0 on the next day, before the daily', () => {
      expect(differenceInBusinessDays(new Date('2017-11-14').getTime(), baseDateTime)).toEqual(0);
      expect(differenceInBusinessDays(new Date('2017-11-14T09:00:00.000Z').getTime(), baseDateTime)).toEqual(0);
    });

    it('returns 1 on the next day, after the daily', () => {
      expect(differenceInBusinessDays(new Date('2017-11-14T11:00:00.000Z').getTime(), baseDateTime)).toEqual(1);
    });

    it('returns 1 after two days, before the daily', () => {
      expect(differenceInBusinessDays(new Date('2017-11-15').getTime(), baseDateTime)).toEqual(1);
      expect(differenceInBusinessDays(new Date('2017-11-15T09:00:00.000Z').getTime(), baseDateTime)).toEqual(1);
    });

    it('returns 2 after two days, after the daily', () => {
      expect(differenceInBusinessDays(new Date('2017-11-15T11:00:00.000Z').getTime(), baseDateTime)).toEqual(2);
    });

    it('returns 3 after four days, before the daily', () => {
      expect(differenceInBusinessDays(new Date('2017-11-17').getTime(), baseDateTime)).toEqual(3);
      expect(differenceInBusinessDays(new Date('2017-11-17T09:00:00.000Z').getTime(), baseDateTime)).toEqual(3);
    });

    it('returns 3 after four days, after the daily', () => {
      expect(differenceInBusinessDays(new Date('2017-11-17T11:00:00.000Z').getTime(), baseDateTime)).toEqual(4);
    });

    it('returns 5 after one week', () => {
      expect(differenceInBusinessDays(new Date('2017-11-20').getTime(), baseDateTime)).toEqual(5);
    });
  });
});
