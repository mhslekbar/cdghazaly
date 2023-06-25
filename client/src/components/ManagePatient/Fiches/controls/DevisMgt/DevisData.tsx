import React, { useEffect, useState } from "react";
import {
  DefaultDevisInterface,
  DevisInterface,
  LineDevisType,
} from "../../../Devis/types";
import { useDispatch } from "react-redux";
import { ShowInvoicesApi } from "../../../../../redux/invoices/invoiceApiCalls";
import { useParams } from "react-router";
import { get } from "../../../../../requestMethods";
import LineDevisData from "./LineDevisData";

const DevisData = () => {
  const dispatch: any = useDispatch();
  const { patientId } = useParams();

  useEffect(() => {
    const fetchInvoices = async () => {
      await dispatch(ShowInvoicesApi(patientId));
    };
    fetchInvoices();
  }, [dispatch, patientId]);

  const [DevisData, setDevisData] = useState<DevisInterface[]>([
    DefaultDevisInterface,
  ]);

  useEffect(() => {
    const getAllDevis = async () => {
      try {
        const response = await get(`invoice/${patientId}/getAllDevis`);
        const resData: DevisInterface[] = response.data.success;
        setDevisData(resData);
        return resData;
      } catch (err) {
        console.log("err: ", err);
      }
    };
    getAllDevis();
  }, [patientId]);

  return (
    <>
      {DevisData.length === 0 && <p className="mb-4 text-center font-bold">Créer un nouveau devis !!</p>}
      {DevisData.sort(
        (a: DevisInterface, b: DevisInterface) => a.numDevis - b.numDevis
      ).map((dv: DevisInterface) => (
        <React.Fragment key={dv._id}>
          {dv.LineDevis.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-center p-1 my-1 bg-main">
                Devis-{dv.numDevis}
              </h3>
              {
                <div className="flex flex-col border">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium text-center">
                            <tr>
                              <th className="px-3 py-2 border-r">Traitement</th>
                              <th className="px-3 py-2 border-r">Dents</th>
                              <th className="px-3 py-2 border-r">Surface</th>
                              <th className="px-3 py-2 border-r">NBS.SN</th>
                              <th className="px-3 py-2 border-r">Prix.u</th>
                              <th className="px-3 py-2 border-r">Total</th>
                              <th className="px-3 py-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dv.LineDevis.sort(
                              (a: LineDevisType, b: LineDevisType) =>
                                new Date(a.createdAt || "").getTime() -
                                new Date(b.createdAt || "").getTime()
                            ).map((ln: LineDevisType, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <LineDevisData
                                    ln={ln}
                                    devis={dv}
                                    index={index}
                                  />
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default DevisData;
