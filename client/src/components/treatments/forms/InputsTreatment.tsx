import React, { useContext } from "react";
import { DataTreatmentContext } from "../types";

const InputsTreatment = () => {
  let {
    treatment, setTreatment,
    price, setPrice,
    treatmentType,
    setTreatmentType
  } = useContext(DataTreatmentContext)
  
  const ArrayTypeCare: {}[] = [
    {val: "soins",   name: "Soins"},
    {val: "prothese", name: "Prothese"},
    {val: "gencive",  name: "Soins gencive"},
    {val: "pediatre", name: "Soins pediatre"},
    {val: "bouche",   name: "Soins de bouche"},
    {val: "conservative", name: "Soins conservateur"},
  ]

  return (
    <React.Fragment>
      <div className="mb-2">
        <label htmlFor="treatment" className="block text-gray-700 font-bold">
          Traitement
        </label>
        <input
          type="text"
          id="treatment"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder="Traitement"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="treatmentType" className="block text-gray-700 font-bold">
          Type
        </label>
        <select 
          id="treatmentType"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none uppercase"
          placeholder="Prix"
          value={treatmentType.type}
          onChange={(e) => {
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = e.target.options[selectedIndex];
            const name = selectedOption.getAttribute("data-name");
            setTreatmentType({type: e.target.value, name: name || ""})
          }}
        >
          {ArrayTypeCare.map((care: any) => (
            <option key={care.val} value={care.val} data-name={care.name} >{care.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="price" className="block text-gray-700 font-bold">
          Prix
        </label>
        <input
          type="number"
          id="price"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </React.Fragment>
  );
};

export default InputsTreatment;
