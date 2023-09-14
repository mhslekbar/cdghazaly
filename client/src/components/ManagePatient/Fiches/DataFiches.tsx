import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShowFicheApi } from "../../../redux/fiches/ficheApiCalls";
import { useDispatch } from "react-redux";
import { LineFicheInterface, ShowFichesContext } from "./types";
import ShowAllDevis from "./controls/DevisMgt/ShowAllDevis";
import DataLineFiche from "./DataLineFiche";
import { DataDevisContext, DefaultLineDevisType, EnumTypeModal, LineDevisType, ShowDevisInterfaceContext } from "../Devis/types";
import DeleteLineFiche from "./controls/DeleteLineFiche";
import { DefaultUserInterface, UserInterface } from "../../users/types";
import { DefaultTreatmentType, TreatmentType } from "../../treatments/types";

const DataFiches: React.FC = () => {

  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface);
  const [ArrayDoctor, setArrayDoctor] = useState<UserInterface[]>([
    DefaultUserInterface,
  ]);
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


  const { patientId } = useParams();
  const { selectedFiche, selectedLineFiche, showDeleteLineFiche, setShowDeleteLineFiche } = useContext(ShowFichesContext);
  const { isShowingAllDevis, setIsShowingAllDevis } = useContext(ShowDevisInterfaceContext);

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchFiches = async () => {
      await dispatch(ShowFicheApi(patientId));
    };
    fetchFiches();
  }, [dispatch, patientId]);

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
      <ShowAllDevis
        modal={isShowingAllDevis}
        toggle={() => setIsShowingAllDevis(!isShowingAllDevis)}
      />

      {selectedLineFiche && selectedLineFiche &&
        <DeleteLineFiche LineFicheData={selectedLineFiche} modal={showDeleteLineFiche} toggle={() => setShowDeleteLineFiche(!showDeleteLineFiche)} />
      }
      {selectedFiche && 
        <div className={`flex flex-col border border-[#95a5a6] shadow-lg ${selectedFiche ? "data-line-fiche" : ""}`}>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8 invoice">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b border-[#95a5a6] font-medium bg-white text-center">
                    <tr>
                      <th className="px-6 py-4 border-r border-[#95a5a6]">
                        Date
                      </th>
                      <th className="px-6 py-4 border-r border-[#95a5a6]">
                        Actes
                      </th>
                      <th className="px-6 py-4 border-r border-[#95a5a6]">
                        Montant
                      </th>
                      <th className="px-6 py-4 print:hidden">Facture</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche?.LineFiche
                    ?.slice()
                    ?.sort((a:LineFicheInterface, b: LineFicheInterface) => new Date(a.dateAppointment || "").getTime() - new Date(b.dateAppointment || "").getTime())
                    ?.map(
                      (Line: LineFicheInterface, index: number) => 
                      <React.Fragment key={index}>
                        <DataLineFiche myIndex={index} Line={Line} modal={isShowingAllDevis} toggle={() => setIsShowingAllDevis(!isShowingAllDevis) } />
                      </React.Fragment>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </DataDevisContext.Provider>
  );
};

export default DataFiches;
