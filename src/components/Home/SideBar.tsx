
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../../Redux/store';
import { toggleSidebar } from '../../Redux/Slices/SideBarSlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Clock from './Clock';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`bg-gray-800 h-screen ${isCollapsed ? 'w-4' : 'w-64'} transition-all duration-300 py-2 px-4 relative`}>
      <button
        onClick={handleToggle}
        className="absolute top-24 -right-4 bg-gray-700 text-white p-3 rounded-full focus:outline-none"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <div className={`overflow-hidden ${isCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {!isCollapsed && (
          <div className="text-white p-2">
            <img src="/public/logo-topbar.png" alt="" className="p-2" />
            <Clock />

            <div className="text-gray-400 p-4">
              <ul>
                <li className="mb-2 hover:text-white">Summary</li>
                <li className="mb-2 hover:text-white">???</li>
                <li className="mb-2 hover:text-white">???</li>
                <li className="mb-2 hover:text-white">???</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
