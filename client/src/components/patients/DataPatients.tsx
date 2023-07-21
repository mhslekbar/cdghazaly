import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowPatientsApi } from "../../redux/patients/patientApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { RegNo } from "../../functions/functions";
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaEdit } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router";
import { PatientInterface, ShowPatientsContext } from "./types";
import { MdRemoveCircle } from "react-icons/md";
import { switchPathPatient, switchTypePatient } from "./functions";
import { PatientInfo } from "./PatientInfo";
import { PatientTypePath } from "../sidebar/types";
import { UserInterface } from "../users/types";

const DataPatients: React.FC = () => {
  const { ptType, doctorId } = useParams();
  const { patients }: { patients: PatientInterface[] } = useSelector(
    (state: State) => state.patients
  );
  const {
    selectedFilter,
    setSelectedPatient,
    showEditPatient,
    setShowEditPatient,
    showDeletePatient,
    setShowDeletePatient,
    showPassPatient,
    setShowPassPatient,
    showFinishPatient,
    setShowFinishPatient,
    showReturnPatient,
    setShowReturnPatient,
    filterPatient
  } = useContext(ShowPatientsContext);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchPatient = async () => {
      await dispatch(ShowPatientsApi());
    };
    fetchPatient();
  }, [dispatch]);

  const handleShowEditPatient = (patient: PatientInterface) => {
    setSelectedPatient(patient);
    setShowEditPatient(!showEditPatient);
  };

  const handleShowDeletePatient = (patient: PatientInterface) => {
    setSelectedPatient(patient);
    setShowDeletePatient(!showDeletePatient);
  };

  const handleShowPassPatient = (patient: PatientInterface) => {
    setSelectedPatient(patient);
    setShowPassPatient(!showPassPatient);
  };

  const handleShowFinishPatient = (patient: PatientInterface) => {
    setSelectedPatient(patient);
    setShowFinishPatient(!showFinishPatient);
  };

  const handleShowReturnPatient = (patient: PatientInterface) => {
    setSelectedPatient(patient);
    setShowReturnPatient(!showReturnPatient);
  };

  const navigate = useNavigate()
  const location = useLocation() 
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {patients.length > 0 &&
        patients
          .filter((patient: PatientInterface) => {
            const regNo = patient.RegNo?.toString().toLowerCase() ?? "";
            const name = patient.name.toLowerCase() ?? "";
            const phone = patient.contact.phone.toString() ?? "";
            const whatsApp = patient.contact.whatsApp.toString() ?? "";
            switch(filterPatient.type) {
              case "RegNo":
                return regNo.startsWith(filterPatient.value.toLowerCase())
              case "name":
                return name.includes(filterPatient.value.toLowerCase())
              case "phone":
                return phone.startsWith(filterPatient.value.toLowerCase()) || whatsApp.startsWith(filterPatient.value.toLowerCase())
              default:
                return patient
            }
          })
          .filter(
            (patient: PatientInterface) =>
              patient.doctor.find((dc: UserInterface) => dc._id === doctorId) &&
              switchPathPatient(ptType, patient) &&
              switchTypePatient(selectedFilter, patient)
          )
          .map((patient: PatientInterface) => (
            <section
              className="bg-white border rounded-lg shadow px-4 py-2 hover:bg-main Data-Patient"
              key={patient._id}
            >
              <div 
                onClick={() => {
                  localStorage.setItem("patientMgtPrevLink", location.pathname)
                  navigate(`/patient/${doctorId}/${patient._id}/Manage/devis`)
                }}
              >
              {patient.RegNo && (
                <PatientInfo
                  icon={<BsFillPersonFill />}
                  title="DOSS.NO"
                  value={RegNo(patient.RegNo).toString()}
                />
              )}
              <PatientInfo
                icon={<BsFillPersonFill />}
                title="Nom"
                value={patient.name}
              />
              <PatientInfo
                icon={<BsFillTelephoneFill />}
                title="Telephone"
                value={patient?.contact?.phone}
              />
              {patient?.contact?.whatsApp &&
                patient?.contact?.whatsApp !== "+222" && (
                  <PatientInfo
                    icon={<RiWhatsappFill />}
                    title="WhatsApp"
                    value={patient?.contact?.whatsApp}
                  />
                )}
              {ptType !== PatientTypePath.CONSULTATION && (
                <PatientInfo
                  icon={<FaRegMoneyBillAlt />}
                  title="Balance"
                  className={`${patient.balance < 0 ? "text-red" : ""}`}
                  value={patient.balance.toString()}
                />
              )}
              </div>
              <div className="flex justify-center">
                <FaEdit
                  className="text-blue"
                  style={{
                    fontSize: "22px",
                  }}
                  onClick={() => handleShowEditPatient(patient)}
                />
                {ptType === PatientTypePath.CONSULTATION && (
                  <>
                    <MdRemoveCircle
                      className="text-red"
                      style={{
                        fontSize: "22px",
                      }}
                      onClick={() => handleShowDeletePatient(patient)}
                    />
                    <FaArrowAltCircleRight
                      className="text-yellow"
                      style={{
                        fontSize: "22px",
                      }}
                      onClick={() => handleShowPassPatient(patient)}
                    />
                  </>
                )}
                {ptType === PatientTypePath.CURRENT && (
                  <AiFillCheckCircle
                    className="text-main"
                    style={{
                      fontSize: "22px",
                    }}
                    onClick={() => handleShowFinishPatient(patient)}
                  />
                )}
                {ptType === PatientTypePath.FINISH && (
                  <FaArrowAltCircleLeft
                    className="text-main"
                    style={{
                      fontSize: "22px",
                    }}
                    onClick={() => handleShowReturnPatient(patient)}
                  />
                )}
              </div>
            </section>
          ))}
    </div>
  );
};

export default DataPatients;
