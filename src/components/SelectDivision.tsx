
import {getDivisions} from "../data/getdata.ts";

import divisiontype from "../types/divisiontype.ts";

import {InputLabel, MenuItem} from "@mui/material";

import SelectIt from "./SelectIt.tsx";

export default function SelectDivision({name,value,cbValue}:{name:string,value:number,cbValue:never}){

    const makeOptions = () => {
        return data.map((item : divisiontype) => {
            return (<MenuItem value={item.DivisionID}
                              key={item.DivisionID}
            >
                {item.Division}
            </MenuItem>)
        })
    }

    const [data,loading,error] = getDivisions();

    if(loading) {return 'Loading ...';}

    if(error) {return error;}

    return (
    <>
        <InputLabel htmlFor={name}><b>Division</b></InputLabel>
        <SelectIt name={name} value={value} cbValue={cbValue} cbOptions={makeOptions} />
    </>
    )

}
