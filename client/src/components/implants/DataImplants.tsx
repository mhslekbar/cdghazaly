import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { ImplantInterface } from "./types";
import { formatLongDate, RegNo } from "../../functions/functions";

const DataImplants: React.FC = () => {
  const { implants } = useSelector((state: State) => state.implants);

  return (
    <div className="flex flex-col border mt-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-4 py-4">No.</th>
                  <th className="px-4 py-4">Nom</th>
                  <th className="px-4 py-4">Traitement</th>
                  <th className="px-4 py-4">Dents</th>
                  <th className="px-4 py-4">Date prévu</th>
                </tr>
              </thead>
              <tbody>
                {implants.map((implant: ImplantInterface, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-2 py-2 border-r bg-white font-medium">
                      {RegNo(implant.patient?.RegNo)}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r bg-white font-medium">
                      {implant.patient?.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r bg-white font-medium">
                      {implant.treatment?.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r bg-white font-medium">
                      {implant.teeth?.nums.map((num: string, index) => num + (index < implant.teeth?.nums.length - 1 ? ", " : ""))}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r bg-white font-medium">
                      {formatLongDate(new Date(new Date().setMonth(new Date(implant.updatedAt).getMonth() + 3)))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataImplants;
