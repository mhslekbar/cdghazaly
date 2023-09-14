import React, { useContext } from "react";
import { InputElement } from "../../../../HtmlComponents/InputElement";
import { DataPaymentLabContext } from "../types";
import { formattedDate } from "../../../../functions/functions";

const InputsPaymentLab: React.FC = () => {
  const { comment, setComment, amount, setAmount, createdAt, setCreatedAt } = useContext(
    DataPaymentLabContext
  );
  
  return (
    <div>
      <InputElement type="number" name="Montant" id="Montant" value={amount} setValue={setAmount} />
      <InputElement type="text" name="Comment" id="Comment" value={comment} setValue={setComment} />
      <InputElement type="date" name="Date" id="Date" value={formattedDate(new Date(createdAt ?? "")?.toString())} setValue={setCreatedAt} />
    </div>
  );
};

export default InputsPaymentLab;
