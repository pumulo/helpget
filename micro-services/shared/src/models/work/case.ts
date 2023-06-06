import { StageDescriptor } from "./Stage";

export interface CaseDescriptor {
    id: string;
    name: string;
    description: string;
    stages: StageDescriptor[];
    assignee?: string;
}