import React, { useEffect, useState } from "react";
import { LineFicheInterface } from "../types";
import { formattedDate } from "../../../../functions/functions";

interface InputFicheInterface {
  type?: string,
  Line: LineFicheInterface,
  kind: string,
  className?: string,
  disabled?: boolean,
}

export const InputFiche:React.FC<InputFicheInterface> = ({ type = "text", Line, kind, className, disabled = false}) => {
  const [data, setData] = useState("")

  useEffect(() => {
    switch(kind) {
      case "date": 
        setData(Line.dateAppointment)
      break;
      case "acte": 
        setData(Line.acte)
      break;
      case "amount": 
        setData(Line.amount?.toString())
      break;
      case "lineFicheId":
        setData(Line._id)
      break;
    }
  }, [kind, Line])

  return (
    <input
      type={type === "date" && !Line.dateAppointment ? type : type === "date" ? "date" : "text"}
      className={`uppercase w-full px-2 py-3 text-gray-700 focus:outline-none ${className} ${kind}`}
      value={type === "date" ? formattedDate(data?.toString()) : data ?? ""}
      autoComplete="off"
      onChange={(e) => setData(e.target.value)}
      disabled={disabled}
    />    
  );
};

