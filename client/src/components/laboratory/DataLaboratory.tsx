import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { laboratoryInterface } from "./types";
import { ShowLaboratoryContext } from "./ShowLaboratory";
import { Link } from "react-router-dom";

const DataLaboratory: React.FC = () => {
  const { laboratory } = useSelector((state: State) => state.laboratory);
  const { 
    setShowEditModal,
    setShowDeleteModal,
    selectedLaboratory,
    setSelectedLaboratory,
    setSelectedActionLab
  } = useContext(ShowLaboratoryContext)

  const toggleEditUser = (lab: laboratoryInterface) => {
    setShowEditModal(true)
    setSelectedLaboratory(lab)
  };
  const toggleDeleteUser = (lab: laboratoryInterface) => {
    setShowDeleteModal(true)
    setSelectedLaboratory(lab)
  };

  const handleSelectedLab = (labo: laboratoryInterface) => {
    setSelectedActionLab("")
    setSelectedLaboratory(labo)
  }

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2 mt-2">
      {laboratory.map((labo: laboratoryInterface, index) => (
        // /accounts
        <section className={`${labo.name === selectedLaboratory.name ? "btn-main" : ""} shadow rounded border bg-white px-6 py-4 hover:bg-main hover:text-white`} key={index}>
          <Link to={`/laboratory/${labo._id}`} onClick={() => handleSelectedLab(labo)}>
            <p className="grid grid-cols-2">
              <span>Nom:</span><b>{labo.name}</b>
            </p>
            <p className="grid sm:grid-cols-2 lg:grid-cols-2">
              <span>Telephone:</span><b>{labo.phone}</b>
            </p>
          </Link>
          <div className="flex justify-center gap-2 mt-2">
              <FaEdit
                className="text-blue"
                style={{
                  fontSize: "22px",
                }}
                onClick={() => toggleEditUser(labo)}
              />
              <MdRemoveCircle
                className="text-red"
                style={{
                  fontSize: "22px",
                }}
                onClick={() => toggleDeleteUser(labo)}
              />
          </div>
        </section>
      ))}
    </div>
  );
};

export default DataLaboratory;
