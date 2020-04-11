import { LoggerOptions } from 'pino';
import SonicBoom from 'sonic-boom';

export interface DeploymentInfo {
  component: string;
  environment: string;
  project: string;
  version: string;
  [prop: string]: string;
}

type noop = () => {};

export interface LoggerInstanceHooks {
  afterLog: ((message: string, messageObj: object) => void | Promise<void>) | noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutateError: ((obj: Record<string, any>) => void) | noop;
}

export interface LoggerInstanceConfig {
  destination: SonicBoom;
  options?: LoggerOptions;
  hooks?: Partial<LoggerInstanceHooks>;
}
