import React, { createContext, useEffect, useState } from "react";
import AddTreatment from "./AddTreatment";
import TreatmentTable from "./TreatmentTable";
import { useDispatch } from "react-redux";import { DefaultTreatmentType, TreatmentType } from "./types";
import EditTreatment from "./EditTreatment";
import DeleteTreatment from "./DeleteTreatment";
import { ShowTreatmentApi } from "../../../redux/treatments/treatmentApiCalls";
import SuccessMsg from "../../../Messages/SuccessMsg";
import { ShowAssuranceApi } from "../../../redux/assurances/assuranceApiCalls";

interface ShowTreatmentInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showEditTreat: boolean,
  setShowEditTreat: (showEditTreat: boolean) => void,
  showDeleteTreat: boolean,
  setShowDeleteTreat: (showDeleteTreat: boolean) => void,
  selectedTreat: TreatmentType,
  setSelectedTreat: (selectedTreat: TreatmentType) => void
}

const DefaultShowTreatmentInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  showEditTreat: false,
  setShowEditTreat: () => {},
  showDeleteTreat: false,
  setShowDeleteTreat: () => {},
  selectedTreat: DefaultTreatmentType,
  setSelectedTreat: () => {}
};

export const ShowTreatmentContext = createContext<ShowTreatmentInterface>(
  DefaultShowTreatmentInterface
);

const ShowTreatments: React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const [showEditTreat, setShowEditTreat] = useState(false);
  const [showDeleteTreat, setShowDeleteTreat] = useState(false);
  const [selectedTreat, setSelectedTreat] = useState<TreatmentType>(DefaultTreatmentType);
  
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchTreatment = async () => {
      await dispatch(ShowTreatmentApi());
    };
    fetchTreatment();
  }, [dispatch]);

  useEffect(() => {
    const fetchAss = async () => {
      await dispatch(ShowAssuranceApi());
    };
    fetchAss();
  }, [dispatch]);


  return (
    <ShowTreatmentContext.Provider
      value={{
        showSuccessMsg,
        setShowSuccessMsg,
        showEditTreat,
        setShowEditTreat,
        showDeleteTreat,
        setShowDeleteTreat,
        selectedTreat, 
        setSelectedTreat
      }}
    >
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)}/>}
      <AddTreatment />
      <TreatmentTable />
      {showEditTreat && selectedTreat && <EditTreatment treatmentData={selectedTreat} modal={showEditTreat} toggle={() =>  setShowEditTreat(!showEditTreat)}/>}
      {showDeleteTreat && selectedTreat && <DeleteTreatment treatmentData={selectedTreat} modal={showDeleteTreat} toggle={() =>  setShowDeleteTreat(!showDeleteTreat)}/>}
    </ShowTreatmentContext.Provider>
  );
};

export default ShowTreatments;
