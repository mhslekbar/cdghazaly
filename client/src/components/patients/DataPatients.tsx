import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowPatientsApi } from "../../redux/patients/patientApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { RegNo, formatDate } from "../../functions/functions";
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaBirthdayCake, FaEdit } from "react-icons/fa";
import { BiHealth } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi"
import { useParams } from "react-router";
import { PatientInterface, ShowPatientsContext } from "./types";
import { MdRemoveCircle } from "react-icons/md";
import { switchPathPatient, switchTypePatient } from "./functions";
import { PatientInfo } from "./PatientInfo";


const DataPatients: React.FC = () => {
  const { ptType } = useParams();
  const { patients }: { patients: PatientInterface[] } = useSelector(
    (state: State) => state.patients
  );
  const { selectedFilter } = useContext(ShowPatientsContext)
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchPatient = async () => {
      await dispatch(ShowPatientsApi());
    };
    fetchPatient();
  }, [dispatch]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {patients.length > 0 &&
        patients
          .filter((patient: PatientInterface) =>
            switchPathPatient(ptType, patient)
              && 
            switchTypePatient(selectedFilter, patient)
            
          )
          .map((patient: PatientInterface) => (
            <section
              className="bg-white border rounded shadow px-4 py-2 hover:bg-main Data-Patient"
              key={patient._id}
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
                icon={<GiLifeBar />}
                title="Age"
                value={new Date().getFullYear() - Number(formatDate(patient.dob).split("/")[2])}
              />
              <PatientInfo
                icon={<BsFillTelephoneFill />}
                title="Telephone"
                value={patient.phone}
              />
              <PatientInfo
                icon={<FaBirthdayCake />}
                title="Date"
                value={formatDate(patient.createdAt.toString())}
              />
              <PatientInfo
                icon={<BiHealth />}
                title="Etat de santé"
                value={patient.HealthCondition}
              />
              <PatientInfo
                icon={<FaRegMoneyBillAlt />}
                title="Balance"
                className={`${patient.balance < 0 ? "text-red" : ""}`}
                value={patient.balance.toString()}
              />
              <div className="flex justify-center">
                <FaEdit className="text-blue" style={{
                  fontSize: "22px"
                }}/>
                <MdRemoveCircle className="text-red" style={{
                  fontSize: "22px"
                }}/>
              </div>
            </section>
          ))}
    </div>
  );
};



export default DataPatients;
