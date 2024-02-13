import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, GET_MODELLIST_PATH } from '../../Apiconstants';
import Cookies from 'js-cookie';
const modelListApi = createApi({
    reducerPath: 'modellists', // change const
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL // change const
    }),
    endpoints(builder) {
        return {
            deleteModelList: builder.mutation({
                query: (model) => {
                    return {
                        url: `${GET_MODELLIST_PATH}/${model?.id}`,
                        method: 'DELETE',
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
            addModelLists: builder.mutation({
                //    invalidatesTags:['ModelList'], // sasta jugad
                invalidatesTags: (result, error, args) => {
                    return [{ type: 'ModelList' }]
                },
                query: (user) => {
                    return {
                        url: 'model/action',  //dynamic
                        body: user,
                        method: 'PATCH',
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
            fetchModelLists: builder.query({
                // providesTags:['ModelList'], //  sasta jugas
                providesTags: (result, error, user) => {
                    console.log("user", result?.results);
                    return [{ type: 'ModelList' }]
                },
                query: (user) => {
                    return {
                        url: GET_MODELLIST_PATH,
                        params: {
                            userId: user?.id
                        },
                        method: 'POST',
                        body: { "useremail": Cookies.get('email') },
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
// modelListApi.useFetchModelListsQuery();// 391
// modelListApi.useDeleteModelListMutation
// modelListApi.useAddModelListsMutation
export const { useFetchModelListsQuery, useAddModelListsMutation, useDeleteModelListMutation } = modelListApi;
export { modelListApi };

//fetchAlbums