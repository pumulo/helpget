import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface ProcessUpdatedEvent extends GidEvent{
    subjects: Subjects.ProcessUpdated;
}