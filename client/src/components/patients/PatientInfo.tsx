import React from "react";

interface PatientInfoInterface {
  className?: string,
  title: string;
  value: string | number;
  icon?: any;
}
export const PatientInfo:React.FC<PatientInfoInterface> = ({ className, title, value, icon }) => {
  return (
    <div className="flex justify-between">
      <p style={{ display: "inherit" }}>
        <span className="text-main mr-1 mt-1">{icon}</span>
        {title}
      </p>
      {className ? 
      <b  className={className}>{value}</b>
    :
    <b>{value}</b>
    }
    </div>
  );
};