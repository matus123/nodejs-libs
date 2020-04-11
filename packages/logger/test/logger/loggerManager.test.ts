import pino from 'pino';

import { LoggerInstance, LoggerManager } from '../../src';

jest.useFakeTimers();

describe('#Logger', () => {
  describe('#Initialization', () => {
    test('basic config', () => {
      /* arange */
      const loggerManager = new LoggerManager({
        loggerInstances: [],
      });
      /* act */

      /* assert */
      expect(loggerManager).toBeDefined();
    });
  });

  describe('#check if flush is called each interval', () => {
    test('flush is called after first interval', () => {
      /* arange */
      const loggerInstance = new LoggerInstance(
        {
          destination: pino.destination({ sync: false } as any),
        },
        {
          environment: 'test',
          project: 'test',
          version: 'test',
          component: 'test',
        },
      );

      const loggerManager = new LoggerManager({
        loggerInstances: [loggerInstance],
      });

      const loggerInstanceFlushSpy = jest.spyOn(loggerInstance, 'flush');

      /* act */

      loggerManager.initIntervalFlush();

      /* assert */
      expect(loggerInstanceFlushSpy).not.toHaveBeenCalled();

      jest.advanceTimersByTime(10000);

      expect(loggerInstanceFlushSpy).toHaveBeenCalled();
    });

    test('flush is called multiple times after interval', () => {
      /* arange */
      const loggerInstance = new LoggerInstance(
        {
          destination: pino.destination({ sync: false } as any),
        },
        {
          environment: 'test',
          project: 'test',
          version: 'test',
          component: 'test',
        },
      );

      const loggerManager = new LoggerManager({
        loggerInstances: [loggerInstance],
      });

      const loggerInstanceFlushSpy = jest.spyOn(loggerInstance, 'flush');

      /* act */

      loggerManager.initIntervalFlush();

      /* assert */
      expect(loggerInstanceFlushSpy).not.toHaveBeenCalled();

      jest.advanceTimersByTime(30000);

      expect(loggerInstanceFlushSpy).toHaveBeenCalledTimes(3);
    });

    test('throws when initIntervalFlush is called multiple times', () => {
      /* arange */
      const loggerInstance = new LoggerInstance(
        {
          destination: pino.destination({ sync: false } as any),
        },
        {
          environment: 'test',
          project: 'test',
          version: 'test',
          component: 'test',
        },
      );

      const loggerManager = new LoggerManager({
        loggerInstances: [loggerInstance],
      });

      /* act */

      loggerManager.initIntervalFlush();

      /* assert */
      expect(() => loggerManager.initIntervalFlush()).toThrow();
    });
  });
});
