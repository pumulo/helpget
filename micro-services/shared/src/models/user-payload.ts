import { ApplicationAccess } from './application-access';

export interface UserPayload {
    id: string,
    caseId: string,
    name: string,
    email: string,
    application: ApplicationAccess[],
    currentApplication: ApplicationAccess
}