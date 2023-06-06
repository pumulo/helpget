import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface ProcessInitiateEvent extends GidEvent{
    subjects: Subjects.ProcessInitiate;
}