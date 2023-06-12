import React, { useContext, useState } from "react";
import {
  AssuranceInterface,
  DefaultAssuranceInterface,
  ShowAssurancesContext,
} from "./types";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import { useDispatch } from "react-redux";
import { DeleteAssuranceApi } from "../../redux/assurances/assuranceApiCalls";
import { Timeout, hideMsg } from "../../functions/functions";
import { useNavigate } from "react-router";

interface DeleteAssuranceInterface {
  modal: boolean;
  toggle: () => void;
  AssuranceData: AssuranceInterface;
}

const DeleteAssurance: React.FC<DeleteAssuranceInterface> = ({
  modal,
  toggle,
  AssuranceData,
}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const { setShowSuccessMsg, setSelectedAssurance } = useContext(
    ShowAssurancesContext
  );
  const dispatch: any = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await dispatch(
        DeleteAssuranceApi(AssuranceData._id)
      );
      if (response === true) {
        setShowSuccessMsg(true);
        toggle();
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        setSelectedAssurance(DefaultAssuranceInterface);
        navigate("/assurance");
      } else {
        setErrors(response);
      }
    } catch {}
  };

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
                    <ButtonsForm toggle={toggle} typeBtn="Supprimer" />
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
};

export default DeleteAssurance;
