import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const decisionApi = createApi({
    reducerPath: 'decision',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            decision: builder.query({
                query: (id) => {
                    return {
                        url: `/decision/query-by-id/${id}`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

const decisionListApi = createApi({
    reducerPath: 'decisionList',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            decisionList: builder.query({
                query: () => {
                    return {
                        url: `/decision/query`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

export const { useDecisionQuery } = decisionApi;
export const { useDecisionListQuery } = decisionListApi;
export { decisionApi, decisionListApi };