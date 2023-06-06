import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface AssignmentCreatedEvent extends GidEvent{
    subjects: Subjects.AssignmentCreated;
}