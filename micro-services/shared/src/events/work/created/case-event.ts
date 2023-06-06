import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface CaseCreatedEvent extends GidEvent{
    subjects: Subjects.CaseCreated;
}