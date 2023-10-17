import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isAuth: '',
        session: '',
        statsId: '',
        userId: '',
    },
    reducers: {
        authorize: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.session = action.payload.session;
            state.statsId = action.payload.statsId;
            state.userId = action.payload.userId;
        }
    }
})

export const store = configureStore({
    reducer: {
        auth: loginSlice.reducer,
    }
})

export const {authorize} = loginSlice.actions;