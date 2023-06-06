import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface ProcessCreatedEvent extends GidEvent{
    subjects: Subjects.ProcessCreated;
}