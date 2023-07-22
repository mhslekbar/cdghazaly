import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowAssuranceApi } from "../../redux/assurances/assuranceApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { AssuranceInterface, ShowAssurancesContext } from "./types";
import { useNavigate, useParams } from "react-router";

const DataAssurances: React.FC = () => {
  const { assurances } = useSelector((state: State) => state.assurances);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchAss = async () => {
      await dispatch(ShowAssuranceApi());
    };
    fetchAss();
  }, [dispatch]);

  const {  
    showEditModal, 
    setShowEditModal,
    showDeleteModal, 
    setShowDeleteModal,
    setSelectedAssurance,
    setHideDataAssurance
  } = useContext(ShowAssurancesContext)

  const toggleEditAssurance = (assurance: AssuranceInterface) => { 
    setShowEditModal(!showEditModal)
    setSelectedAssurance(assurance)
  };

  const toggleDeleteAssurance = (assurance: AssuranceInterface) => {
    setShowDeleteModal(!showDeleteModal)
    setSelectedAssurance(assurance)
  };

  const navigte = useNavigate()
  const { AssId } = useParams()

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2 mt-4">
      {assurances.map((assurance: AssuranceInterface, index) => (
        <div className={`${assurance._id === AssId  ? "bg-main" : "" } bg-white px-6 py-4 rounded border shadow hover:bg-main`} 
        // style={{ backgroundColor: assurance.color }} 
          onClick={() => {
            setHideDataAssurance(true)
            setSelectedAssurance(assurance)
            navigte(`/assurance/${assurance._id}`)
          }}
          key={index}>
          <span className="flex justify-between block">
            Societé : <b>{assurance.name}</b>
          </span>
          <span className="flex justify-between block">
            Consultation : <b>{assurance.cons_price}</b>
          </span>
          <div className="flex justify-center">
            <FaEdit
              className="text-blue"
              style={{
                fontSize: "22px",
              }}
              onClick={() => toggleEditAssurance(assurance)}
            />
            <MdRemoveCircle
              className="text-red"
              style={{
                fontSize: "22px",
              }}
              onClick={() => toggleDeleteAssurance(assurance)}
            />
          </div>
        </div>

      ))}
    </div>
  );
};

export default DataAssurances;
