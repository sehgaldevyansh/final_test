import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL ,API_BASE_URL2,GET_MODEL_PATH} from '../../Apiconstants';
import Cookies from 'js-cookie';
const modelDetailsApi = createApi({
    reducerPath: 'modelDetails',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL
    }),
    endpoints(builder) {
        return {
            addModelDetails: builder.mutation({
                invalidatesTags: (results, error, args) => {
                    console.log("Model Details invalid", args);
                    return [{ type: 'ModelDetails', id: args?.name }]
                },
                query: (modelDetails) => {
                    console.log("Model Details", modelDetails);
                    return {
                        url: '/create',
                        body: modelDetails,
                        method:'POST',
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          }
                    }
                }
            }),
            fetchModelDetails: builder.query({
                providesTags: (results, error, args) => {
                    return [{ type: 'ModelDetails', id: args?.name }]
                },
                query: (model) => {
                    return {
                        url: GET_MODEL_PATH,
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          },
                        method: 'POST',
                        body:{"modelName" : model}
                    }
                }
            }),
            fetchBaseModelListByTPLUpload: builder.query({
                
                query: (modelId) => {
                    return {
                        url: `${API_BASE_URL2}/api/msil/all-base-models/${modelId}`,
                        headers:{
                            "token":Cookies.get('jwtToken'),
                            "user":Cookies.get('email'),
                          },
                        method: 'GET'
                    }
                }
            }),
            fetchFileDetailsUpload: builder.query({
                
                query: (args) => {
                    return {
                        url: `${API_BASE_URL2}/api/getFileDetails`,
                        body:args,
                        method: 'POST',
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

export const { useFetchFileDetailsUploadQuery,useAddModelDetailsMutation, useFetchModelDetailsQuery ,useFetchBaseModelListByTPLUploadQuery} = modelDetailsApi;
export { modelDetailsApi };
