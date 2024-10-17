import {getConsequences} from "../data/getdata.ts";

//import React from "react";

import consequencetype from "../types/consequencetype.ts";
import SelectIt from "./SelectIt.tsx";
import {InputLabel, MenuItem} from "@mui/material";

//{setTypeID}:{setTypeID:React.Dispatch<React.SetStateAction<string>>}
//export default function SelectConsequence({name,value,cbValue,TypeID}:{name:string,value:number,cbValue:React.Dispatch<React.SetStateAction<number>>,TypeID:number}){
//export default function SelectConsequence({name,value,cbValue,TypeID}:{name:string,value:number,cbValue:never,TypeID:number}){
export default function SelectConsequence({name,value,cbValue,TypeID}:{name:string,value:number,cbValue:(name: string, value: number) => void,TypeID:number}){

    const [consequences,loading,error] = getConsequences();

    if(loading) {return 'Loading ...';}

    if(error) {return error;}

    const makeOptions = () => {
        return consequences.filter((i : consequencetype) => {return i.CT_TypeID === TypeID}).map((item : consequencetype) => {
            return (<MenuItem value={item.CC_ConsequenceID} key={item.CC_ConsequenceID}>{item.CC_Consequence}</MenuItem>)
        })
    }


    return (
        <>
            <InputLabel htmlFor={name}><b>Note Type</b></InputLabel>
            <SelectIt name={name} value={value} cbValue={cbValue} cbOptions={makeOptions} />
        </>
    )

}