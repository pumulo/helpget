import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const actionApi = createApi({
    reducerPath: 'action',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            action: builder.query({
                query: (id) => {
                    return {
                        url: `/action/query-by-id/${id}`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

const actionListApi = createApi({
    reducerPath: 'actionList',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            actionList: builder.query({
                query: () => {
                    return {
                        url: `/action/query`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

export const { useActionQuery } = actionApi;
export const { useActionListQuery } = actionListApi;
export { actionApi, actionListApi };