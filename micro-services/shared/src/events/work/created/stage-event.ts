import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface StageCreatedEvent extends GidEvent{
    subjects: Subjects.StageCreated;
}