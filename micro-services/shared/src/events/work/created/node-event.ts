import { Subjects } from "../..";
import { GidEvent } from "../gid-event";
import { GidEventData } from "../gid-event-data";

interface GidNodeCreateEventData extends GidEventData {
    assignee?: string;
}

interface GidNodeCreateEvent extends GidEvent {
    data: GidNodeCreateEventData;
}

interface NodeCreatedEvent extends GidNodeCreateEvent {
    subjects: Subjects.NodeCreated;
}

export {GidNodeCreateEventData, GidNodeCreateEvent, NodeCreatedEvent}