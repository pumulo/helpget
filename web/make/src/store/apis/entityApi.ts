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

const entityListApi = createApi({
    reducerPath: 'entityList',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            entityList: builder.query({
                query: () => {
                    return {
                        url: `/entity/query`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

export const { useEntityQuery } = entityApi;
export const { useEntityListQuery } = entityListApi;
export { entityApi, entityListApi };