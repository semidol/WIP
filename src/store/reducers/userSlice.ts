import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

type TReceivedData = {
  user_id: string,
  session: string,
  chat_id: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    userId: '',
    session: '',
    chatId: '',
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.logIn.matchFulfilled,
      (state, action: PayloadAction<TReceivedData>) => {
        state.isAuth = true;
        state.userId = action.payload.user_id;
        state.session = action.payload.session;
        state.chatId = action.payload.chat_id;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logOut.matchFulfilled,
      (state) => {
        state.isAuth = false;
        state.userId = '';
        state.session = '';
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action: PayloadAction<TReceivedData>) => {
        state.isAuth = true;
        state.userId = action.payload.user_id;
        state.session = action.payload.session;
        state.chatId = action.payload.chat_id;
      }
    );
  }
})

export default userSlice.reducer