import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 

interface AuthState {
  token: string | null;
  userAccount: string | null;
  userName: string | null;
  userRole: string | null; 
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userAccount: null,
  userName: null,
  userRole: null, 
  isAuthenticated: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; userAccount: string; userName: string; userRole: string }>) => {
      state.token = action.payload.token;
      state.userAccount = action.payload.userAccount;
      state.userName = action.payload.userName;
      state.userRole = action.payload.userRole; 
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.token = null;
      state.userAccount = null;
      state.userName = null;
      state.userRole = null; 
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
