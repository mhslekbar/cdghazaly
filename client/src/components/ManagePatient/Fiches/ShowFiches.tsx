import React, { useState } from "react";
import {
  DefaultFicheInterface,
  DefaultLineFicheInterface,
  FicheInterface,
  LineFicheInterface,
  ShowFichesContext,
} from "./types";
import SelectFiche from "./SelectFiche";
import DataFiches from "./DataFiches";
import CreateFiche from "./controls/CreateFiche";
import DeleteFiche from "./controls/DeleteFiche";
import { MdRemoveCircleOutline } from "react-icons/md";
import SuccessMsg from "../../../Messages/SuccessMsg";
import {
  DefaultDevisInterface,
  DefaultLineDevisType,
  DevisInterface,
  LineDevisType,
  ShowDevisInterfaceContext,
} from "../Devis/types";
import { FaEdit, FaSave } from "react-icons/fa";
import EditFiche from "./controls/EditFiche";


const ShowFiches: React.FC = () => {
  const [selectedFiche, setSelectedFiche] = useState<FicheInterface>(
    DefaultFicheInterface
  );
  const [showDeleteFiche, setShowDeleteFiche] = useState(false);
  const [showEditFiche, setShowEditFiche] = useState(false);
  const [selectedDevis, setSelectedDevis] = useState<DevisInterface>(
    DefaultDevisInterface
  );
  const [showTeethBoard, setShowTeethBoard] = useState(false);
  const [showEditDevis, setShowEditDevis] = useState(false);
  const [showDeleteDevis, setShowDeleteDevis] = useState(false);
  
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [selectedLineDevis, setSelectedLineDevis] = useState<LineDevisType>(DefaultLineDevisType)
  const [selectedLineFiche, setSelectedLineFiche] = useState<LineFicheInterface>(DefaultLineFicheInterface)
  
  
  return (
    <ShowDevisInterfaceContext.Provider
      value={{
        selectedDevis,
        setSelectedDevis,
        showTeethBoard,
        setShowTeethBoard,
        showEditDevis,
        setShowEditDevis,
        showDeleteDevis,
        setShowDeleteDevis,
        showSuccessMsg,
        setShowSuccessMsg,
      }}
    >
      <ShowFichesContext.Provider
        value={{
          selectedFiche, setSelectedFiche,
          showSuccessMsg, setShowSuccessMsg,
          selectedLineDevis, setSelectedLineDevis,
          selectedLineFiche, setSelectedLineFiche,
          showEditFiche, setShowEditFiche
        }}
      >
        {showSuccessMsg && (
          <SuccessMsg
            modal={showSuccessMsg}
            toggle={() => setShowSuccessMsg(!showSuccessMsg)}
          />
        )}
        <div className="flex justify-between mt-2">
          <CreateFiche />
          {selectedFiche && (
            <div className="flex flex-end gap-2">
              <button
                className="p-2 rounded bg-yellow text-white"
                // onClick={() => setShowDeleteFiche(!showDeleteFiche)}
              >
                <FaSave />
              </button>
              <button
                className="p-2 rounded bg-red text-white"
                onClick={() => setShowDeleteFiche(!showDeleteFiche)}
              >
                <MdRemoveCircleOutline />
              </button>
              <button
                className="p-2 rounded bg-blue text-white"
                onClick={() => setShowEditFiche(!showEditFiche)}
              >
                <FaEdit />
              </button>
            </div>
          )}
        </div>
        <SelectFiche />
        <DataFiches />
        {showDeleteFiche && selectedFiche && (
          <DeleteFiche
            FicheData={selectedFiche}
            modal={showDeleteFiche}
            toggle={() => setShowDeleteFiche(!showDeleteFiche)}
          />
        )}
        {showEditFiche && selectedFiche && (
          <EditFiche
            FicheData={selectedFiche}
            modal={showEditFiche}
            toggle={() => setShowEditFiche(!showEditFiche)}
          />
        )}

      </ShowFichesContext.Provider>
    </ShowDevisInterfaceContext.Provider>
  );
};

export default ShowFiches;
