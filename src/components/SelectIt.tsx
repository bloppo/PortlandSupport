
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
//import React from "react";

type SelectItType = {
    name:string,
    value:number,
    cbValue:(name: string, value: number) => void,
    cbOptions:()=>JSX.Element[]
}

export default function SelectIt({name,value,cbValue,cbOptions}:SelectItType) {

    const onChange = (e: SelectChangeEvent) =>
    {
        cbValue(name,Number(e.target.value));
    }

    return (
        <>
            <Select className="bg-amber-200 mb-1" size="small" variant='outlined' name={name} value={value+''} onChange={onChange}>
                <MenuItem value={0} key={0}>None</MenuItem>
                {cbOptions()}
            </Select>
        </>
    )

}
