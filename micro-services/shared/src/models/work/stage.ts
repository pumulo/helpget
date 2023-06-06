import { ProcessDescriptor } from "./Process";

interface StageDescriptor {
    id: string;
    name: string;
    description: string;
    type: StageType;
    sequence: string;
    processes: ProcessDescriptor[];
    assignee?: string;
}

enum StageType {
    Primary = 'primary',
    Alternate = 'alternate',
}

export { StageDescriptor, StageType };