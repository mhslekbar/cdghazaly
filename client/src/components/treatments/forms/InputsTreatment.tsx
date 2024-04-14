import React, { useContext } from "react";
import { ArrayTypeCare, DataTreatmentContext } from "../types";
import { useTranslation } from "react-i18next";

const InputsTreatment = () => {
  let {
    treatment, setTreatment,
    price, setPrice,
    treatmentType,
    setTreatmentType
  } = useContext(DataTreatmentContext)
    
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <div className="mb-2">
        <label htmlFor="treatment" className="block text-gray-700 font-bold">
          {t("Traitement")}
        </label>
        <input
          type="text"
          id="treatment"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder={t("Traitement")}
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="treatmentType" className="block text-gray-700 font-bold">
          {t("Type")}
        </label>
        <select 
          id="treatmentType"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none uppercase"
          value={treatmentType.type}
          onChange={(e) => {
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = e.target.options[selectedIndex];
            const name = selectedOption.getAttribute("data-name");
            setTreatmentType({type: e.target.value, name: name || ""})
          }}
        >
          {ArrayTypeCare.map((care: any) => (
            <option key={care.type} value={care.type} data-name={care.name} >{t(care.name)}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="price" className="block text-gray-700 font-bold">
          {t("Prix")}
        </label>
        <input
          type="number"
          id="price"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder={t("Prix")}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </React.Fragment>
  );
};

export default InputsTreatment;
