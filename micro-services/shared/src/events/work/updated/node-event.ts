import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface NodeUpdatedEvent extends GidEvent{
    subjects: Subjects.NodeUpdated;
}