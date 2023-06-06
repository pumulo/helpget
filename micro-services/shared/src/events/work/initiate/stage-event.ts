import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface StageInitiateEvent extends GidEvent{
    subjects: Subjects.StageInitiate;
}