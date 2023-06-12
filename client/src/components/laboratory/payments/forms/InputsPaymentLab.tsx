import React, { useContext} from "react";
import { InputElement } from "../../../../HtmlComponents/InputElement";
import { DataPaymentLabContext } from "../types";

const InputsPaymentLab: React.FC = () => {
  const { comment, setComment, amount, setAmount } = useContext(
    DataPaymentLabContext
  );
  return (
    <div>
      <InputElement type="number" name="Montant" id="Montant" value={amount} setValue={setAmount} />
      <InputElement type="text" name="Comment" id="Comment" value={comment} setValue={setComment} />
    </div>
  );
};

export default InputsPaymentLab;
