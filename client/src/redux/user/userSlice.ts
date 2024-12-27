import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
}
export interface UserState {
  currentUser: User | null;
  error: string | null;
  loading: boolean;
}
const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state: UserState) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state: UserState, action: PayloadAction<User>) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    loginFail: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state: UserState) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state: UserState, action: PayloadAction<User>) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signupFail: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutStart: (state: UserState) => {
      state.error = null;
      state.loading = true;
    },
    signoutSuccess: (state: UserState) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    signoutFail: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state: UserState) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  signupStart,
  signupSuccess,
  signupFail,
  signoutStart,
  signoutSuccess,
  signoutFail,
  clearError,
} = userSlice.actions;
export default userSlice.reducer;
