import React, { useContext } from "react";
import { InputElement } from "../../../../HtmlComponents/InputElement";
import { DataPaymentLabContext } from "../types";
import { formattedDate } from "../../../../functions/functions";
import { useTranslation } from "react-i18next";

const InputsPaymentLab: React.FC = () => {
  const { comment, setComment, amount, setAmount, createdAt, setCreatedAt } = useContext(
    DataPaymentLabContext
  );
  
  const { t } = useTranslation() 

  return (
    <div>
      <InputElement type="number" name={t("Montant")} id="Montant" value={amount} setValue={setAmount} />
      <InputElement type="text" name={t("Comment")} id="Comment" value={comment} setValue={setComment} />
      <InputElement type="date" name={t("Date")} id="Date" value={formattedDate(new Date(createdAt ?? "")?.toString())} setValue={setCreatedAt} />
    </div>
  );
};

export default InputsPaymentLab;
