export interface gidPayload {
    id: string,
    name: string,
    sequence: number,
    operator: string,
    createDataTime: Date, // do not need an updateDateTime since we create a new record for each update1    
    caseData: string, // this is the full case payload in JSON format
}