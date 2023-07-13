import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    endpoints(builder) {
        return {
            fetchUser: builder.query({
                query: (email) => {
                    return {
                        url: '/party/individual/query',
                        params: {
                            email
                        },
                        method: 'GET'
                    };
                }
            })
        };
    }

})

export const { useFetchUserQuery } = userApi;
export { userApi };