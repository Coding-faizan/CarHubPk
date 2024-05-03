import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false,
  };

export const AuthSlice= createSlice({
    name:'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
          state.user = null;
          state.isAuthenticated = false;
        },
      },
})

export const { setUser, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
