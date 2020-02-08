import * as amqplib from 'amqplib';

type SetupFn = (connection: amqplib.Connection) => Promise<void>;
interface Logger {
    error: (msg: string, msgObj?: object) => void;
    info: (msg: string, msgObj?: object) => void;
    warn: (msg: string, msgObj?: object) => void;
}
export class RabbitConnectionManager {
    protected connection?: amqplib.Connection;
    protected logger: Logger;
    protected setupFn?: SetupFn;

    protected restartIntervalTimer?: NodeJS.Timeout;

    public constructor(protected connectionConfig: amqplib.Options.Connect, logger: Logger) {
        this.logger = logger;
    }

    public setup(setupFn: SetupFn): void {
        this.setupFn = setupFn;
    }

    public async init(): Promise<void> {
        const connectionConfig = this.connectionConfig;
        const connection = await amqplib.connect({
            hostname: connectionConfig.hostname,
            port: connectionConfig.port,
            username: connectionConfig.username,
            password: connectionConfig.password,
            vhost: connectionConfig.vhost,
        });

        this.clearRestartTimer();

        connection.on('error', err => {
            this.logger.error(`[AMQP] error`, { err: err });
        });
        connection.on('close', () => {
            this.logger.warn('[AMQP] connection closed');
            this.setRestartTimer();
        });

        this.connection = connection;

        if (!this.setupFn) {
            throw new Error('You have to define setup function');
        }
        await this.setupFn(connection);

        this.logger.info('[AMQP] connected');
    }

    public async createChannel(): Promise<amqplib.Channel> {
        if (!this.connection) {
            throw new Error('amqplib connection not initialized');
        }
        const channel = await this.connection.createChannel();

        return channel;
    }

    public async createQueue(
        channel: amqplib.Channel,
        queueName?: string,
        options: amqplib.Options.AssertQueue = { durable: false, autoDelete: true },
    ) {
        const queue = await channel.assertQueue(queueName || '', options);

        return queue;
    }

    protected async reconnect(): Promise<void> {
        try {
            this.logger.info('[AMQP] reconnecting');
            await this.init();
        } catch (err) {
            this.logger.error('[AMQP] reconnection error', { err: err });
        }
    }

    protected setRestartTimer() {
        this.clearRestartTimer();
        this.restartIntervalTimer = setInterval(() => this.reconnect(), 15000);
    }

    protected clearRestartTimer() {
        if (this.restartIntervalTimer) {
            clearInterval(this.restartIntervalTimer);
        }
    }
}