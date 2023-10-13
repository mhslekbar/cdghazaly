import React, { useContext } from "react";
import { DataTreatmentContext } from "../types";
import { InputElement } from "../../../../HtmlComponents/InputElement";
import { useTranslation } from "react-i18next";

const InputsTreatment = () => {
  let {
    treatment, setTreatment,
    price, setPrice,
  } = useContext(DataTreatmentContext)
  
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <InputElement type="text" name={t("Traitement")} id="treatment"  value={treatment} setValue={setTreatment} />
      <InputElement type="number" name={t("Prix")} id="price"  value={price} setValue={setPrice} />
    </React.Fragment>
  );
};

export default InputsTreatment;
