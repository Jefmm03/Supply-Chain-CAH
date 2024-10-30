import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

export interface DecodedToken {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  [key: string]: string | number | boolean;
}

export const useUserRole = (): string | null => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    const decoded: DecodedToken = jwt_decode<DecodedToken>(token); 
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  return null;
};

