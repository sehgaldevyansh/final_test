import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, GET_USERDATA_PATH } from '../Apiconstants'
import Cookies from 'js-cookie'
const userApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL
    }),
    endpoints(builder) {
        return {
            fetchUsers: builder.query({
                query: (userid) => {
                    return {
                        url: GET_USERDATA_PATH,
                        // params: {
                        //     userid: userid
                        // },
                        method: 'POST',
                        body: {
                            "email": Cookies.get('email')
                        }
                    }
                }
            }),
            // addUserDetails: builder.mutation({
            //    query:(args)=>{
            //     return{
            //         url:'/change',
            //         method
            //     }
            //    }
            // })
        }
    }
})


// userApi.useFetchUsersQuery();


export const { useFetchUsersQuery } = userApi;
export { userApi };