import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions',
        // baseUrl: 'http://party-srv:3000',
    }),
    endpoints(builder) {
        return {
            fetchUser: builder.query({
                query: (email) => {
                    return {
                        url: '/party/individual/query-by-name',
                        params: {
                            name
                        },
                        method: 'GET'
                    };
                }
            })
        };
    },

})

export const { useFetchUserQuery } = userApi;
export { userApi };