import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { filterSpecificDate } from "../../../functions/functions";
import { useParams } from "react-router";
import { ShowStatisticContext } from "../types";
import { useTranslation } from "react-i18next";
import { ShowPaymentLabApi } from "../../../redux/laboratory/payments/paymentLabApiCalls"
import { PaymentLabType } from "../../laboratory/payments/types";

const PaymentLab: React.FC = () => {
  const { paymentLab } = useSelector(
    (state: State) => state.paymentLab
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    const fetchConsumptions = async () => {
      await dispatch(ShowPaymentLabApi());
    };
    fetchConsumptions();
  }, [dispatch]);

  const { doctorId } = useParams()
  const { day, month, selectedDate, showSwitchDate, startDate, endDate, setSumPaymentLab, sumPaymentLab } = useContext(ShowStatisticContext)

  useEffect(() => {
    setSumPaymentLab(
      filterSpecificDate(
        paymentLab, day, month, showSwitchDate, startDate, endDate, selectedDate
      )
      .filter(
        (payment: PaymentLabType) =>
        payment.doctor._id === doctorId
      )
      .sort((a: PaymentLabType, b: PaymentLabType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .reduce((acc: number, currVal: PaymentLabType) => acc + Number(currVal.amount), 0)
      )
    }, [day, month, selectedDate, showSwitchDate, startDate, endDate, setSumPaymentLab, sumPaymentLab, doctorId, paymentLab])
  const { t } = useTranslation()


  return (
    <tr>
      <td colSpan={2}></td>
      <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">
        {t("Paiements Labo")}
      </td>
      <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">
        {sumPaymentLab}
      </td>
    </tr>
  );
};

export default PaymentLab;
