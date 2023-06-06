import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
    private _stan?: Stan;

    connect(clusterId: string, clientId: string, url: string): Promise<void> {
        this._stan = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve, reject) => {
            this._stan?.on('connect', () => {
                console.log(`${clientId} connected to NATS`);
                resolve();
            });
            this.stan.on('error', (err) => {
                reject(err);
            });
        });
    }

    get stan() {
        if (!this._stan) {
            throw new Error('Cannot access NATS client before connecting');
        }
        return this._stan;
    }
}

const natsWrapper = new NatsWrapper();

export { natsWrapper };