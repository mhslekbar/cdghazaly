import React from "react";

interface InputElementInterface {
  type?: string,
  name?: string,
  placeholder?: string,
  id?: string,
  value: any,
  setValue: (value: any) => void,
  divClass?: string
}

export const InputElement:React.FC<InputElementInterface> = ({ type = "text", name, id, value, setValue, placeholder, divClass = "" }) => {
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    if(type === "date") {
      if(inputValue) {
        const newDate = new Date(inputValue);
        setValue(newDate.toISOString().split('T')[0]);
      }
    } else {
      setValue(e.target.value)
    }

  };

  return (
    <div className={`mb-2 ${divClass}`}>
      {name && 
        <label htmlFor={id} className={`block text-gray-700 font-bold w-fit`}>
          {name}
        </label>
      }
      <input
        type={type}
        id={id}
        // className={`uppercase w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none`}
        // uppercase
        className={`${type !== "color" ? " w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none" : ""}`}
        placeholder={placeholder || name}
        value={value}
        autoComplete="off"
        onChange={handleInputChange}
        // onChange={(e) => {
        //   type === "date" ? setValue(formattedDate(e.target.value)) : setValue(e.target.value)
        // }}
      />
    </div>
  );
};

