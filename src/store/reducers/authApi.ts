import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../url';
import { RootState } from '../store';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
      baseUrl: url,
      prepareHeaders: (headers, { getState }) => {
        const session = (getState() as RootState).user.session;
        if (session) {
          headers.set('Session-id', session);
        }
        return headers
      },
    }),
    endpoints:
    (builder) => ({
      logOut: builder.mutation({
        query: (body) => ({
          url: 'logout',
          method: 'PATCH',
          body,
        }),
      }),
      logIn: builder.mutation({
        query: (body) => ({
          url: 'login',
          method: 'PATCH',
          body,
        }),
      }),
      register: builder.mutation({
        query: (body) => ({
          url: 'register',
          method: 'POST',
          body,
        })
      })
    }),
})

export const { useLogOutMutation, useLogInMutation, useRegisterMutation } = authApi;