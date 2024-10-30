

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchBOMData } from '../../Redux/Slices/BOMTableSlice'; 
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import Filter from "../../Shared/Filter"; 
import { BsThreeDotsVertical } from 'react-icons/bs';
import * as XLSX from 'xlsx';

const BOMTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { bomData, loading, error } = useSelector((state: RootState) => state.bom); 
  const itemNumber = useSelector((state: RootState) => state.bomModal.itemNumber);
  const dateSelected = useSelector((state: RootState) => state.bomModal.dateSelected);

  const [filterVisible, setFilterVisible] = useState<{ [key: string]: boolean }>({
    bprod: false,
    pardesc: false,
    bchld: false,
    idesc: false,
    grossUsage: false,
  });

  const [filteredBOMData, setFilteredBOMData] = useState(bomData);
  const [selectedBProd, setSelectedBProd] = useState<string[]>([]);
  const [selectedParentDesc, setSelectedParentDesc] = useState<string[]>([]);
  const [selectedChildItem, setSelectedChildItem] = useState<string[]>([]);
  const [selectedChildDesc, setSelectedChildDesc] = useState<string[]>([]);
  const [selectedGrossUsage, setSelectedGrossUsage] = useState<string[]>([]);

  useEffect(() => {
    if (itemNumber && dateSelected) {
      dispatch(fetchBOMData({ itemNumber, dateSelected }));
    }
  }, [dispatch, itemNumber, dateSelected]);

  useEffect(() => {

    let filtered = bomData;

    if (selectedBProd.length > 0) {
      filtered = filtered.filter((item) => selectedBProd.includes(item.bprod));
    }

    if (selectedParentDesc.length > 0) {
      filtered = filtered.filter((item) => selectedParentDesc.includes(item.pardesc));
    }

    if (selectedChildItem.length > 0) {
      filtered = filtered.filter((item) => selectedChildItem.includes(item.bchld));
    }

    if (selectedChildDesc.length > 0) {
      filtered = filtered.filter((item) => selectedChildDesc.includes(item.idesc));
    }

    if (selectedGrossUsage.length > 0) {
      filtered = filtered.filter((item) => selectedGrossUsage.includes(item.grossUsage.toString()));
    }

    setFilteredBOMData(filtered);
  }, [selectedBProd, selectedParentDesc, selectedChildItem, selectedChildDesc, selectedGrossUsage, bomData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bomData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'BOMData');
    XLSX.writeFile(workbook, 'BOMData.xlsx')
  }

  const getUniqueBProd = () => [...new Set(bomData.map((item) => item.bprod))];
  const getUniqueParentDesc = () => [...new Set(bomData.map((item) => item.pardesc))];
  const getUniqueChildItem = () => [...new Set(bomData.map((item) => item.bchld))];
  const getUniqueChildDesc = () => [...new Set(bomData.map((item) => item.idesc))];
  const getUniqueGrossUsage = () => [...new Set(bomData.map((item) => item.grossUsage.toString()))];

  const toggleFilter = (column: string) => {
    setFilterVisible((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className="w-full h-screen flex flex-col p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            className="bg-yellow-400 text-white px-4 py-2 rounded font-medium shadow-md hover:bg-yellow-00 transition"
            onClick={() => navigate('/home')}
          >
            Return
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded font-medium shadow-md hover:bg-green-600 transition"
            onClick={exportToExcel}
          >
            Export
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center flex-1">BOM</h2>
        <div className="w-24"></div>
      </div>

      <div className="relative flex-1 overflow-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-xs text-black uppercase tracking-wider">

              <th className="px-4 py-3 border">
                <div className="flex justify-between items-center">
                  <span>Level</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter('bprod')}
                    />
                    {filterVisible.bprod && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueBProd()} onFilterChange={setSelectedBProd} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 border">
                <div className="flex justify-between items-center">
                  <span>Item Description</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter('pardesc')}
                    />
                    {filterVisible.pardesc && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueParentDesc()} onFilterChange={setSelectedParentDesc} />
                      </div>
                    )}
                  </div>
                </div>
              </th>



              <th className="px-4 py-3 border">
                <div className="flex justify-between items-center">
                  <span>Child Item</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter('bchld')}
                    />
                    {filterVisible.bchld && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueChildItem()} onFilterChange={setSelectedChildItem} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 border">
                <div className="flex justify-between items-center">
                  <span>Child Description</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter('idesc')}
                    />
                    {filterVisible.idesc && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueChildDesc()} onFilterChange={setSelectedChildDesc} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 border">
                <div className="flex justify-between items-center">
                  <span>Gross Usage</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter('grossUsage')}
                    />
                    {filterVisible.grossUsage && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueGrossUsage()} onFilterChange={setSelectedGrossUsage} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBOMData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{item.bprod}</td>
                <td className="px-4 py-2 border">{item.pardesc}</td>
                <td className="px-4 py-2 border">{item.bchld}</td>
                <td className="px-4 py-2 border">{item.idesc}</td>
                <td className="px-4 py-2 border">{item.grossUsage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BOMTable;

