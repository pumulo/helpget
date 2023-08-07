import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions',
        // baseUrl: 'http://party-srv:3000',
    }),
    endpoints(builder) {
        return {
            user: builder.query({
                query: (name) => {
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

export const { useUserQuery } = userApi;
export { userApi };