import { Subjects } from './subjects';
import { UserStatus } from './types';

export interface UserCreatedEvent {
    subject: Subjects.UserCreated;
    data: {
        id: string;
        status: UserStatus;
        name: string;
        email: string;
    };
}