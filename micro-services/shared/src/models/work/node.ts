interface NodeDescriptor {
    id: string;
    parentId: string;
    name: string;
    description: string;
    type: NodeType;
    assignee?: string;
    implementationId?: string; // this is the formId, serviceId, decisionId, messageId, ... any of the implementation service ids
}

enum NodeType {
    Start = 'start',
    UserTask = 'user-task',
    SystemTask = 'system-task',
    Decision = 'decision',
    Event = 'event',
    Wait = 'wait',
    Message = 'message',
    Reference = 'reference',
    PegaCase = 'pega-case',
    End = 'end',
    None = 'undefined',
    DataTask = 'data-task',
    IntegrationTask = 'integration-task',
}

export { NodeDescriptor, NodeType };