// all variants details of a base model at once
// get/fetch dropdown data from a TPL with base model/ block filter(may be)
// post request to add a partlist in  a block 
// post request to add variant in a block
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../Apiconstants';
import Cookies from 'js-cookie';
const variantDetailsApi = createApi({
    reducerPath:'variantDetails',
    baseQuery:fetchBaseQuery(({
        baseUrl:API_BASE_URL
    })),
    endpoints(builder){
        return{
            fetchVariantsByBaseModel:builder.query({
                query:(props)=>{
                    console.log("Details",props);
                    return{
                        url:"/dcms/filler/variant/${VARIANT}",
                        params:{
                            useremail:Cookies.get('email'), 
                            block:"CJ101",
                            variant:"string",
                            baseModel:"string"
                        },
                        method:'GET',
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
            fetchBaseModelListByBlock:builder.query({
                query:(user)=>{
                    return{
                        url:'add end point',
                        // params
                        method:'GET',
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

export const{useFetchBaseModelListByBlockQuery,useFetchVariantsByBaseModelQuery}=variantDetailsApi
export {variantDetailsApi};