import React, { useContext, useEffect } from "react";
import { ShowStatisticContext } from "../types";

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
  return (
    <>
      <tr >
        <td colSpan={2} className="border-r"></td>
        <td className="whitespace-nowrap px-4 py-2 border-b border-r print:border-0 bg-white font-medium">{sumCons.toString()}</td>
        <td className="whitespace-nowrap px-4 py-2 border-b border-r print:border-0 bg-white font-medium">{sumPayment.toString()}</td>
      </tr>
      <tr className="">
        <td colSpan={2}></td>
        <td className="whitespace-nowrap px-4 py-2 bg-white font-medium">Total</td>
        <td className="whitespace-nowrap px-4 py-2 bg-white font-medium">{sumPayment + +sumCons}</td>
      </tr>
    </>
  );
};

export default TotalAmount;
