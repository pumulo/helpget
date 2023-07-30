import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const entityApi = createApi({
    reducerPath: 'entity',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints: (builder) => ({
        entity: builder.query({
            query: (id) => {
                return {
                    url: `/entity/query-by-id/${id}`,
                    method: 'GET'
                };
            }
        }),
        entityList: builder.query({
            query: () => {
                return {
                    url: `/entity/query`,
                    method: 'GET'
                };
            }
        }),
        newEntity: builder.mutation({
            query: (payload) => {
                return {
                    url: `/entity/create`,
                    method: 'POST',
                    body: payload,
                    headers: {
                        'Content-type': 'application/json'
                    },
                };
            }
        })
    })
});

export const {
    useEntityQuery,
    useEntityListQuery,
    useNewEntityMutation
} = entityApi;
export { entityApi };