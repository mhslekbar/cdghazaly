import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShowFicheApi } from "../../../redux/fiches/ficheApiCalls";
import { useDispatch } from "react-redux";
import { LineFicheInterface, ShowFichesContext } from "./types";
import ShowAllDevis from "./controls/DevisMgt/ShowAllDevis";
import DataLineFiche from "./DataLineFiche";

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
                      (Line: LineFicheInterface, index: number) => 
                      <React.Fragment key={index}>
                        <DataLineFiche myIndex={index} Line={Line} modal={isShowingDevis} toggle={() => setIsShowingDevis(!isShowingDevis) } />
                      </React.Fragment>
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
