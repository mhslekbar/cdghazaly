import React, { useContext, useState } from "react";
import {
  AssuranceInterface,
  DefaultAssuranceInterface,
  ShowAssurancesContext,
} from "./types";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import { useDispatch } from "react-redux";
import { DeleteAssuranceApi } from "../../redux/assurances/assuranceApiCalls";
import { Timeout } from "../../functions/functions";
import { useNavigate } from "react-router";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";

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
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Supprimer" />
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
