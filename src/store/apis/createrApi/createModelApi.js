import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../Apiconstants'
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
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          },
                        url:"/createtemplate",
                        method:'GET',
                        params:{
                            useremail:Cookies.get('email'),
                            fileName:file
                         },
                         
                    }
                }
            }),
            addModelCreateTemplate: builder.mutation({
                query:(args)=>{
                    return{
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          },
                        url:'/create',
                        method:'POST',
                        body:args 
                    }
                }
            })
        }
    }
})
export const {useFetchCreateModelTemplateQuery,useAddModelCreateTemplateMutation }=createModelApi;
export {createModelApi};