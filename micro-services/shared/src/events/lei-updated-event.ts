import { Subjects } from './subjects';
import { LeiStatus } from './types';

export interface LeiUpdatedEvent {
    subject: Subjects.LeiUpdated;
    data: {
        id: string;
        leid?: string;
        status: LeiStatus;
        name: string;
        term: string;
    };
}