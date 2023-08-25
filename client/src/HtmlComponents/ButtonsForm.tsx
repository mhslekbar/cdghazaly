import React from "react";

type ButtonsFormType = {
  toggle: () => void;
  typeBtn: string;
};

const ButtonsForm: React.FC<ButtonsFormType> = ({
  toggle,
  typeBtn,
}) => {
  let btnColor;
  switch (typeBtn) {
    case "Ajouter":
      btnColor = "bg-main";
      break;
    case "Modifier":
      btnColor = "bg-blue";
      break;
    case "Supprimer":
      btnColor = "bg-red";
      break;
    case "Passer":
      btnColor = "bg-yellow";
      break;
    case "Terminer":
      btnColor = "bg-main";
      break;
    default:
      btnColor = "bg-main";
  }
  return (
    <div className="items-center gap-2 mt-3 sm:flex">
      <button
        type="submit"
        className={`w-full mt-2 p-2.5 flex-1 text-white ${btnColor} rounded-md outline-none`}
      >
        {typeBtn}
      </button>
      <button
        className="w-full mt-2 p-2.5 flex-1 bg-gray-600 text-white rounded-md outline-none border"
        onClick={toggle}
      >
        Fermer
      </button>
    </div>
  );
};

export default ButtonsForm;
