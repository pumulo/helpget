import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface CaseUpdatedEvent extends GidEvent{
    subjects: Subjects.CaseUpdated;
}