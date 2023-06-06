import { Subjects } from "../..";
import { GidEvent } from "../gid-event";

export interface NodePayloadUpdatedEvent extends GidEvent{
    subjects: Subjects.NodeUpdated;
}