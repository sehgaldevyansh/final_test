
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../Apiconstants';
import Cookies from 'js-cookie';
const blockListApi = createApi({
    reducerPath:'blockLlistApi',
    baseQuery:fetchBaseQuery({
        baseUrl:API_BASE_URL
    }),
    endpoints(builder){
        return{
            fetchBlockLists:builder.query({
                query:(modelId)=>{
                    // console.log("args",modelId);
                    return{
                        url:`/dcms/filler/model/${modelId}/all-blocks`,
                        method:'GET',
                        params:{
                            "useremail":Cookies.get('email'),
                            "page":1,
                            "limit":1000,
                            "filter":"",
                            "column":"",
                        },
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
            updateCheckedBlockList:builder.mutation({
                query:(args)=>{
                    console.log("args",args);
                    return{
                        url:'/dcms/filler/block/check',
                        method:'PUT',
                        body:args?.updatedRow,
                        params:{
                            useremail:Cookies.get('email'),
                            modelId:args?.modelId,
                        },
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
            updateDraftBlockList:builder.mutation({
                query:(args)=>{
                    console.log("draftfiller",args);
                    return{
                        url:`/dcms/filler/model/${args?.filteredArray?.baseModel}/draft`,
                        method:'PUT',
                        body:args?.filteredArray,
                        params:{
                            useremail:Cookies.get('email'),
                            modelId:args?.modelId,
                        },
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
        }
    }
})

export const {
  useFetchBlockListsQuery,
  useUpdateCheckedBlockListMutation,
  useUpdateDraftBlockListMutation
} = blockListApi;
export { blockListApi };
