import React, { useState } from "react";
import { ShowAppointmentContext } from "./types";
import HeaderAppointment from "./HeaderAppointment";
import SuccessMsg from "../../Messages/SuccessMsg";
import AddNewAppointment from "./AddNewAppointment";
import AppointmentsTable from "./AppointmentsTable/TableAppointments";

const ShowAppointments: React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <ShowAppointmentContext.Provider
      value={{
        showSuccessMsg,
        setShowSuccessMsg,
        showAddModal,
        setShowAddModal,
      }}
    >
      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      <HeaderAppointment />
      <AddNewAppointment
        modal={showAddModal}
        toggle={() => setShowAddModal(!showAddModal)}
      />
      <AppointmentsTable />
    </ShowAppointmentContext.Provider>
  );
};

export default ShowAppointments;
