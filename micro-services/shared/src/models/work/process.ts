import { NodeDescriptor } from "./node";

interface ProcessDescriptor {
    id: string;
    name: string;
    description: string;
    type: ProcessType;
    sequence: string;
    nodes: NodeDescriptor[];
    defaultAssignee?: string;
}

enum ProcessType {
    Synchronous = 'synchronous',
    Asynchronous = 'asynchronous'
}

export { ProcessDescriptor, ProcessType };