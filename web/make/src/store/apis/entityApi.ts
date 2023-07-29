import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const entityApi = createApi({
    reducerPath: 'entity',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    endpoints(builder) {
        return {
            entity: builder.query({
                query: (id) => {
                    return {
                        url: `/entity/query-by-id/${id}`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

export const { useEntityQuery } = entityApi;
export { entityApi };