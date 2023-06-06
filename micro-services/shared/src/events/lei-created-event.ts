import { Subjects } from './subjects';
import { LeiStatus } from './types';

export interface LeiCreatedEvent {
    subject: Subjects.LeiCreated;
    data: {
        id: string;
        leid?: string;
        status: LeiStatus;
        name: string;
        term: string;
    };
}