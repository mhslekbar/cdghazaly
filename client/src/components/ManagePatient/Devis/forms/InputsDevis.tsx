import React, { useContext, useEffect, useState } from "react";
import { DataDevisContext, EnumTypeModal, EnumTypeTeethBoard, ShowDevisInterfaceContext } from "../types";
import { InputElement } from "../../../../HtmlComponents/InputElement";
import { get } from "../../../../requestMethods";
import { TreatmentType } from "../../../treatments/types";
import TeethBoard from "../controls/TeethBoard";
import { InputCheckbox } from "../../../../HtmlComponents/InputCheckbox";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/store";
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types";
import { useParams } from "react-router";

const InputsDevis: React.FC = () => {
  const { treat, setTreat, reduce, setReduce, setSelectedTeeth, setSelectedTreat, setSelectedSurface, setTypeTeethBoard, TypeModal } = useContext(DataDevisContext);
  const [treatArray, setTreatArray] = useState<TreatmentType[]>([])
  const [treatAssure, setTreatAssure] = useState(false)
  
  const { patientId } = useParams()

  const { showTeethBoard, setShowTeethBoard } = useContext(ShowDevisInterfaceContext)
  const { patients } = useSelector((state: State) => state.patients)
  const [selectedPatient, setSelectedPatient] = useState<PatientInterface>(DefaultPatientInterface)
  
  useEffect(() => {
    setSelectedPatient(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])
  
  const searchTreat = async (e: any) => {
    setTreat(e.target.value)
    let filtered
    if(treatAssure) {
      filtered = `assurance=${treatAssure}`
    } else {
      filtered = `treat=${e.target.value}`
    }
    if(e.target.value.length > 0) {
      const response = await get(`treatment/searchTreat?${filtered}`)
      setTreatArray(response.data.success)
    } else {
      setTreatArray([])
    }
  }

  return (
    <div className="relative">
      <TeethBoard modal={showTeethBoard} toggle={() => setShowTeethBoard(!showTeethBoard)}  />
      <div className="mb-2">
        <label 
          htmlFor="treatment"
          className="text-gray-700 block font-bold"
        >
          Traitemnt
        </label>
        <input 
          type="text" 
          className="w-full uppercase rounded border shadow px-4 py-2 focus:outline-none focus:shadow-outline"
          placeholder="Nom du traitement..."
          value={treat}
          onChange={searchTreat}  
        />
        {selectedPatient.assurance && 
          <InputCheckbox name="Choisir les traitments du cabinet" id="Choose From Cabinet" value={treatAssure} setValue={setTreatAssure}/>
        }
      </div>
      <div className="absolute w-full">
      {treatArray.length > 0 && 
        treatArray
        .slice(0, 5)
        .sort((a: TreatmentType, b: TreatmentType) =>  b.name.localeCompare(a.name))
        .map((treat: TreatmentType) => (
          <p 
            className="border rounded border-b-1 bg-white px-4 py-2 hover:bg-main"
            key={treat._id}
            onClick={() => {
              setShowTeethBoard(!showTeethBoard); 
              setSelectedTreat(treat)
              setSelectedTeeth([])
              setTreatArray([])
              setTreat("")
              setSelectedSurface("")
              if(TypeModal === EnumTypeModal.ADD_DEVIS_MODAL) {
                setTypeTeethBoard(EnumTypeTeethBoard.ADD_NEW_TEETH)
              } else if(TypeModal === EnumTypeModal.EDIT_DEVIS_MODAL) {
                setTypeTeethBoard(EnumTypeTeethBoard.APPEND_TEETH)
              } 
            }}
          >
            {treat.name}
          </p>)
        )}
      </div>
      <InputElement
        type="number"
        name="Reduction"
        id="reduce"
        placeholder="Donner la reduction en pourcent ..."
        value={reduce}
        setValue={setReduce}
      />
    </div>
  );
};

export default InputsDevis;
