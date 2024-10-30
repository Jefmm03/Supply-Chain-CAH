
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store"; 

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); 

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
