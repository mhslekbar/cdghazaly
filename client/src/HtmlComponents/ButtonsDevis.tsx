import React from "react";

type ButtonsDevisType = {
  toggle: () => void,
  typeBtn: string;
  onClick: (e: any) => void,
  loading?: boolean
};

const ButtonsDevis: React.FC<ButtonsDevisType> = ({
  toggle,
  typeBtn,
  onClick,
  loading
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
    <div>
      <div className="items-center gap-2 mt-3 sm:flex">
        <button
          type="button"
          onClick={onClick}
          // className={`w-full mt-2 p-2.5 flex-1 text-white ${btnColor} rounded-md outline-none`}
          className={`w-full mt-2 p-2.5 flex-1 text-white ${btnColor} rounded-md outline-none ${
            loading ? 'bg-gray-400 cursor-not-allowed' : ''
          }`}
          disabled={loading}
         >
          {typeBtn}
        </button>
        <button
          type="button"
          className="w-full mt-2 p-2.5 flex-1 bg-gray-600 text-white rounded-md outline-none border"
          onClick={toggle}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ButtonsDevis;
