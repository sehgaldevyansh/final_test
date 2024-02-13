// get all list
import {createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL,FILLER_BASE_URL } from "../../Apiconstants";
import Cookies from "js-cookie";
const devaitionlListApi=createApi({
    reducerPath:'devaitionlListApiPath',
    baseQuery:fetchBaseQuery({
        baseUrl:FILLER_BASE_URL
    }),
    endpoints(builder){
        return{
            fetchDeviationLists : builder.query({
                query:(args)=>{
                    return{
                        url:'/dcms/filler/get-deviation-list',
                        method:'GET',
                        params:{
                            "useremail":"",
                            "system":"",
                            "block":"" ,
                            "modelId":"", 
                        },
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            })
        }
    }
})

export const {useFetchDeviationListsQuery}=devaitionlListApi;
export {devaitionlListApi}