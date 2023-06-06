import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface AssignmentUpdatedEvent extends GidEvent{
    subjects: Subjects.AssignmentUpdated;
}