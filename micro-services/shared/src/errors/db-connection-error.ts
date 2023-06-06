import { CustomError } from './custom-error';

export class DbConnectionError extends CustomError {
    reason: 'Error connecting to the database';
    statusCode = 404;

    constructor() {
        super('Error connecting to the database');
        this.reason = 'Error connecting to the database';
        Object.setPrototypeOf(this, DbConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {message: this.reason}
        ];
    }
}