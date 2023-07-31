import React from "react";

interface ButtonsAddUserInterface {
  toggle: () => void;
  typeBtn?: string;
}

const ButtonsAddUser: React.FC<ButtonsAddUserInterface> = ({
  toggle,
  typeBtn,
}) => {
  return (
    <div className="items-center gap-2 mt-3 sm:flex">
      {/* START Modal Footer */}      
      <button
        className="w-full mt-2 p-2.5 flex-1 bg-gray-600 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
        onClick={toggle}
      >
        Fermer
      </button>
      {typeBtn === "edit" ? (
        <button
          type="submit"
          className="w-full mt-2 p-2.5 flex-1 text-white btn-blue rounded-md outline-none"
        >
          Modifier
        </button>
      ) : (
        <button
          type="submit"
          className="w-full mt-2 p-2.5 flex-1 text-white btn-main rounded-md outline-none"
        >
          Ajouter
        </button>
      )}
      {/* End Modal Footer */}
    </div>
  );
};

export default ButtonsAddUser;
