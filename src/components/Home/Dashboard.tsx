
import DashboardCard from './DashboardCard';
import { useDispatch } from 'react-redux';
import { openModal } from '../../Redux/Slices/BOMModalSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleBOMClick = () => {
    dispatch(openModal()); 
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Planning Control"
        linkTo="/listscd"
        content=""
        bgColor="bg-teal-500"
      />
      <DashboardCard
        title="BOM"
        content="Bill of Materials"
        bgColor="bg-green-500"
        onClick={handleBOMClick} 
      />
      <DashboardCard
        title="Requisitions"
        linkTo="/reqform"
        content="Requisitions"
        bgColor="bg-yellow-500"
      />
      <DashboardCard
        title="CARs"
        linkTo="/summary"
        content="Capital Appropriation Request"
        bgColor="bg-red-500"
      />
    </div>
  );
};

export default Dashboard;


