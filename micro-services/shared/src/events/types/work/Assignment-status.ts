export enum AssignmentStatus {
    ACTIVE_QUEUED = 'active-queued', 
    ACTIVE_CLAIMED = 'active-claimed',
    RESOLVED_COMPLETE = 'resolved-complete',
    RESOLVED_CANCELED = 'resolved-cancelled',
    ERROR = 'error' // any assignments that are not active or resolved - shoudl this be more granular?
}