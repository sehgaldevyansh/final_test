// get all list
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../Apiconstants";
import Cookies from "js-cookie";
const baseModelListApi = createApi({
    reducerPath: 'fillerBaseModelList',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL
    }),
    endpoints(builder) {
        return {
            fetchBaseModelLists: builder.query({
                query: (user) => {
                    return {
                        url: '/dcms/filler/all-model',
                        method: 'GET',
                        params: {
                            "useremail": Cookies.get('email'),
                            "page": 1,
                            "limit": 1000,
                            "filter": "",
                            "column": "modelId",
                        },
                        headers: {
                            "token": Cookies.get('jwtToken'),
                            "user": Cookies.get('email'),
                        }
                    }
                }
            }),
            fetchBaseModelByModelId: builder.query({
                query: (modelId) => {
                    return {
                        url: `/dcms/filler/model/${modelId}/summary`,
                        method: 'GET',
                        params: {
                            "useremail": Cookies.get('email'),
                        },
                        headers: {
                            "token": Cookies.get('jwtToken'),
                            "user": Cookies.get('email'),
                        }
                    }
                }
            })
        }
    }
})

export const { useFetchBaseModelListsQuery, useFetchBaseModelByModelIdQuery } = baseModelListApi;
export { baseModelListApi }