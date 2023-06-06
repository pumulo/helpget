import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface NodeInitiateEvent extends GidEvent{
    subjects: Subjects.NodeInitiate;
}