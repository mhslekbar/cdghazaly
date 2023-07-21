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
import { FaPrint, FaSave } from "react-icons/fa";
import { EditFicheApi } from "../../../redux/fiches/ficheApiCalls";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Timeout } from "../../../functions/functions";
import AppointmentModal from "./controls/AppointmentModal";


const ShowFiches: React.FC = () => {
  const [selectedFiche, setSelectedFiche] = useState<FicheInterface>(
    DefaultFicheInterface
  );
  const [showDeleteFiche, setShowDeleteFiche] = useState(false);
  const [selectedDevis, setSelectedDevis] = useState<DevisInterface>(
    DefaultDevisInterface
  );
  const [showTeethBoard, setShowTeethBoard] = useState(false);
  const [showEditDevis, setShowEditDevis] = useState(false);
  const [showDeleteDevis, setShowDeleteDevis] = useState(false);
  
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [selectedLineDevis, setSelectedLineDevis] = useState<LineDevisType>(DefaultLineDevisType)
  const [selectedLineFiche, setSelectedLineFiche] = useState<LineFicheInterface>(DefaultLineFicheInterface)
  const [isShowingAllDevis, setIsShowingAllDevis] = useState(false);

  const [showDeleteLineFiche, setShowDeleteLineFiche] = useState(false)
  

  const dispatch: any = useDispatch()
  const { patientId } = useParams()

  const saveFiche = async () => {
    const Dates: string[] = []
    const LineFicheId:string[] = []
    const Actes:string[] = []
    const Amounts:string[] = []

    document.querySelectorAll(".data-line-fiche table input.lineFicheId").forEach((element: any) => {
      LineFicheId.push(element.value)
    })
    document.querySelectorAll(".data-line-fiche table input.date").forEach((element: any) => {
      Dates.push(element.value)
    })
    document.querySelectorAll(".data-line-fiche table input.acte").forEach((element: any) => {
      Actes.push(element.value)
    })
    document.querySelectorAll(".data-line-fiche table input.amount").forEach((element: any) => {
      Amounts.push(element.value)
    })
    const LineFicheData = {
      _id: LineFicheId,
      dateAppointment: Dates,
      acte: Actes,
      amount: Amounts
    }
    console.log("LineFicheData: ", LineFicheData)
    const response = await dispatch(EditFicheApi(patientId, selectedFiche._id, { LineFiche: LineFicheData }))
    if(response === true) {
      setShowSuccessMsg(true)
      setTimeout(() => setShowSuccessMsg(false), Timeout)
    }
  }

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
        isShowingAllDevis,
        setIsShowingAllDevis
      }}
    >
      <ShowFichesContext.Provider
        value={{
          selectedFiche, setSelectedFiche,
          showSuccessMsg, setShowSuccessMsg,
          selectedLineDevis, setSelectedLineDevis,
          selectedLineFiche, setSelectedLineFiche,
          showDeleteLineFiche, setShowDeleteLineFiche,
          showAppointmentModal, setShowAppointmentModal
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
                onClick={saveFiche}
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
                className="p-2 rounded bg-blue"
                onClick={() => window.print()}
              >
                <FaPrint />
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
        {showAppointmentModal && selectedLineFiche && 
          <AppointmentModal modal={showAppointmentModal} toggle={() => setShowAppointmentModal(!showAppointmentModal)}/>
        }
      </ShowFichesContext.Provider>
    </ShowDevisInterfaceContext.Provider>
  );
};

export default ShowFiches;
