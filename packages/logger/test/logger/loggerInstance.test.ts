import pino from 'pino';

import { LoggerInstance } from '../../src';

describe('#LoggerInstance', () => {
  test('simple config', async () => {
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
    /* act */

    /* assert */
    expect(loggerInstance).toBeDefined();
  });

  test('log', async () => {
    /* arange */
    const tmpFile = '/tmp/test_err.txt';
    const dest = pino.destination({ sync: false, dest: tmpFile } as any);
    const loggerInstance = new LoggerInstance(
      {
        destination: dest,
        hooks: {
          mutateError: obj => {
            obj.logToSlack = true;
          },
        },
      },
      {
        environment: 'test',
        project: 'test',
        version: 'test',
        component: 'test',
      },
    );
    const pinoInstance = loggerInstance.getRawLogger();
    const pinoErrorFn = jest.spyOn(pinoInstance, 'error');

    /* act */
    const err = new Error('test');

    loggerInstance.error(err.message, { err: err });

    /* assert */
    const errObj = {
      environment: 'test',
      project: 'test',
      version: 'test',
      component: 'test',
      err: err,
      logToSlack: true,
    };
    expect(pinoErrorFn).toHaveBeenCalledWith(errObj, 'test');
  });
});
