
import {getPortlandDrivers} from "../data/getdata.ts";

//import React,{useState} from "react";

import portlanddrivertype from '../types/portlanddrivertype.ts';
import {InputLabel, MenuItem} from "@mui/material";
import SelectIt from "./SelectIt.tsx";

export default function SelectEmployee({name,value,cbValue}:{name:string,value:number,cbValue:(name: string, value: number, empName: string | undefined) => void}){

    const [portlanddrivers,loading,error] = getPortlandDrivers();

    const p = portlanddrivers as portlanddrivertype[];

    const findEmployee = (id:number) => {
        return (p.find((item:portlanddrivertype) => {if(item.EmployeeID === id ) return item}))?.Name;
    }

    const cbTwo = (name:string,value:number) => {
        cbValue(name,value,findEmployee(value));
    }

    const makeOptions = () => {
        return p.map((item) => {
            return (<MenuItem value={item.EmployeeID}
                              key={item.EmployeeID}
            >
                {item.Name}
            </MenuItem>)
        })
    }

    if(loading) {return 'Loading ...';}

    if(error) {return error;}

    return (
        <>
            <InputLabel htmlFor={name}><b>Employee</b></InputLabel>
            <SelectIt name={name} value={value} cbValue={cbTwo} cbOptions={makeOptions} />
        </>
    )

}