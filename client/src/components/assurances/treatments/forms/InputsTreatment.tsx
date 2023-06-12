import React, { useContext } from "react";
import { DataTreatmentContext } from "../types";
import { InputElement } from "../../../../HtmlComponents/InputElement";

const InputsTreatment = () => {
  let {
    treatment, setTreatment,
    price, setPrice,
  } = useContext(DataTreatmentContext)
  
  return (
    <React.Fragment>
      <InputElement type="text" name="Traitement" id="treatment"  value={treatment} setValue={setTreatment} />
      <InputElement type="number" name="Prix" id="price"  value={price} setValue={setPrice} />
    </React.Fragment>
  );
};

export default InputsTreatment;
