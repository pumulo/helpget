import { Subjects } from '../subjects';
import { GidEventData } from './gid-event-data';

export interface GidEvent {
    subject: Subjects;
    data: GidEventData;
}