import React, { useContext } from "react";
import { DataLaboratoryContext } from "../types";

const InputsLaboratory: React.FC = () => {
  const { name, setName, phone, setPhone } = useContext(DataLaboratoryContext);
  return (
    <React.Fragment>
      <div className="mb-2">
        <label htmlFor="Nom" className="block text-gray-700 font-bold">
          Nom
        </label>
        <input
          type="text"
          id="Nom"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="Phone" className="block text-gray-700 font-bold">
          Phone
        </label>
        <input
          type="text"
          id="Phone"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </React.Fragment>
  );
};

export default InputsLaboratory;
