
import { IoLogOutOutline } from "react-icons/io5"; 
import { RiAdminFill } from "react-icons/ri";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { RootState } from "../../Redux/store"; 
import { logout } from "../../Redux/Slices/AuthSlice"; 

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const userName = useSelector((state: RootState) => state.auth.userName);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  useEffect(() => {
    if (!userName) {

      navigate('/');
    }
  }, [userName, navigate]);

  const handleLogout = () => {

    dispatch(logout());

    navigate('/');
  };

  return (
    <div className="bg-white flex justify-between items-center p-4 shadow-md">
      <h1 className="text-lg font-semibold">Supply Chain System</h1>
      <div className="flex items-center">
        {userRole === 'Admin' && (
          <button
            className="ml-4 bg-blue-600 text-white px-3 py-2 mr-4 rounded-full flex items-center hover:scale-95"
            onClick={() => navigate('/userlist')}
          >
            <RiAdminFill className="text-2xl" />
          </button>
        )}
        <span className="font-semibold">Welcome, {userName || "Guest"}!</span>
        <button
          className="ml-4 bg-red-500 text-white px-3 py-2 mr-2 rounded flex items-center hover:scale-95"
          onClick={handleLogout}
        >
          <span className="mr-3 font-semibold">Exit</span>
          <IoLogOutOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;

