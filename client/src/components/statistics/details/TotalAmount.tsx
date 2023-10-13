import React, { useContext, useEffect } from "react";
import { ShowStatisticContext } from "../types";
import { useTranslation } from "react-i18next";

interface TotalAmountInterface {
  sumPayment: number;
  sumCons: number;
}

const TotalAmount: React.FC<TotalAmountInterface> = ({
  sumPayment,
  sumCons,
}) => {
  const { setSumTotalAmount } = useContext(ShowStatisticContext)
  useEffect(() => {
    setSumTotalAmount(sumPayment + +sumCons)
  }, [sumPayment, sumCons, setSumTotalAmount])
  const { t } = useTranslation()
  return (
    <>
      <tr >
        <td colSpan={2} ></td>
        <td className="whitespace-nowrap px-4 py-2 border border-gray-950 bg-white font-medium">{sumCons.toString()}</td>
        <td className="whitespace-nowrap px-4 py-2 border border-gray-950 bg-white font-medium">{sumPayment.toString()}</td>
      </tr>
      <tr >
        <td colSpan={2}></td>
        <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950 bg-main">{t("Total")}</td>
        <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950 bg-main">{sumPayment + +sumCons}</td>
      </tr>
    </>
  );
};

export default TotalAmount;
