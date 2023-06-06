import { Message, Stan } from 'node-nats-streaming';
import { Event } from './events';


export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    protected stan: Stan;
    protected ackWait = 5 * 1000;

    constructor(stan: Stan) {
        this.stan = stan;
    }

    subscriptionOptions() {
        return this.stan
            .subscriptionOptions()
            .setManualAckMode(true)
            .setDeliverAllAvailable()
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return (typeof data === 'string')
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }

    listen() {
        const subscription = this.stan.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message recevied: ${this.subject} / ${this.queueGroupName}`
            );

            const parseData = this.parseMessage(msg);
            this.onMessage(parseData, msg);
        });
    }
}