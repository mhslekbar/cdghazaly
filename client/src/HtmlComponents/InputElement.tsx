import React from "react";

interface InputElementInterface {
  type?: string,
  name?: string,
  placeholder?: string,
  id?: string,
  value: any,
  setValue: (value: any) => void,
}

export const InputElement:React.FC<InputElementInterface> = ({ type = "text", name, id, value, setValue, placeholder }) => {
  return (
    <div className="mb-2">
      {name && 
        <label htmlFor={id} className={`block text-gray-700 font-bold w-fit`}>
          {name}
        </label>
      }
      <input
        type={type}
        id={id}
        className={`w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none`}
        // className={`${type === "text" || type === "number" ? "w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none" : ""}`}
        placeholder={placeholder || name}
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

