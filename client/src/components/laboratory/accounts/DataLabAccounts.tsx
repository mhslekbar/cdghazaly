import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { ShowAccountLabApi } from "../../../redux/laboratory/accounts/labAccountApiCalls";
import { useNavigate, useParams } from "react-router";
import { AccountsInterface } from "./types";
import { ShowLaboratoryContext } from "../ShowLaboratory";

const DataLabAccounts: React.FC = () => {
  const { accountLab } = useSelector((state: State) => state.accountLab);
  const { setSelectedDoctorLab } = useContext(ShowLaboratoryContext);

  const { labId } = useParams();
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchLab = async () => {
      try {
        await dispatch(ShowAccountLabApi(labId || ""));
      } catch {}
    };
    fetchLab();
  }, [dispatch, labId]);

  const navigate = useNavigate();

  return (
    <div className="w-1/4">
      <div className="flex flex-col border">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-3 py-2 border-r">Doctor</th>
                    <th className="px-3 py-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {accountLab.map((acc: AccountsInterface, index: number) => (
                    <tr className="border-b" key={index}>
                      <td
                        className="hover:bg-[#DDD] whitespace-nowrap px-4 py-2 border-r bg-white font-medium"
                        onClick={() => {
                          setSelectedDoctorLab(acc.doctor);
                          navigate(
                            `/laboratory/${labId}/payments/${acc.doctor._id}`
                          );
                        }}
                      >
                        {acc.doctor.username}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {acc.balance.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataLabAccounts;