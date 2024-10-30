
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { RootState } from './Redux/store';
import { logout } from './Redux/Slices/AuthSlice';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ItemListSummary from "./components/PlanningControl/ItemListSCD";
import ProtectedRoute from "./Helper/ProtectedRoute";
import UserList from "./components/Maintenance/UserList";
import BOMTable from "./components/BOM/BOMTable";
import RequirementForm from './components/Requirement/RequirementForm';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {

      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        dispatch(logout());
        navigate('/');
      }
    }
  }, [token, dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {!isAuthenticated ? (
        <Route path="*" element={<Navigate to="/" replace />} />
      ) : (
        <>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/listscd" element={<ProtectedRoute><ItemListSummary /></ProtectedRoute>} />
          <Route path="/userlist" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/bomtable" element={<ProtectedRoute><BOMTable /></ProtectedRoute>} />
          <Route path="/reqform" element={<ProtectedRoute><RequirementForm /></ProtectedRoute>} />
        </>
      )}
    </Routes>
  );
}

export default App;

