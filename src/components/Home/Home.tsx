import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { closeModal, setBOMData } from '../../Redux/Slices/BOMModalSlice';
import SideBar from './SideBar';
import Header from './Header';
import Dashboard from './Dashboard';
import BOMModal from '../BOM/BOMModal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isBOMModalVisible = useSelector((state: RootState) => state.bomModal.isVisible);

  const handleBOMSubmit = (itemNumber: string, dateSelected: string) => {
    dispatch(setBOMData({ itemNumber, dateSelected }));
    navigate('/bomtable');
    dispatch(closeModal());
  };

  const handleBOMModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1 flex flex-col'>
        <Header />
        <div className='flex-1 overflow-y-auto p-4'>
          <Dashboard /> 
        </div>
      </div>

      {isBOMModalVisible && <BOMModal onSubmit={handleBOMSubmit} onClose={handleBOMModalClose} />}
    </div>
  );
};

export default Home;


