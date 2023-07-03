import React, { useState } from 'react';
import { DataDayOfWorkContext, DayofTheWeek } from './types';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import InputsDayOfWork from './forms/InputsDayOfWork';

interface AddDayOfWorkInterface {
  modal: boolean,
  toggle: () => void,
}

const AddDayOfWork:React.FC<AddDayOfWorkInterface> = ({ modal, toggle }) => {
  const [DayArray, setDayArray] = useState<any[]>(Object.values(DayofTheWeek));
  const [day, setDay] = useState("")

  return (
    <DataDayOfWorkContext.Provider value={{
      DayArray, setDayArray,
      day, setDay
    }}>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                  >
                    <InputsDayOfWork />
                    <ButtonsForm typeBtn="Ajouter" toggle={toggle}/>
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataDayOfWorkContext.Provider>
  );
}

export default AddDayOfWork
