import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShowFicheApi } from "../../../redux/fiches/ficheApiCalls";
import { useDispatch } from "react-redux";
import { LineFicheInterface, ShowFichesContext } from "./types";
import { InputFiche } from "./controls/InputFiche";
import { FaEye } from "react-icons/fa";
import ShowAllDevis from "./controls/DevisMgt/ShowAllDevis";

const DataFiches: React.FC = () => {
  const { patientId } = useParams();
  const { selectedFiche } = useContext(ShowFichesContext);
  const [isShowingDevis, setIsShowingDevis] = useState(false);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchFiches = async () => {
      await dispatch(ShowFicheApi(patientId));
    };
    fetchFiches();
  }, [dispatch, patientId]);

  return (
    <>
      <ShowAllDevis
        modal={isShowingDevis}
        toggle={() => setIsShowingDevis(!isShowingDevis)}
      />
      {selectedFiche && 
        <div className="flex flex-col border border-[#95a5a6] shadow-lg">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b border-[#95a5a6] font-medium bg-white text-center">
                    <tr>
                      <th className="px-6 py-4 border-r border-[#95a5a6]">
                        Date
                      </th>
                      <th className="px-6 py-4 border-r border-[#95a5a6]">
                        Actes
                      </th>
                      <th className="px-6 py-4 border-r border-[#95a5a6]">
                        Montant
                      </th>
                      <th className="px-6 py-4">Facture</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche?.LineFiche?.map(
                      (Line: LineFicheInterface, index: any) => (
                        <tr className="border-b border-[#95a5a6]" key={index}>
                          <td className="whitespace-nowrap border-r border-[#95a5a6] bg-white font-medium w-6">
                            {Line.dateAppointment && (
                              <InputFiche type="date" Line={Line} kind="date" />
                            )}
                          </td>
                          <td className="whitespace-nowrap border-r border-[#95a5a6] bg-white font-medium relative">
                            <InputFiche
                              className="disabled:bg-white"
                              disabled={Line.finish}
                              Line={Line}
                              kind="acte"
                            />
                            {Line.dateAppointment && (
                              <FaEye
                                className="hover:text-main"
                                style={{
                                  fontSize: "22px",
                                  position: "absolute",
                                  top: "10px",
                                  right: "10px",
                                }}
                                onClick={() => setIsShowingDevis(!isShowingDevis)}
                              />
                            )}
                          </td>
                          <td
                            className={`whitespace-nowrap border-r border-[#95a5a6] bg-white w-9 font-medium`}
                          >
                            <InputFiche
                              disabled={Line.finish}
                              className={`${
                                Line.finish === true ? "bg-main text-white" : ""
                              } text-center font-bold`}
                              Line={Line}
                              kind="amount"
                            />
                          </td>
                          <td className="bg-white w-3"></td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default DataFiches;
