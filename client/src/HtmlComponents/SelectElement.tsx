import React from "react";

interface SelectElementInterface {
  name?: string;
  id?: string;
  value: any;
  setValue: (value: any) => void;
  options: any;
  defaultOption?: any
}

export const SelectElement: React.FC<SelectElementInterface> = ({
  name,
  id,
  value,
  setValue,
  options,
  defaultOption
}) => {
  return (
    <div className="mb-2">
      {name && 
        <label htmlFor={id} className={`block text-gray-700 font-bold w-fit`}>
          {name}
        </label>
      }
      <select
        className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none uppercase"
        id={id}
        value={value}
        onChange={(e) => {
          const index = e.target.selectedIndex;
          setValue(e.target.options[index].value);
        }}
      >
        {defaultOption}
        {options.map((option: any) => (
          <option value={option._id} key={option._id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};
