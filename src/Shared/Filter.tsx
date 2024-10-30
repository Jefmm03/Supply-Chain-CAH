import { useState, useEffect } from "react"; 

interface FilterProps {
  columnData: string[]; // Los datos únicos de la columna para mostrar como opciones
  onFilterChange: (selectedItems: string[]) => void; // Función para devolver los datos seleccionados
}

const Filter: React.FC<FilterProps> = ({ columnData, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Filtro de las opciones basado en la búsqueda
  const filteredItems = columnData.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejo de seleccionar o deseleccionar todos
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]); // Deselecciona todo si ya están todos seleccionados
    } else {
      setSelectedItems(filteredItems); // Selecciona todas las opciones filtradas
    }
  };

  // Manejo de seleccionar o deseleccionar un ítem individual
  const handleSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Actualizamos el estado externo cuando cambia la selección
  useEffect(() => {
    onFilterChange(selectedItems); // Devolvemos la lista de items seleccionados al componente padre
  }, [selectedItems, onFilterChange]);

  return (
    <div className="w-64 bg-white p-2 border rounded shadow">
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded mb-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="max-h-64 overflow-y-auto">
        {/* Opción de seleccionar/deseleccionar todo */}
        <div className="flex items-center mb-1">
          <input
            type="checkbox"
            checked={selectedItems.length === filteredItems.length}
            onChange={handleSelectAll}
            className="mr-2"
          />
          <span>(Select All)</span>
        </div>

        {/* Lista de opciones filtradas */}
        {filteredItems.map((item) => (
          <div key={item} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleSelect(item)}
              className="mr-2"
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;

