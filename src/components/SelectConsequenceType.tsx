import {getConsequences} from "../data/getdata.ts";

import {InputLabel, MenuItem} from "@mui/material";

import SelectIt from "./SelectIt.tsx";

import consequencetype from "../types/consequencetype.ts";

export default function SelectConsequenceType({name,value,cbValue}:{name:string,value:number,cbValue:never}){

const [data,loading,error] = getConsequences();

const p1 : number[] = [];

if(loading) {return 'Loading ...';}

if(error) {return error;}

data.map((c : consequencetype) => {
    if (p1.indexOf(c.CT_TypeID) === -1) {
        p1.push(c.CT_TypeID)
    }
})

const makeOptions = () => {
    return p1.map((item) => {
        const b : consequencetype|undefined = data.find((x : consequencetype): boolean => {return x.CT_TypeID === item})
        return (<MenuItem value={b?.CT_TypeID}
                          key={b?.CT_TypeID}>{b?.CT_ConsequenceType}
        </MenuItem>)
    })
}
    return (
        <>
            <InputLabel htmlFor={name}><b>Type</b></InputLabel>
            <SelectIt name={name} value={value} cbValue={cbValue} cbOptions={makeOptions} />
        </>
    )
}
