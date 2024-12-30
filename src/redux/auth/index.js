import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userSession } from '../actions/auth';

const initialState = {
  user: null,
  error: false,
  message: '',
  loading: false,
  logged: false,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    userLog: (state) => {
      try {
        const auth = localStorage.getItem('phoenix_auth');
          return {
          ...state,
          user: JSON.parse(auth).user,
        };
      } catch {
        return {
          ...state,
          user: null,
        };
      }
    },

  },
  extraReducers: (builder) =>  {
      builder
      .addCase(registerUser.fulfilled, (state, action) => {
          console.log(action.payload)
          return{
              ...state,
              user: action.payload.data,
              logged: true,
              loading: false
          }
      })
      .addCase(registerUser.rejected, (state, action) => {
          return{
              ...state,
              message: action.payload.message,
              loading: false
          }
      })
      .addCase(registerUser.pending, (state) => {
          return{
              ...state,
              loading: true,
          }
      })
      .addCase(userSession.fulfilled, (state, action) => {
          return{
              ...state,
              user: action.payload.data,
              logged: true,
              loading: false

          }
      })
      .addCase(userSession.rejected, (state, action) => {
          return{
              ...state,
              message: action.payload.message,
              loading: false

          }
      })
      .addCase(userSession.pending, (state) => {
          return{
              ...state,
              loading: true,
          }
      })
  
  },

});

export default AuthSlice.reducer;
export const { userLog } = AuthSlice.actions;
