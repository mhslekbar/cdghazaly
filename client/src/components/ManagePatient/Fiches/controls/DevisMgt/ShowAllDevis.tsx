import React, { useContext, useEffect, useState } from "react";
import { DefaultUserInterface, UserInterface } from "../../../../users/types";
import {
  DefaultTreatmentType,
  TreatmentType,
} from "../../../../treatments/types";
import {
  DataDevisContext,
  DefaultLineDevisType,
  EnumTypeModal,
  EnumTypeTeethBoard,
  LineDevisType,
  ShowDevisInterfaceContext,
} from "../../../Devis/types";
import { useSelector } from "react-redux";
import { State } from "../../../../../redux/store";
import { hideMsg } from "../../../../../functions/functions";

import DevisData from "./DevisData";
import TeethBoard from "../../../Devis/controls/TeethBoard";
import { ShowFichesContext } from "../../types";

interface ShowAllDevisInterface {
  modal: boolean;
  toggle: () => void;
}

const ShowAllDevis: React.FC<ShowAllDevisInterface> = ({ modal, toggle }) => {
  const [ArrayDoctor, setArrayDoctor] = useState<UserInterface[]>([
    DefaultUserInterface,
  ]);
  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface);
  const [price, setPrice] = useState(0);
  const [treat, setTreat] = useState("");
  const [reduce, setReduce] = useState("");
  const [selectedTreat, setSelectedTreat] =
    useState<TreatmentType>(DefaultTreatmentType);
  const [LineDevis, setLineDevis] = useState<LineDevisType[]>([]);

  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([]);
  const [selectedSurface, setSelectedSurface] = useState<string>("");
  const [TeethBoardData, setTeethBoardData] =
    useState<LineDevisType>(DefaultLineDevisType);
    
  const [TypeTeethBoard, setTypeTeethBoard] = useState("");
  const [TypeModal, setTypeModal] = useState<EnumTypeModal>(
    EnumTypeModal.APPEND_FICHE_MODAL
  );

  useEffect(() => {
    setTypeTeethBoard(EnumTypeTeethBoard.APPEND_TEETH_FICHE)
  }, [])

  const { users } = useSelector((state: State) => state.users);
  const { setShowTeethBoard, showTeethBoard } = useContext(
    ShowDevisInterfaceContext
  );
  const { selectedLineDevis } = useContext(ShowFichesContext);

  useEffect(() => {
    setArrayDoctor(users.filter((user: UserInterface) => user.doctor?.cabinet));
  }, [users]);

  const [errors, setErrors] = useState<string[]>([]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <DataDevisContext.Provider
      value={{
        doctor, setDoctor,
        treat, setTreat,
        reduce, setReduce,
        selectedTeeth, setSelectedTeeth,
        selectedTreat, setSelectedTreat,
        price, setPrice,
        LineDevis, setLineDevis,
        selectedSurface, setSelectedSurface,
        ArrayDoctor, setArrayDoctor,
        TeethBoardData, setTeethBoardData,
        TypeTeethBoard, setTypeTeethBoard,
        TypeModal, setTypeModal,
      }}
    >
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div
                className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"
                style={{
                  minWidth: "1000px",
                }}
              >
                <div className="mt-3">
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSubmit}
                  >
                    {errors.length > 0 &&
                      errors.map((err, index) => (
                        <p
                          className="p-3 my-2 rounded bg-red text-white msg"
                          key={index}
                          onClick={(e) => hideMsg(e, errors, setErrors)}
                        >
                          {err}
                        </p>
                      ))}
                    {showTeethBoard && selectedLineDevis && (
                      <TeethBoard
                        modal={showTeethBoard}
                        toggle={() => setShowTeethBoard(!showTeethBoard)}
                      />
                    )}
                    <DevisData />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataDevisContext.Provider>
  );
};

export default ShowAllDevis;
