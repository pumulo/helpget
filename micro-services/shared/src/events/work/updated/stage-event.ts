import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface StageUpdatedEvent extends GidEvent{
    subjects: Subjects.StageUpdated;
}