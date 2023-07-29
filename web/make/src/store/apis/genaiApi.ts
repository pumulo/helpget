import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const genaiApi = createApi({
    reducerPath: 'genai',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            genai: builder.query({
                query: (payload) => {
                    return {
                        url: `/genai/query`,
                        method: 'POST',
                        body: payload,
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    };
                }
            })
        };
    },

})

export const { useGenaiQuery } = genaiApi;
export { genaiApi };