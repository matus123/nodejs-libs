import pino from 'pino';
import SonicBoom from 'sonic-boom';

import { DeploymentInfo, LoggerInstanceConfig, LoggerInstanceHooks } from '../interfaces';

export class LoggerInstance {
  private logger: pino.Logger;
  private dest: SonicBoom;

  private hooks: LoggerInstanceHooks = {
    mutateError: () => ({}),
    afterLog: () => ({}),
  };

  constructor(private config: LoggerInstanceConfig, private deploymentInfo: DeploymentInfo) {
    this.dest = this.config.destination;
    this.logger = this.config.options ? pino(this.config.options, this.dest) : pino(this.dest);
    this.mergeHooks(this.config.hooks);
  }

  public trace(message: string, messageObj: object = {}) {
    const mergedObj = this.mergeMessageObj(messageObj);
    this.logger.trace(mergedObj, message);
    this.hooks.afterLog(message, mergedObj);
  }

  public debug(message: string, messageObj: object = {}) {
    const mergedObj = this.mergeMessageObj(messageObj);
    this.logger.debug(mergedObj, message);
    this.hooks.afterLog(message, mergedObj);
  }

  public info(message: string, messageObj: object = {}): void {
    const mergedObj = this.mergeMessageObj(messageObj);
    this.logger.info(mergedObj, message);
    this.hooks.afterLog(message, mergedObj);
  }

  public warn(message: string, messageObj: object = {}) {
    const mergedObj = this.mergeMessageObj(messageObj);
    this.logger.warn(mergedObj, message);
    this.hooks.afterLog(message, mergedObj);
  }

  public error(message: string, messageObj: object = {}) {
    const mergedObj = this.mergeMessageObj(messageObj);
    this.hooks.mutateError(mergedObj);
    this.logger.error(mergedObj, message);
    this.hooks.afterLog(message, mergedObj);
  }

  public getRawLogger() {
    return this.logger;
  }

  public canFlush(): boolean {
    return this.logger.flush != null;
  }

  public flush(): void {
    this.dest.flush();
  }

  public flushSync(): void {
    this.dest.flushSync();
  }

  public reload(): void {
    this.dest.reopen();
  }

  private mergeMessageObj(messageObj: object) {
    return {
      ...this.deploymentInfo,
      ...messageObj,
    };
  }

  private mergeHooks(hooks?: Partial<LoggerInstanceHooks>): void {
    this.hooks.afterLog = hooks?.afterLog || this.hooks.afterLog;
    this.hooks.mutateError = hooks?.mutateError || this.hooks.mutateError;
  }
}
