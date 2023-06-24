import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import {
  DefaultFicheInterface,
  FicheInterface,
  ShowFichesContext,
} from "./types";

const SelectFiche: React.FC = () => {
  const { fiches } = useSelector((state: State) => state.fiches);
  const { selectedFiche, setSelectedFiche } = useContext(ShowFichesContext);

  useEffect(() => {
    const SFiche =
      fiches.find((fiche: FicheInterface) => fiche._id === selectedFiche?._id) ||
      DefaultFicheInterface;
    setSelectedFiche(SFiche.numFiche ? SFiche : fiches[0]);
    // eslint-disable-next-line
  }, [fiches, setSelectedFiche]);

  return (
    <div className="flex my-2">
      {fiches.map((fiche: FicheInterface) => (
        <button
          className={`${
            selectedFiche?._id === fiche._id ? "border-b-4 border-main" : ""
          } bg-white rounded shadow py-2 px-4 mr-2`}
          key={fiche._id}
          onClick={() => {
            setSelectedFiche(fiche)
          }}
        >
          Fiche-{fiche.numFiche}
        </button>
      ))}
    </div>
  );
};

export default SelectFiche;
