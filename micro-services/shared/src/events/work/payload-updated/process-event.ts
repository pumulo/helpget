import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface ProcessPayloadUpdatedEvent extends GidEvent{
    subjects: Subjects.ProcessUpdated;
}