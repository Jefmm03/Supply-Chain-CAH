
import { Middleware } from '@reduxjs/toolkit';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { logout } from '../Slices/AuthSlice';

let isLoggingOut = false; 

const AuthMiddleware: Middleware = ({ dispatch, getState }) => (next) => (action) => {
  const state = getState();
  const token = state.auth.token;


  if (token && !isLoggingOut) {
    const decoded = jwtDecode<JwtPayload>(token);


    if (decoded.exp && decoded.exp * 1000 < Date.now()) {

      if (state.auth.isAuthenticated) {
        isLoggingOut = true; 
        dispatch(logout());

        setTimeout(() => {
          window.location.href = '/';
        }, 100);

        return;
      }
    }
  }

  return next(action);
};

export default AuthMiddleware;
