import React, { useContext, useState } from "react";
import { AddUserContext } from "../types";

interface DoctorInterface {
  showDoctor: boolean;
  setShowDoctor: (val: boolean) => void;
}

const Doctor: React.FC<DoctorInterface> = ({ setShowDoctor, showDoctor }) => {
  const { doctor, setDoctor } = useContext(AddUserContext);

  const [cabinet, setCabinet] = useState(doctor?.cabinet);
  const [percentage, setPercentage] = useState(doctor?.percentage);

  const handleDoctor = (e: any) => {
    let cab = cabinet, perc = percentage
    if(e.target.getAttribute("data-doctor") === "cabinet") {
      setCabinet(e.target.value)
      cab = e.target.value
    } else if(e.target.getAttribute("data-doctor") === "percentage") {
      setPercentage(e.target.value < 0 || e.target.value > 100 ? 0 : e.target.value)
      perc = e.target.value
    }
    setDoctor({ cabinet: cab, percentage: perc })
  }

  return (
    <div>
      <div className="mb-2">
        <input
          type="checkbox"
          id="showDoctor"
          checked={showDoctor}
          onChange={(e) => setShowDoctor(e.target.checked)}
        />{" "}
        <label htmlFor="showDoctor" className="text-gray-700 font-bold">
          docteur ?
        </label>
      </div>

      {showDoctor && (
        <>
          <div className="mb-2">
            <label htmlFor="cabinet" className="block text-gray-700 font-bold">
              Cabinet
            </label>
            <input
              type="text"
              id="cabinet"
              className="w-full shadow rounded border px-4 py-2 text-gray-700 focus:outline-none"
              placeholder="Cabinet"
              value={cabinet}
              data-doctor="cabinet"
              onChange={(e) => handleDoctor(e)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="percentage"
              className="block text-gray-700 font-bold"
            >
              Pourcentage
            </label>
            <input
              type="number"
              id="percentage"
              className="w-full shadow rounded border px-4 py-2 text-gray-700 focus:outline-none"
              placeholder="Pourcentage"
              value={percentage}
              data-doctor="percentage"
              onChange={(e) => handleDoctor(e)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Doctor;
