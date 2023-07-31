import React from "react";

type ButtonsTreatmentType = {
  toggle: () => void;
  typeBtn: string
};

const ButtonsTreatment: React.FC<ButtonsTreatmentType> = ({ toggle, typeBtn }) => {
  let btnColor
  switch(typeBtn) {
    case "Ajouter": btnColor = "bg-main"; break;
    case "Modifier": btnColor = "bg-blue"; break;
    case "Supprimer": btnColor = "bg-red"; break;
    default: btnColor = "bg-main";
  }
  return (
    <div className="items-center gap-2 mt-3 sm:flex">      
      <button
        className="w-full mt-2 p-2.5 flex-1 bg-gray-600 text-white rounded-md outline-none border"
        onClick={toggle}
      >
        Fermer
      </button>
      <button
        type="submit"
        className={`w-full mt-2 p-2.5 flex-1 text-white ${btnColor} rounded-md outline-none`}
      >
        {typeBtn}
      </button>
    </div>
  );
};

export default ButtonsTreatment;
