import React from "react";

interface ButtonsLaboratoryInterface {
  toggle: () => void;
  typeBtn: string;
}

const ButtonsLaboratory: React.FC<ButtonsLaboratoryInterface> = ({
  toggle,
  typeBtn,
}) => {

  let btnColor
  switch (typeBtn) {
    case "Ajouter":
      btnColor = "btn-main"
    break;
    case "Modifier":
      btnColor = "btn-blue"
    break;
    case "Supprimer":
      btnColor = "btn-red"
    break;
    default:
      btnColor = "btn-main"
    break;
  }

  return (
    <div>
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
    </div>
  );
};

export default ButtonsLaboratory;
