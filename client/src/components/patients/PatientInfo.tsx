import React from "react";

interface PatientInfoInfo {
  className?: string,
  title: string;
  value: string | number;
  icon?: any;

}
export const PatientInfo:React.FC<PatientInfoInfo> = ({ className, title, value, icon }) => {
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