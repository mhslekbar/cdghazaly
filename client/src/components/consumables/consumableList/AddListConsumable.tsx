import React, { useContext, useState } from 'react';
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AddListConsumableApi } from '../../../redux/listConsumable/listConsumableApiCalls';
import { DataConsumableListContext } from './types';
import { Timeout, hideMsg } from '../../../functions/functions';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { InputElement } from '../../../HtmlComponents/InputElement';
import { useNavigate } from 'react-router';
import { ShowConsumableContext } from '../types';

const AddListConsumable:React.FC = () => {
  const [name, setName] = useState("")
  const [errors, setErrors] = useState<string[]>([])

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const { setShowSuccessMsg } = useContext(ShowConsumableContext)
  const dispatch: any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(AddListConsumableApi({name}))
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

  const navigate = useNavigate()

  return (
    <DataConsumableListContext.Provider value={{
      name, setName
    }}>
      <div className="flex justify-start gap-2 mt-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
        <button className="p-2 rounded btn-main" onClick={toggle}>
          <FaPlus />
        </button>
      </div>
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
                    <ButtonsForm typeBtn='Ajouter' toggle={toggle} />
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

export default AddListConsumable
