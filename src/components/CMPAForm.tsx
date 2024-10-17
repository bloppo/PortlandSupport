import {Formik, Form, Field} from 'formik';

import * as Yup from 'yup';

import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';

import Button from '@mui/material/Button';

//import TextField from '@mui/material/TextField';

import SelectDivision from "./SelectDivision.tsx";
import SelectConsequenceType from "./SelectConsequenceType.tsx";
import SelectConsequence from "./SelectConsequence.tsx";
import SelectEmployee from "./SelectEmployee.tsx";

import getCMPAHistoryForEmployee from "../data/getdata.ts";
import {Box, Collapse, InputLabel, TextareaAutosize} from "@mui/material";
import cmpahistorytype from "../types/cmpahistorytype.ts";
import {DatePicker} from "@mui/x-date-pickers";

import NavButton from "./NavButton.tsx";
import {useEffect, useState} from "react";

// @ts-expect-error dfdfdfdf
const ErrorMsg = ({props, name}) => {
    return (
        <div className="text-red-500 w-[250px]">
            {props.touched[name] && props.errors[name] ? props.errors[name] : ''}
        </div>
    )
}

export const CMPAForm = () => {

    const minDate = new Date();

    const [driverName, setDriverName] = useState('');

    const [driverID, setDriverID] = useState(0);

    const [incidentID, setIncidentID] = useState(0);

    const [open, setOpen] = useState(true);

    const [cmpahistory, loading, error] = getCMPAHistoryForEmployee(driverID) as [cmpahistorytype[],boolean,string | null];
    const rows = cmpahistory.filter((item) => item !== null);

    const cbSelEmp = (_name: string, value: number, empName: string) => {
        setDriverID(value);
        localStorage['driverName'] = empName;
        localStorage['incidentID'] = 0
        localStorage['open'] = true
        setIncidentID(0);
        setOpen(true);
        setDriverName(empName);
//        console.log('Employee Name',empName);
    }

    const columns: GridColDef[] = [{
        field: 'action', headerName: 'Action', sortable: false, disableColumnMenu: true, width: 110,
        renderCell: (params: GridRenderCellParams) => (
            <Button variant="contained" sx={{textTransform: 'capitalize', padding: '1px', backgroundColor: '#0099d5'}}
                    onClick={() => {
                        setIncidentID(params.id as number);
                        localStorage['incidentID'] = params.id as number;
                        setOpen(false);
                        localStorage['open'] = false;
                    }}>
                Select
            </Button>
        )
    },
        {field: 'IncidentID', headerName: 'Incident ID'},
        {field: 'EntryDate', headerName: 'Entry Date', width: 100},
        {field: 'IncidentDate', headerName: 'Incident Date', width: 115},
        {field: 'FinalizedOn', headerName: 'Finalized On'},
        {field: 'status', headerName: 'Status'},
        {field: 'Division', headerName: 'Division', width: 125},
        {field: 'VehicleNumber', headerName: 'Vehicle Number'},
        {field: 'IncidentType', headerName: 'Incident Type', width: 150},
        {field: 'NoteType', headerName: 'Note Type', width: 150},
        {field: 'Manager', headerName: 'Manager', width: 150},
        {field: 'Supervisor', headerName: 'Supervisor', width: 150},
    ]

    const initialValues = {
        EntryDate: new Date(),
        IncidentDate: new Date(),
        selDivision: 0,
        selConsequenceType: 0,
        selConsequence: 0,
        notes: '',
        hEmployeeID: 0,
        hIncidentID: 0
    };

    const validateSchema = Yup.object().shape({
        selDivision: Yup.number().moreThan(0, 'Division is required'),
        selConsequenceType: Yup.number().moreThan(0, 'Incident Type is required'),
        selConsequence: Yup.number().moreThan(0, 'Consequence is required'),
        IncidentDate: Yup.date().max(Yup.ref('EntryDate'), 'Incident Date should be the same or earlier then ' + minDate.toDateString()).required('Incident Date is required'),
    })

//                <SelectEmployee name="selEmployee" value={driverID} cbValue={cbSelEmp}/>

    useEffect(() => {
        if (localStorage['driverID']) {
            setDriverID(localStorage['driverID']);
        }
        if (localStorage['driverName']) {
            setDriverName(localStorage['driverName']);
        }
    }, []);

    useEffect(() => {
        if (!loading && localStorage['incidentID']) {
            setIncidentID(localStorage['incidentID']-0);
        }
    },[loading])

    useEffect(() => {
        if(localStorage['open']) {
            setOpen(localStorage['open']==='true');
        }
    },[])

    const thatLink = (d:number,n:string) => {
        const link =  d == 0 ? '' : `/CMPAHistory/${d}/${n}`
        console.log(link);
        return link;
    }

    if(loading) { return 'Loading ...'}

    if(error) { return error}

    return (
        <div>
            <h1 className="mb-1">CMPA</h1>
            <div>
                <SelectEmployee name="selEmployee" value={driverID} cbValue={cbSelEmp as (name: string, value: number, empName: string | undefined) => void}/>
                <Button variant="contained"
                        disabled={driverID === 0}
                        sx={{textTransform: 'capitalize', marginLeft: 1, backgroundColor: '#555555'}}
                        onClick={() => {
                            setIncidentID(0)
                            localStorage['incidentID'] = 0
                        }}>
                    New Incident
                </Button>
                <NavButton title='Print History'
                           link={thatLink(driverID,driverName)}
                           className="ml-1 pl-10 pr-10 bg-gray-600"/>
            </div>

            <div className="flex flex-col mb-0.5 mt-5">
                <Button variant="contained" sx={{textTransform: 'capitalize', backgroundColor:'#555555', width:625, marginBottom:'10px'}} onClick={() => {localStorage['open']=!open; setOpen(!open); }}>
                    {open ? 'Collapse CMPA Listing' : 'Expand CMPA Listing'}
                </Button>
                <Collapse in={open}>
                    <Box sx={{height: 400, width: 600, padding: 1, border: 'blue 2px solid'}}>
                        <DataGrid rows={rows}
                                  columns={columns}
                                  getRowId={(row) => row.IncidentID}
                                  getRowClassName={(params) => {
                                      return params.indexRelativeToCurrentPage % 2 ? 'bg-gray-200' : 'bg-gray-300';
                                  }}
                                  loading={loading}
                                  hideFooter
                        />
                    </Box>
                </Collapse>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={(values, actions) => {
                    /*
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        actions.setSubmitting(false);
                                    }, 1000);
                    */
                    console.log(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
            >
                {(props) => {

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {

                        if (incidentID === 0) {
                            props.resetForm();
                            return;
                        }

                        props.resetForm();

                        if(cmpahistory.length > 0) {

                            const rec = cmpahistory.find((item: cmpahistorytype) => item?.IncidentID === incidentID);

                            if(rec !== undefined && rec !== null) {

                                props.setFieldValue('EntryDate', new Date(rec.EntryDate), false);
                                props.setFieldValue('IncidentDate', new Date(rec.IncidentDate), false);
                                props.setFieldValue('selDivision', rec.DivisionID, false);
                                props.setFieldValue('selConsequenceType', rec.TypeID, false);
                                props.setFieldValue('selConsequence', rec.ConsquenceID, false);
                                props.setFieldValue('notes', rec.IncidentDescription, false);
                                props.setFieldValue('hEmployeeID', rec.EmployeeID, false);
                                props.setFieldValue('hIncidentID', rec.IncidentID, false);
                            }

                        }

                    }, [props]);

                    const cbSetFieldValue = (fldName: string, value: never) => {
                        props.setFieldValue(fldName, value, false);
                        if (fldName === 'selConsequenceType') {
                            props.setFieldValue('selConsequence', 0, false);
                        }
                    }

                    return (
                        <Form>
                            <Field name="hIncidentID" type="hidden"/>
                            <Field name="hEmployeeID" type="hidden"/>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                <div className="flex justify-center col-span-1 md:col-span-2">
                                    <h3>
                                        {driverID === 0 ? 'Employee not selected' : incidentID === 0 ? 'New Incident' : 'Edit Incident # ' + incidentID}
                                    </h3>
                                </div>
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <InputLabel htmlFor="EntryDate"><b>Entry Date</b></InputLabel>
                                        <Field name="EntryDate" type="date" readOnly value={props.values.EntryDate}
                                               className="bg-amber-100"
                                               onChange={(newValue: string) => props.setFieldValue('EntryDate', newValue, false)}
                                               as={DatePicker}/>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="IncidentDate"><b>Incident Date</b></InputLabel>
                                        <Field name="IncidentDate" type="date" value={props.values.IncidentDate}
                                               className="bg-amber-100"
                                               onChange={(newValue: string) => props.setFieldValue('IncidentDate', newValue, false)}
                                               as={DatePicker}/>
                                        <ErrorMsg props={props} name="IncidentDate"/>
                                    </div>
                                    <div>
                                        <Field name="selDivision" type="select" value={props.values['selDivision']}
                                               cbValue={cbSetFieldValue} as={SelectDivision}/>
                                        <ErrorMsg props={props} name="selDivision"/>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <Field name="selConsequenceType" type="select"
                                               value={props.values['selConsequenceType']}
                                               cbValue={cbSetFieldValue} as={SelectConsequenceType}/>
                                        <ErrorMsg props={props} name="selConsequenceType"/>
                                    </div>
                                    <div>
                                        <Field name="selConsequence" type="select"
                                               value={props.values['selConsequence']}
                                               TypeID={props.values['selConsequenceType']}
                                               cbValue={cbSetFieldValue} as={SelectConsequence}/>
                                        <ErrorMsg props={props} name="selConsequence"/>
                                    </div>
                                    <div style={{
                                        width: 300,
                                        maxHeight: 200,
                                        marginBottom: 5,
                                        marginTop: 5,
                                        overflowY: 'scroll'
                                    }}>
                                        <InputLabel htmlFor="notes"><b>Description</b></InputLabel>
                                        <Field name="notes" type="textarea" value={props.values.notes}
                                               className="bg-amber-100 p-2"
                                               style={{width: '95%'}}
                                               as={TextareaAutosize}/>
                                    </div>
                                </div>
                                <div className="flex justify-center col-span-1 md:col-span-2 mt-5">
                                    <Button className="border-2 bg-amber-500 mb-5" variant="contained"
                                            disabled={props.isSubmitting}
                                            type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}