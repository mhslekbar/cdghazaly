import React, { useContext, useState } from 'react';
import { UserInterface } from './types';
import { ShowUserContext } from './ShowUsers';
import { Timeout, hideMsg } from '../../functions/functions';
import { DeleteUserApi } from '../../redux/users/UserApiCalls';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';

interface DeleteUserInterface {
  modal: boolean,
  toggle: () => void,
  user: UserInterface
}

const DeleteUser:React.FC<DeleteUserInterface> = ({ modal, toggle, user }) => {
  const { setSuccessMsg } = useContext(ShowUserContext)
  const [errors, setErrors] = useState<string[]>([])
  const dispatch = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const boundActions = bindActionCreators({ DeleteUserApi }, dispatch)
    const response = await boundActions.DeleteUserApi(user._id)
    if(typeof response === "boolean") {
      setSuccessMsg(true)
      toggle()
      setTimeout(() => setSuccessMsg(false), Timeout)
    } else if(Array.isArray(response)) {
      setErrors(response)
    }
  }

  return (
    <div>
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
                    {/* My Inputs */}
                    <p>Vous etes sur de vouloir supprimer <b>{user.username}</b>?</p>
                    {/* START Modal Footer */}
                    <ButtonsForm typeBtn='Supprimer' toggle={toggle} />
                    {/* End Modal Footer */}
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DeleteUser
