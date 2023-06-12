import React, { createContext, useEffect, useState } from "react";
import AddTreatment from "./AddTreatment";
import TreatmentTable from "./TreatmentTable";
import { useDispatch } from "react-redux";
import { ShowTreatmentApi } from "../../redux/treatments/treatmentApiCalls";
import CareTypes from "./CareTypes";
import { DefaultTreatmentType, TreatmentType, careTypeInterface, defaultcareTypeInterface } from "./types";
import EditTreatment from "./EditTreatment";
import DeleteTreatment from "./DeleteTreatment";
import SuccessMsg from "../../Messages/SuccessMsg";

interface ShowTreatmentInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  selectedType: careTypeInterface,
  setSelectedType: (selectedType: careTypeInterface) => void,
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
  selectedType: defaultcareTypeInterface,
  setSelectedType: () => {},
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
  const [selectedType, setSelectedType] = useState<careTypeInterface>(
    defaultcareTypeInterface
  );
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

  return (
    <ShowTreatmentContext.Provider
      value={{
        showSuccessMsg,
        setShowSuccessMsg,
        selectedType,
        setSelectedType,
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
      <CareTypes />
      <TreatmentTable />
      {showEditTreat && selectedTreat && <EditTreatment treatmentData={selectedTreat} modal={showEditTreat} toggle={() =>  setShowEditTreat(!showEditTreat)}/>}
      {showDeleteTreat && selectedTreat && <DeleteTreatment treatmentData={selectedTreat} modal={showDeleteTreat} toggle={() =>  setShowDeleteTreat(!showDeleteTreat)}/>}
    </ShowTreatmentContext.Provider>
  );
};

export default ShowTreatments;
