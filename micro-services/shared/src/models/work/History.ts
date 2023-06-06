export interface History {
    id: string;
    name: string;
    type: string;
    status: string,
    time: Date;
}

export enum HistoryType {
    CASE = 'case',
    STAGE = 'stage',
    PROCESS = 'process',
    NODE = 'node',
    USER_TASK = 'user-task',
    SYSTEM_TASK = 'system-task',
    MESSAGE = 'message',
    EVENT = 'event',
    WAIT = 'wait',
    SLA = 'sla'
}