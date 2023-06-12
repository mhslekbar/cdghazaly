import React, { useContext } from "react";
import { DataAssuranceContext } from "../types";
import { InputElement } from "../../../HtmlComponents/InputElement";

const InputsAssurance: React.FC = () => {
  const {
    name,
    setName,
    cons_price,
    setConsPrice,
    color,
    setColor
  } = useContext(DataAssuranceContext);

  return (
    <div>
      <InputElement
        type="text"
        name="Nom"
        placeholder="Nom de la societe"
        id="Name"
        value={name}
        setValue={setName}
      />
      <InputElement
        type="number"
        name="consultation"
        id="price"
        value={cons_price}
        setValue={setConsPrice}
      />
      <InputElement
        type="color"
        name="couleur"
        id="color"
        value={color}
        setValue={setColor}
      />
    </div>
  );
};

export default InputsAssurance;
