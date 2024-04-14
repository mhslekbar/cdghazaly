import React, { useContext } from "react";
import { DataTreatmentContext } from "../types";
import { InputElement } from "../../../../HtmlComponents/InputElement";
import { useTranslation } from "react-i18next";
import { ArrayTypeCare } from "../../../treatments/types";


const InputsTreatment = () => {
  let {
    treatment, setTreatment,
    price, setPrice,
    treatmentType, setTreatmentType
  } = useContext(DataTreatmentContext)

  const { t } = useTranslation()

  return (
    <React.Fragment>
      <InputElement type="text" name={t("Traitement")} id="treatment"  value={treatment} setValue={setTreatment} />
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
      <InputElement type="number" name={t("Prix")} id="price"  value={price} setValue={setPrice} />
    </React.Fragment>
  );
};

export default InputsTreatment;
