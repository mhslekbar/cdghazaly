import React, {  useContext, useEffect, useState } from "react";
import { DataTreatLabContext } from "../types";
import Select from 'react-select'
import { TreatmentType } from "../../../treatments/types";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/store";

const InputsTreatLab = () => {
  const { treatment, setTreatment, price, setPrice } = useContext(DataTreatLabContext)
  const { treatments } = useSelector((state: State) => state.treatments)
  const [listTreat, setListTreat] = useState<any[]>(treatments)

  useEffect(() => {
    setListTreat(treatments.filter((data: TreatmentType) => data.type === "prothese").map((data: TreatmentType) => ({value: data._id, label: data.name})))
  }, [treatments])

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isSelected ? '#00b894' : "#FFF",
      borderBottom: "2px solid #DEE",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused && "none",
      outline: state.isFocused && "none",
    }),
  };
  return (
    <React.Fragment>
      <div className="mb-2">
        <label htmlFor="treatment" className="block text-gray-700 font-bold">
          Traitement
        </label>
        <Select styles={customStyles} value={treatment} onChange={(e: any) => setTreatment(e)} options={listTreat} />
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

export default InputsTreatLab;
