import React, { useContext } from "react";
import { DataAssuranceContext } from "../types";
import { InputElement } from "../../../HtmlComponents/InputElement";
import { useTranslation } from "react-i18next";

const InputsAssurance: React.FC = () => {
  const {
    name,
    setName,
    cons_price,
    setConsPrice,
    color,
    setColor
  } = useContext(DataAssuranceContext);
  const { t } = useTranslation()

  return (
    <div>
      <InputElement
        type="text"
        name={t("Nom")}
        placeholder="Nom de la societe"
        id="Name"
        value={name}
        setValue={setName}
      />
      <InputElement
        type="number"
        name={t("Consultation")}
        id="price"
        value={cons_price}
        setValue={setConsPrice}
      />
      <InputElement
        type="color"
        name={t("Couleur")}
        id="color"
        value={color}
        setValue={setColor}
      />
    </div>
  );
};

export default InputsAssurance;
