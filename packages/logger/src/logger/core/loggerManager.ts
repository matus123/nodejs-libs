import pino from 'pino';

import { LoggerInstance } from './loggerInstance';

interface LoggerManagerConfig {
    loggerInstances: LoggerInstance[];
    flushInterval?: number;
}

export class LoggerManager {
    private flushInterval = 10000;
    private isFlushIntervalRunning = false;

    constructor(private config: LoggerManagerConfig) {
        this.flushInterval = config.flushInterval || this.flushInterval;
    }

    public initProcessEventHandlers(logger: LoggerInstance): void {
        const handler = pino.final(logger.getRawLogger(), (err, finalLogger, evt) => {
            finalLogger.info(`${evt} caught`);
            if (err) {
                finalLogger.error(err, 'error caused exit');
            }
            process.exit(err ? 1 : 0);
        });

        process.on('beforeExit', () => handler(null, 'beforeExit'));
        process.on('exit', () => handler(null, 'exit'));
        process.on('uncaughtException', err => handler(err, 'uncaughtException'));
        process.on('SIGINT', () => handler(null, 'SIGINT'));
        process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
        process.on('SIGTERM', () => handler(null, 'SIGTERM'));
    }

    public initReloadEventHandler() {
        const reloadHandler = () => {
            this.config.loggerInstances.forEach(loggerInstance => {
                loggerInstance.reload();
            });
        };
        process.on('SIGHUP', () => reloadHandler());
    }

    public initIntervalFlush() {
        if (this.isFlushIntervalRunning) {
            throw new Error('Interval flush is already initialized');
        }
        const loggersToFlush = this.config.loggerInstances.filter(logger => logger.canFlush());
        if (loggersToFlush.length === 0) {
            return;
        }
        setInterval(() => {
            loggersToFlush.forEach(logger => {
                logger.flush();
            });
        }, this.flushInterval).unref();
        this.isFlushIntervalRunning = true;
    }
}
