import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const formApi = createApi({
    reducerPath: 'form',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            form: builder.query({
                query: (id) => {
                    return {
                        url: `/form/query-by-id/${id}`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

const formListApi = createApi({
    reducerPath: 'formList',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.get-it.solutions'
    }),
    
    endpoints(builder) {
        return {
            formList: builder.query({
                query: () => {
                    return {
                        url: `/form/query`,
                        method: 'GET'
                    };
                }
            })
        };
    },

})

export const { useFormQuery } = formApi;
export const { useFormListQuery } = formListApi;
export { formApi, formListApi };