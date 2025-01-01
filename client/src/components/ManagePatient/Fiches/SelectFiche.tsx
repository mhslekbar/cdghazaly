import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import {
  DefaultFicheInterface,
  FicheInterface,
  ShowFichesContext,
} from "./types";
import { useTranslation } from "react-i18next";

const SelectFiche: React.FC = () => {
  const { fiches } = useSelector((state: State) => state.fiches);
  const { selectedFiche, setSelectedFiche } = useContext(ShowFichesContext);

  useEffect(() => {
    const SFiche =
      fiches.find((fiche: FicheInterface) => fiche?._id === selectedFiche?._id) ||
      DefaultFicheInterface;
    setSelectedFiche(SFiche.numFiche ? SFiche : fiches[0]);
    // eslint-disable-next-line
  }, [fiches, setSelectedFiche]);
  
  const { t } = useTranslation()

  return (
    <div className="flex my-2">
      {fiches.map((fiche: FicheInterface) => (
        <button
          className={`${
            selectedFiche?._id === fiche?._id ? "border-b-4 border-main" : ""
          } bg-white rounded shadow py-2 px-4 mr-2`}
          key={fiche?._id}
          onClick={() => {
            setSelectedFiche(fiche)
          }}
        >
          {t("Fiche")  + "-" + fiche.numFiche}
        </button>
      ))}
    </div>
  );
};

export default SelectFiche;
