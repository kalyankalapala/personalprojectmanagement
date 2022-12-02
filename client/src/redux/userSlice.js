import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateProfile: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});
export const { loginStart, loginFailure, updateProfile, loginSuccess, logout } =
  userSlice.actions;
export default userSlice.reducer;
