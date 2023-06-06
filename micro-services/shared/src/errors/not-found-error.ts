import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    reason: 'Not found';
    statusCode = 404;

    constructor() {
        super('Route not found');
        this.reason = 'Not found';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [
            {message: this.reason}
        ];
    }
}