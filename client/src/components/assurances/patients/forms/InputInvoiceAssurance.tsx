import React, { useContext, useEffect, useState } from "react";
import { InputCheckbox } from "../../../../HtmlComponents/InputCheckbox";
import { UserInterface } from "../../../users/types";
import { DataInvoiceAssuranceContext } from "../types";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/store";

const InputInvoiceAssurance: React.FC = () => {
  const { inCommon, setInCommon, doctorInCommon, setDoctorInCommon } = useContext(
    DataInvoiceAssuranceContext
  );
  const [selectedDoctor, setSelectedDoctor] = useState<UserInterface[]>([]);

  const { users } = useSelector((state: State) => state.users)
  
  useEffect(() => {
    setSelectedDoctor(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  const handleSelectedDoctor = async (e: any, doctor: UserInterface) => {
    if (!e.target.checked) {
      setDoctorInCommon(
        doctorInCommon.filter((user: UserInterface) => user._id !== doctor._id)
      );
    } else {
      setDoctorInCommon([...doctorInCommon, doctor]);
    }
  };

  return (
    <div>
      <InputCheckbox
        id="inCommon"
        name="La facture est elle commune?"
        value={inCommon}
        setValue={setInCommon}
      />
      {inCommon &&
        selectedDoctor.length > 0 &&
        selectedDoctor.map((doctor: UserInterface) => (
          <div className="pl-4" key={doctor._id}>
            <input
              type="checkbox"
              id={doctor._id}
              onChange={(e) => handleSelectedDoctor(e, doctor)}
              checked={doctorInCommon.some(
                (user: UserInterface) => user._id === doctor._id
              )}
              className="px-4 py-2 rounded shadow border focus:outline-none focus:outline-shadow"
            />{" "}
            <label className="text-gray-700" htmlFor={doctor._id}>
              {doctor.username}
            </label>
          </div>
        ))}
    </div>
  );
};

export default InputInvoiceAssurance;
