
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../Redux/Slices/ItemSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Filter from "../../Shared/Filter";
import * as XLSX from 'xlsx';

const ItemListSummary: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector((state: RootState) => state.item);

  const [filterVisible, setFilterVisible] = useState<{ [key: string]: boolean }>({
    itemNumber: false,
    vendorName: false,
    itemType:false,
    buyerCode:false,
    itemClass: false,
    leadTime: false,
    leadTimeInMonths: false,
    minimumBalance:false,
    allocation: false,
    totalAllocated: false,
    allocated_A: false,
    allocated_Q: false,
    allocated_QQ: false,
    allocated_C: false,
    allocated_H: false,
    unitMeasure: false,
    openPO_Calculation: false,
  });

  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItemNumbers, setSelectedItemNumbers] = useState<string[]>([]);
  const [selectedVendorName, setSelectedVendorName] = useState<string[]>([]);
  const [selectedItemType, setSelectedItemType] = useState<string[]>([]);
  const [selectedBuyerCode, setSelectedBuyerCode] = useState<string[]>([]);
  const [selectedItemClass, setSelectedItemClass] = useState<string[]>([]);
  const [selectedLeadTime, setSelectedLeadTime] = useState<string[]>([]);
  const [selectedLeadTimeInMonths, setSelectedLeadTimeInMonths] = useState<string[]>([]);
  const [selectedMinimumBalance, setSelectedMinimumBalance] = useState<string[]>([]);
  const [selectedAllocation, setSelectedAllocation] = useState<string[]>([]);
  const [selectedTotalAllocated, setSelectedTotalAllocated] = useState<string[]>([]);
  const [selectedAllocatedA, setSelectedAllocatedA] = useState<string[]>([]);
  const [selectedAllocatedQ, setSelectedAllocatedQ] = useState<string[]>([]);
  const [selectedAllocatedQQ, setSelectedAllocatedQQ] = useState<string[]>([]);
  const [selectedAllocatedC, setSelectedAllocatedC] = useState<string[]>([]);
  const [selectedAllocatedH, setSelectedAllocatedH] = useState<string[]>([]);
  const [selectedUnitMeasure, setSelectedUnitMeasure] = useState<string[]>([]);
  const [selectedOpenPO_Calculation, setSelectedOpenPO_Calculation] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {

    let filtered = items;

    if (selectedItemNumbers.length > 0) {
      filtered = filtered.filter((item) => selectedItemNumbers.includes(item.itemNumber));
    }

    if (selectedVendorName.length > 0) {
      filtered = filtered.filter((item) => selectedVendorName.includes(item.vendorName));
    }
    
    if (selectedItemType.length > 0) {
      filtered = filtered.filter((item) => selectedItemType.includes(item.itemType));
    }

    if (selectedBuyerCode.length > 0) {
      filtered = filtered.filter((item) => selectedBuyerCode.includes(item.buyerCode));
    }

    if (selectedItemClass.length > 0) {
      filtered = filtered.filter((item) => selectedItemClass.includes(item.itemClass));
    }

    if (selectedLeadTime.length > 0) {
      filtered = filtered.filter((item) => selectedLeadTime.includes(item.leadTime.toString())); 
    }

    if (selectedLeadTimeInMonths.length > 0) {
      filtered = filtered.filter((item) => selectedLeadTimeInMonths.includes(item.leadTimeInMonths.toString())); 
    }

    if (selectedMinimumBalance.length > 0) {
      filtered = filtered.filter((item) => selectedMinimumBalance.includes(item.minimumBalance.toString())); 
    }

    if (selectedAllocation.length > 0) {
      filtered = filtered.filter((item) => selectedAllocation.includes(item.allocation.toString())); 
    }

    if (selectedTotalAllocated.length > 0) {
      filtered = filtered.filter((item) => selectedTotalAllocated.includes(item.totalAllocated.toString())); 
    }

    if (selectedAllocatedA.length > 0) {
      filtered = filtered.filter((item) => selectedAllocatedA.includes(item.allocated_A.toString())); 
    }

    if (selectedAllocatedQ.length > 0) {
      filtered = filtered.filter((item) => selectedAllocatedQ.includes(item.allocated_Q.toString())); 
    }

    if (selectedAllocatedQQ.length > 0) {
      filtered = filtered.filter((item) => selectedAllocatedQQ.includes(item.allocated_QQ.toString())); 
    }

    if (selectedAllocatedC.length > 0) {
      filtered = filtered.filter((item) => selectedAllocatedC.includes(item.allocated_C.toString())); 
    }

    if (selectedAllocatedH.length > 0) {
      filtered = filtered.filter((item) => selectedAllocatedH.includes(item.allocated_H.toString())); 
    }

    if (selectedUnitMeasure.length > 0) {
      filtered = filtered.filter((item) => selectedUnitMeasure.includes(item.unitMeasure)); 
    }

    if (selectedOpenPO_Calculation.length > 0) {
      filtered = filtered.filter((item) => selectedOpenPO_Calculation.includes(item.openPO_Calculation.toString())); 
    }


    setFilteredItems(filtered);
  }, [selectedItemNumbers, selectedVendorName, selectedItemType, selectedBuyerCode, selectedItemClass, selectedLeadTime, selectedLeadTimeInMonths, selectedMinimumBalance, selectedAllocation, selectedTotalAllocated,
    selectedAllocatedA, selectedAllocatedQ, selectedAllocatedQQ, selectedAllocatedC, selectedAllocatedH, selectedUnitMeasure, selectedOpenPO_Calculation,items]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(items);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'SummaryData');
    XLSX.writeFile(workbook, 'SummaryData.xlsx')
  }

  const getUniqueItemNumber = () => [...new Set(items.map((item) => item.itemNumber))];
  const getUniqueVendorName = () => [...new Set(items.map((item) => item.vendorName))];
  const getUniqueItemType = () => [...new Set (items.map((item) => item.itemType))];
  const getUniqueBuyerCode = () => [...new Set (items.map((item) => item.buyerCode))];
  const getUniqueItemClass = () => [...new Set (items.map((item) => item.itemClass))];
  const getUniqueLeadTime = () => [...new Set (items.map((item) => item.leadTime.toString()))];
  const getUniqueLeadTimeInMonths = () => [...new Set (items.map((item) => item.leadTimeInMonths.toString()))];
  const getUniqueMinimumBalance = () => [...new Set (items.map((item) => item.minimumBalance.toString()))];
  const getUniqueAllocation = () => [...new Set (items.map((item) => item.allocation.toString()))];
  const getUniqueTotalAllocated = () => [...new Set (items.map((item) => item.totalAllocated.toString()))];
  const getUniqueAllocatedA = () => [...new Set (items.map((item) => item.allocated_A.toString()))];
  const getUniqueAllocatedQ = () => [...new Set (items.map((item) => item.allocated_Q.toString()))];  
  const getUniqueAllocatedQQ = () => [...new Set (items.map((item) => item.allocated_QQ.toString()))];
  const getUniqueAllocatedC = () => [...new Set (items.map((item) => item.allocated_C.toString()))];
  const getUniqueAllocatedH = () => [...new Set (items.map((item) => item.allocated_H.toString()))];
  const getUniqueUnitMeasure = () => [...new Set (items.map((item) => item.unitMeasure))];
  const getUniqueOpenPO_Calculation = () => [...new Set (items.map((item) => item.openPO_Calculation.toString()))];

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
            onClick={() => navigate("/home")}
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

        <h2 className="text-2xl font-bold text-center flex-1">Summary SCD</h2>

        <div className="w-24"></div>
      </div>


      <div className="relative flex-1 overflow-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-xs text-black uppercase tracking-wider">

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center">
                  <span>Item Number</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("itemNumber")}
                    />
                    {filterVisible.itemNumber && (
                      <div className="absolute top-8 left-0 z-20">
                        <Filter columnData={getUniqueItemNumber()} onFilterChange={setSelectedItemNumbers}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Vendor Name</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("vendorName")}
                    />
                    {filterVisible.vendorName && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueVendorName()} onFilterChange={setSelectedVendorName} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">Comment</th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Item Type</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("itemType")}
                    />
                    {filterVisible.itemType && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueItemType()} onFilterChange={setSelectedItemType} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Buyer Code</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("buyerCode")}
                    />
                    {filterVisible.buyerCode && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueBuyerCode()} onFilterChange={setSelectedBuyerCode} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Item Class</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("itemClass")}
                    />
                    {filterVisible.itemClass && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueItemClass()} onFilterChange={setSelectedItemClass} />
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Lead Time</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("leadTime")}
                    />
                    {filterVisible.leadTime && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueLeadTime()} onFilterChange={setSelectedLeadTime} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Lead Time Months</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("leadTimeInMonths")}
                    />
                    {filterVisible.leadTimeInMonths && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueLeadTimeInMonths()} onFilterChange={setSelectedLeadTimeInMonths} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Minimum Balance</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("minimunBalance")}
                    />
                    {filterVisible.minimumBalance && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueMinimumBalance()} onFilterChange={setSelectedMinimumBalance} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>



              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Allocation</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("allocation")}
                    />
                    {filterVisible.allocation && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueAllocation()} onFilterChange={setSelectedAllocation} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>


              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Total Allocated</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("totalAllocated")}
                    />
                    {filterVisible.totalAllocated && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueTotalAllocated()} onFilterChange={setSelectedTotalAllocated} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Allocated A</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("allocated_A")}
                    />
                    {filterVisible.allocated_A && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueAllocatedA()} onFilterChange={setSelectedAllocatedA} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Allocated Q</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("allocated_Q")}
                    />
                    {filterVisible.allocated_Q && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueAllocatedQ()} onFilterChange={setSelectedAllocatedQ} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Allocated QQ</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("allocated_QQ")}
                    />
                    {filterVisible.allocated_QQ && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueAllocatedQQ()} onFilterChange={setSelectedAllocatedQQ} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Allocated C</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("allocated_C")}
                    />
                    {filterVisible.allocated_C && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueAllocatedC()} onFilterChange={setSelectedAllocatedC} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Allocated H</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("allocated_H")}
                    />
                    {filterVisible.allocated_H && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueAllocatedH()} onFilterChange={setSelectedAllocatedH} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Open Calculation</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("openPO_Calculation")}
                    />
                    {filterVisible.openPO_Calculation && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueOpenPO_Calculation()} onFilterChange={setSelectedOpenPO_Calculation} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="px-4 py-3 text-left">
                <div className="flex justify-between items-center space-x-6">
                  <span>Unit Measure</span>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleFilter("unitMeasure")}
                    />
                    {filterVisible.unitMeasure && (
                      <div className="absolute top-8 right-0 z-20">
                        <Filter columnData={getUniqueUnitMeasure()} onFilterChange={setSelectedUnitMeasure} /> 
                      </div>
                    )}
                  </div>
                </div>
              </th>

            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm divide-y divide-gray-200">
            {filteredItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-500 font-bold">{item.itemNumber}</td>
                <td className="px-4 py-3">{item.vendorName}</td>
                <td className="px-4 py-3">{item.comment}</td>
                <td className="px-4 py-3">{item.itemType}</td>
                <td className="px-4 py-3">{item.buyerCode}</td>
                <td className="px-4 py-3">{item.itemClass}</td>
                <td className="px-4 py-3">{item.leadTime}</td>
                <td className="px-4 py-3">{item.leadTimeInMonths}</td>
                <td className="px-4 py-3">{item.minimumBalance}</td>
                <td className="px-4 py-3">{item.allocation}</td>              
                <td className="px-4 py-3">{item.totalAllocated}</td>
                <td className="px-4 py-3">{item.allocated_A}</td>
                <td className="px-4 py-3">{item.allocated_Q}</td>
                <td className="px-4 py-3">{item.allocated_QQ}</td>
                <td className="px-4 py-3">{item.allocated_C}</td>
                <td className="px-4 py-3">{item.allocated_H}</td>
                <td className="px-4 py-3">{item.openPO_Calculation}</td>
                <td className="px-4 py-3">{item.unitMeasure}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemListSummary;





