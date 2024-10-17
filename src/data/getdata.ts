import {useState,useEffect} from 'react';

import base64 from 'base-64';

import axios from 'axios';
import consequencetype from "../types/consequencetype.ts";
import divisiontype from "../types/divisiontype.ts";

//import type {AxiosResponse} from 'axios/index';

//import cmpahistorytype from'../types/cmpahistorytype.ts'

const useAxios = (url:string,params:string) :[never,boolean,string | null] => {

    const [data, setData] = useState<never>(null as never);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {

        const fetchData =  async () => {
            await axios({url:url,
                    method:'post',
                    data:params
                }
            )
                .then(function (response) {
                    //console.log(response.data);
                    try {
                        setData(response.data as never);
                        setLoading(false);
                    } catch (error:unknown) {
                        if(error instanceof Error) {
                            console.log(error.message)
                        }
                    } finally {
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    setError(error);
                    setLoading(false);
                });

        };

        fetchData();

    },[url,params])

return [data,loading,error];

}

const CallWebService = (method:string,params:string):[never,boolean,string|null] => {
    const url = `https://ws.comtrans.net/WebOrderDBLookup/PortlandSupport.asmx/${method}`;
    return useAxios(url,params);
}

export const getPortlandDrivers = () => {

    console.log(localStorage.getItem('manid'));

    const manid = base64.decode(localStorage.getItem('manid'));

    console.log('manid',manid);

    const method = 'GetPortlandDrivers';
    const params = ''; //`ManagerID=${manid}`;
    return CallWebService(method,params)

}

export const getDivisions = ():[divisiontype[],boolean,string|null] => {
    const method = 'GetDivisions';
    const params = '';
    return CallWebService(method,params);

}

export const getConsequences = (): [consequencetype[],boolean,string|null]    => {
    const method = 'GetConsequences';
    const params = '';
    return CallWebService(method,params);
}

const getCMPAHistoryForEmployee = (EmpID : number) => {

    const method = 'CMPAHistoryForEmployee'
    const params = `EmpID=${EmpID}`
    return CallWebService(method,params)

}

export default getCMPAHistoryForEmployee;
