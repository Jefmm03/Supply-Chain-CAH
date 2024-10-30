
/*
import { useState } from 'react';
import * as XLSX from 'xlsx';

const RequirementForm = () => {
  // Crear un estado para 20 filas, cada una con item y cantidades vacías
  const initialRows = Array.from({ length: 20 }, () => ({
    item: '',
    quantities: Array(12).fill(''), // Permitir cadena vacía
  }));

  const [rows, setRows] = useState(initialRows);

  // Manejar cambios en los items
  const handleItemChange = (rowIndex: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].item = value;
    setRows(updatedRows);
  };

  // Manejar cambios en las cantidades
  const handleQuantityChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].quantities[colIndex] = value; // Permitir cadena vacía
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = {item: '', quantities: Array(12).fill('')};
      setRows([...rows, newRow]);
  };
  

  // Exportar a Excel
  const handleExportToExcel = () => {
    const headers = ['Item', ...getMonthYearLabels()]; // Encabezados de columnas
    const data = rows.map(row => [row.item, ...row.quantities]); // Datos de la tabla

    // Crear la hoja de trabajo
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

    // Crear el libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Requerimientos');

    // Exportar el archivo
    XLSX.writeFile(workbook, 'Requerimientos.xlsx');
  };


  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rows); // Puedes reemplazar esto para enviar los datos al backend
  };

  // Obtener el mes y año actual para los encabezados
  const getMonthYearLabels = () => {
    const labels = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const monthYear = new Date(currentDate.getFullYear(), currentDate.getMonth() + i);
      labels.push(monthYear.toLocaleString('default', { month: 'short', year: 'numeric' }));
    }

    return labels;
  };

  const monthYearLabels = getMonthYearLabels();

    // Función para manejar la carga masiva de datos desde un archivo Excel
    const handleMassiveDataUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        // Mapeo de datos desde el archivo Excel a las filas del estado
        const newRows = data.map((row) => ({
          item: row[0] || '', // Asignar el valor de la primera columna como item
          quantities: row.slice(1, 13), // Asignar las siguientes 12 columnas como cantidades
        }));
  
        // Actualizar el estado con todas las filas del archivo
        setRows(newRows.length > 0 ? newRows : initialRows); // Si no hay datos, cargar las filas iniciales
      };
  
      reader.readAsBinaryString(file);
    };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-[1800px] overflow-x-auto">

        
        <div className="flex items-center justify-between mb-6">
          
          <div className="flex gap-2 ml-20">


            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
              Massiv Data
            </button>
            <button 
            onClick={handleExportToExcel}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
              Export
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
              Save
            </button>
            <button
              type="submit"
              onClick={handleAddRow}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
              Add Columns
            </button>
          </div>

         
          <h2 className="text-2xl font-bold text-center">Add Requirements</h2>

          
          <div className="flex gap-2 mr-20">
            <button className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
              Return
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
              asd
            </button>

          </div>

        </div>

        
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 ml-28">
            <div className="w-24 text-center font-bold">Item</div>
            {monthYearLabels.map((label, index) => (
              <div key={index} className="w-[120px] text-center font-bold">
                {label}
              </div>
            ))}
          </div>

          
          <div className="space-y-2">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2 justify-center">
                <input
                  type="text"
                  value={row.item}
                  onChange={(e) => handleItemChange(rowIndex, e.target.value)}
                  className="border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32 text-center"
                />

                {row.quantities.map((quantity, colIndex) => (
                  <input
                    key={colIndex}
                    type="text"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(rowIndex, colIndex, e.target.value)}
                    className="border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-28 text-center appearance-none"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementForm;

*/



import { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx';

const RequirementForm = () => {
  
  const initialRows = Array.from({ length: 20 }, () => ({
    item: '',
    quantities: Array(12).fill(''), 
  }));

  const [rows, setRows] = useState(initialRows);

    
    const handleItemChange = (rowIndex: number, value: string) => {
      const updatedRows = [...rows];
      updatedRows[rowIndex].item = value;
      setRows(updatedRows);
    };

   
    const handleQuantityChange = (rowIndex: number, colIndex: number, value: string) => {
      const updatedRows = [...rows];
      updatedRows[rowIndex].quantities[colIndex] = value; 
      setRows(updatedRows);
    };

 
  const handleAddRow = () => {
    const newRow = { item: '', quantities: Array(12).fill('') };
    setRows([...rows, newRow]);
  };
  
  // Exportar a Excel
  const handleExportToExcel = () => {
    const headers = ['Item', ...getMonthYearLabels()]; 
    const data = rows.map((row) => [row.item, ...row.quantities]); 
   
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Requerimientos');

    
    XLSX.writeFile(workbook, 'Requerimientos.xlsx');
  };


const handleMassiveDataUpload = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return; 

  const reader = new FileReader();

  reader.onload = (event) => {
    
    const binaryStr = event?.target?.result;
    if (!binaryStr || typeof binaryStr !== 'string') return;
    
    const workbook = XLSX.read(binaryStr, { type: 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]; 
  
    const newRows = data.map((row) => ({
      item: row[0] ? String(row[0]) : '', 
      quantities: row.slice(1, 13).map((val) => (val !== undefined ? String(val) : '')), 
    }));
    setRows(newRows.length > 0 ? newRows : initialRows);
  };
  reader.readAsBinaryString(file);
};




  // Obtener el mes y año actual para los encabezados
  const getMonthYearLabels = () => {
    const labels = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const monthYear = new Date(currentDate.getFullYear(), currentDate.getMonth() + i);
      labels.push(monthYear.toLocaleString('default', { month: 'short', year: 'numeric' }));
    }

    return labels;
  };

  const monthYearLabels = getMonthYearLabels();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-[1800px] overflow-x-auto">
        {/* Encabezado con botones y título */}
        <div className="flex items-center justify-between mb-6">
          {/* Botones izquierda */}
          <div className="flex gap-2 ml-20">
          <label
              htmlFor="fileInput"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              Massiv Data
            </label>
            
            <input
            id="upload-file"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleMassiveDataUpload}
              className="hidden"
            
            />
       

            <button
              onClick={handleExportToExcel}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Export
            </button>

            <button
              type="button"
              onClick={handleAddRow}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Columns
            </button>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-center">Add Requirements</h2>
        </div>

        {/* Formulario */}
        <form>
          <div className="flex mb-4 ml-28">
            <div className="w-24 text-center font-bold">Item</div>
            {monthYearLabels.map((label, index) => (
              <div key={index} className="w-[120px] text-center font-bold">
                {label}
              </div>
            ))}
          </div>

          {/* Filas de entrada */}
          <div className="space-y-2">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2 justify-center">
                <input
                  type="text"
                  value={row.item}
                  onChange={(e) => handleItemChange(rowIndex, e.target.value)}
                  className="border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32 text-center"
                />

                {row.quantities.map((quantity, colIndex) => (
                  <input
                    key={colIndex}
                    type="text"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(rowIndex, colIndex, e.target.value)}
                    className="border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-28 text-center appearance-none"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementForm;




