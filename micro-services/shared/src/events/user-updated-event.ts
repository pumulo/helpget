import { Subjects } from './subjects';
import { UserStatus } from './types';

export interface UserUpdatedEvent {
    subject: Subjects.UserUpdated;
    data: {
        id: string;
        name: string;
        email: string;
        status: UserStatus;
        applicationList: {
            leiId: string;
            role: string;
            status: string;
        }[];
    };
}