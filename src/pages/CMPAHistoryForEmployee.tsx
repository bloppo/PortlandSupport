// @ts-expect-error deploy to server
import React,{useRef} from "react";

import {useReactToPrint} from "react-to-print";

import { differenceInDays } from 'date-fns';

import getCMPAHistoryForEmployee from "../data/getdata.ts";

import cmpahistorytype from '../types/cmpahistorytype.ts';

import {format} from "date-fns";
import {useParams} from "react-router-dom";
import NavButton from "../components/NavButton.tsx";
import Button from "@mui/material/Button";

import './print.css'

function CMPAHistoryForEmployee() {

    const contentRef = useRef<HTMLDivElement>(null);

    const reactToPrintFn = useReactToPrint({contentRef});

    const {id,name} = useParams<{ id: string, name: string }>();

    const formatThatDate = (datestr: string): string => {
        if (datestr.length === 0) return '';
        const d = new Date(datestr);
        return format(d, "MM-dd-yy");
    }

    const tallyPoints = (cmpahistory: cmpahistorytype[]) => {
        let sum = 0;
        const d = new Date();
        for (const i of cmpahistory) {
            if (i) {
                try {
                    if (i.IncidentDate !== '') {
                        const f = new Date(i.IncidentDate);
                        const diff = differenceInDays(d, f);
                        //console.log(d);
                        //console.log(f);
                        //console.log(diff);
                        if (diff <= 365) {
                            sum += i.Points / 10
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return sum;
    }

    const today = format(new Date(), 'MM/dd/yyyy');

    const [cmpahistory, loading, error] = getCMPAHistoryForEmployee(Number(id)) as [cmpahistorytype[], boolean, string | null];

    if (loading) {
        return 'Loading ...';
    }

    if (error) {
        return error;
    }
//    <th className="text-left w-[75px]">Employee</th>
//    <td className="text-left">{item.Name}</td>
//    <th className="text-left text-[8pt] w-[60px]">Notify Supervisor</th>
//    <td className="text-left text-[8pt]">{formatThatDate(item.SupervisorFinished)}</td>

    return (
        <div>
            <NavButton title='CMPA Form' link='/CMPAForm' className="mt-5 mb-5"/>
            <Button variant='contained' className="ml-3 pl-10 pr-10" sx={{textTransform: 'capitalize'}}
                    onClick={() => reactToPrintFn()}>Print</Button>
            <div ref={contentRef} className="text-[10pt]">
                <h2>CMPA</h2>
                <h2>{name}</h2>
                <h2>{today}</h2>
                <table cellPadding="2px" className="table-fixed text-[10pt]">
                    <thead>
                    <tr className="bg-blue-50">
                        <th className="text-left w-[40px]">Incident ID</th>
                        <th className="text-left w-[85px]">Division</th>
                        <th className="text-left w-[60px]">Entry Date</th>
                        <th className="text-left w-[60px]">Incident Date</th>
                        <th className="text-left w-[60px]">Finalized On</th>
                        <th className="text-left w-[75px]">Note Type</th>
                        <th className="text-left w-[75px]">Incident Type</th>
                        <th className="text-left w-[75px]">Manager</th>
                        <th className="text-left w-[30px]">Points</th>
                        <th className="text-left w-[40px]">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {cmpahistory.map((item: cmpahistorytype, i: number) => {
                        return (
                            item === null ? '' :
                                <tr key={item.IncidentID}
                                    style={{backgroundColor: i % 2 === 0 ? '#cccccc' : '#eeeeee'}}>
                                    <td className="text-left">{item.IncidentID}</td>
                                    <td className="text-left">{item.Division}</td>
                                    <td className="text-left">{formatThatDate(item.EntryDate)}</td>
                                    <td className="text-left">{formatThatDate(item.IncidentDate)}</td>
                                    <td className="text-left">{formatThatDate(item.FinalizedOn)}</td>
                                    <td className="text-left">{item.NoteType}</td>
                                    <td className="text-left">{item.IncidentType}</td>
                                    <td className="text-left">{item.Manager}</td>
                                    <td className="text-left">{item.Points / 10}</td>
                                    <td className="text-left">{item.status}</td>
                                </tr>

                        )
                    })}
                    <tr>
                        <td colSpan={7}><br/></td>
                        <td className="font-semibold" colSpan={1}>Total Points : </td>
                        <td className="font-semibold" colSpan={2}>{tallyPoints(cmpahistory)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default CMPAHistoryForEmployee;
