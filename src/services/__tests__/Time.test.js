import MockDate from 'mockdate';
import { differenceInBusinessDays, getLastWorkableDayTime, getTodayWorkableDayTime } from '../Time';

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

  describe('getLastWorkableDayTime', () => {
    afterAll(MockDate.reset);

    it('returns Monday if today is Tuesday', () => {
      MockDate.set(new Date('2017-11-14T17:00:00.000Z'));
      expect(getLastWorkableDayTime()).toEqual(new Date('2017-11-13T09:30:00.000Z').getTime());
    });

    it('returns Friday if today is Monday', () => {
      MockDate.set(new Date('2017-11-13T17:00:00.000Z'));
      expect(getLastWorkableDayTime()).toEqual(new Date('2017-11-10T09:30:00.000Z').getTime());
    });

    it('returns Friday if today is Saturday', () => {
      MockDate.set(new Date('2017-11-11T17:00:00.000Z'));
      expect(getLastWorkableDayTime()).toEqual(new Date('2017-11-10T09:30:00.000Z').getTime());
    });

    it('returns Friday if today is Sunday', () => {
      MockDate.set(new Date('2017-11-12T17:00:00.000Z'));
      expect(getLastWorkableDayTime()).toEqual(new Date('2017-11-10T09:30:00.000Z').getTime());
    });
  });

  describe('getTodayWorkableDayTime', () => {
    afterAll(MockDate.reset);

    it('returns Friday if today is Friday', () => {
      MockDate.set(new Date('2017-11-17T17:00:00.000Z'));
      expect(getTodayWorkableDayTime()).toEqual(new Date('2017-11-17T09:30:00.000Z').getTime());
    });

    it('returns Monday if today is Monday', () => {
      MockDate.set(new Date('2017-11-20T17:00:00.000Z'));
      expect(getTodayWorkableDayTime()).toEqual(new Date('2017-11-20T09:30:00.000Z').getTime());
    });

    it('returns Monday if today is Saturday', () => {
      MockDate.set(new Date('2017-11-18T17:00:00.000Z'));
      expect(getTodayWorkableDayTime()).toEqual(new Date('2017-11-20T09:30:00.000Z').getTime());
    });

    it('returns Monday if today is Sunday', () => {
      MockDate.set(new Date('2017-11-19T17:00:00.000Z'));
      expect(getTodayWorkableDayTime()).toEqual(new Date('2017-11-20T09:30:00.000Z').getTime());
    });
  });
});
