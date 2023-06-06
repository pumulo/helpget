import { Hierarchy } from "../../models";

export interface GidEventData {
    definition: string; // json representation of the definition
    payload: string; // current case data
    currentUser: string; // user that triggered the event. Could be system - this should be an id not aflat string --- next enhancement
    hierarchy?: Hierarchy; // id of the parent element - for stage == caseId, for process = stageId, for node = processId
}