import React from "react";
import { useTranslation } from "react-i18next";

interface props {
  errors: string[];
  setErrors: any;
  customClass?: string
}

const ShowErrorMsg: React.FC<props> = ({ errors, setErrors, customClass }) => {
  
  const hideMsg = (e: any, error: string[], setError: any) => {
    const theMsg = e.target.getAttribute("data-errormsg");
    setError(
      error.filter(
        (err) => err?.toUpperCase()?.trim() !== theMsg?.toUpperCase()?.trim()
      )
    );
  };
  const { t } = useTranslation()
  return (
    <>
      {errors.length > 0 &&
        errors.map((err, index) => (
          <p
            className={`${customClass ?? "bg-red"} p-3 my-2 rounded text-white msg`}
            key={index}
            data-errormsg={err}
            onClick={(e) => hideMsg(e, errors, setErrors)}
          >
            {t(err)}
          </p>
        ))}
    </>
  );
};

export default ShowErrorMsg;
