import React from 'react';

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const SelectFilter: React.FC<SelectFilterProps> = ({ value, onChange, options }) => {
  return (
    <select
      className="border border-gray-300 rounded p-2 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectFilter;
