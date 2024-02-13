import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../Apiconstants'
import Cookies from 'js-cookie'
const createModelApi = createApi({
    reducerPath:'createmodels',
    baseQuery:fetchBaseQuery({
        baseUrl:API_BASE_URL
    }),
    endpoints(builder){
        return{
            fetchCreateModelTemplate:builder.query({
                query:(args)=>{
                    return{
                        url:"/createtemplate",
                        method:'GET',
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
            addModelCreateTemplate: builder.mutation({
                query:(args)=>{
                    return{
                        url:'/create',
                        method:'POST',
                        body:args,
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
export const {useFetchCreateModelTemplateQuery,useAddModelCreateTemplateMutation }=createModelApi;
export {createModelApi};