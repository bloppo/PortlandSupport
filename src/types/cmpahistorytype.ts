
type cmpahistorytype = {
    "IncidentID": number,
    "IncidentDate": string,
    "EntryDate": string,
    "Division": string,
    "Name": string,
    "Shift": string,
    "VehicleNumber": number,
    "NoteType": string,
    "IncidentDescription": string,
    "EmployeeComments": string | null,
    "Manager": string,
    "Supervisor": string,
    "status": string,
    "FinalizedOn": string,
    "Points": number,
    "SupervisorFinished": string,
    "IncidentType": string,
    "ManagerID":number,
    "DivisionID":number,
    "TypeID":number,
    "ConsquenceID":number,
    "EmployeeID":number
} | null;

export default cmpahistorytype;
