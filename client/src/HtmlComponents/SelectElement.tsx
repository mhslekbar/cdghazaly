import React, { useContext } from "react";
import { DataDevisContext } from "../components/ManagePatient/Devis/types";

interface SelectElementInterface {
  name?: string;
  id?: string;
  value: any;
  setValue: (value: any) => void;
  options: any;
  defaultOption?: any,
  valueType?: string, // is important to specify which type of value do you need string | object
  showPrice?: boolean, // show price of Treatment lab 
  divClass?: string,
}

export const SelectElement: React.FC<SelectElementInterface> = ({
  name,
  id,
  value,
  setValue,
  options,
  defaultOption,
  valueType = "string",
  showPrice = false,
  divClass = ""
}) => {
  const { selectedTreat } = useContext(DataDevisContext)
  return (
    <div className={`mb-2 ${divClass}`}>
      {name && 
        <label htmlFor={id} className={`block text-gray-700 font-bold w-fit`}>
          {name}
        </label>
      }
      <select
        className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
        id={id}
        // value={value._id}
        value={valueType === "object" ? value._id : value}
        onChange={(e) => {
          const index = e.target.selectedIndex;
          valueType === "object" ? 
            setValue(JSON.parse(e.target.options[index].getAttribute("data-element") || ""))
          :
            setValue(e.target.options[index].value)
        }}
      >
        {defaultOption}
        {options.map((option: any) => {
          return <option value={option._id} data-element={JSON.stringify(option)} key={option._id}>{option.name} {showPrice && " - " + option.treatments?.find((treat: any) => treat.treatment._id === selectedTreat?._id)?.price}</option>
        })}
      </select>
    </div>
  );
};
