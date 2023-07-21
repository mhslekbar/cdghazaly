import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DataConsumableListContext, ListConsumableInterface } from './types';
import { EditListConsumableApi } from '../../../redux/listConsumable/listConsumableApiCalls';
import { Timeout, hideMsg } from '../../../functions/functions';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { InputElement } from '../../../HtmlComponents/InputElement';
import { ShowConsumableContext } from '../types';

export interface EditConsumableListInterface {
  modal: boolean,
  toggle: () => void,
  ConsumableListData: ListConsumableInterface
}

const EditConsumableList:React.FC<EditConsumableListInterface> = ({ modal, toggle, ConsumableListData  }) => {
  const [name, setName] = useState(ConsumableListData.name)
  const [errors, setErrors] = useState<string[]>([])

  const { setShowSuccessMsg } = useContext(ShowConsumableContext)
  const dispatch: any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(EditListConsumableApi(ConsumableListData._id, { name }))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setName("")
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } catch { }
  }

  return (
    <DataConsumableListContext.Provider value={{
      name, setName
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
                    onSubmit={handleSubmit}
                  >
                    {errors.length > 0 &&
                      errors.map((err, index) => (
                        <p
                          className="p-3 my-2 rounded bg-red text-white msg"
                          key={index}
                          onClick={(e) => hideMsg(e, errors, setErrors)}
                        >
                          {err}
                        </p>
                      ))}
                    <InputElement name="Note" placeholder='donner une note si vous voulez.' value={name} setValue={setName} />
                    <ButtonsForm typeBtn='Modifier' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataConsumableListContext.Provider>
  );
}

export default EditConsumableList
