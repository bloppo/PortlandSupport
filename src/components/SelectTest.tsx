import {getDivisions} from "../data/getdata.ts";

import {MenuItem, Select} from "@mui/material";

export default function SelectTest({name,value}:{name:string,value:number}){

    const [, loading, error] = getDivisions();

    if(loading) {return 'Loading ...';}

    if(error) {return error;}

    return (
        <>
            <Select
                variant = 'outlined'
                name={name}
                value={value}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </>
    )

}