import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteTreatLabApi } from "../../../redux/laboratory/treatments/labTreatApiCalls";
import { useParams } from "react-router";
import {  TreatmentLabInterface } from "./types";
import { Timeout } from "../../../functions/functions";
import { ShowLaboratoryContext } from "../ShowLaboratory";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../../HtmlComponents/ShowErrorMsg";

interface DeleteTreatLabInterface {
  modal: boolean;
  toggle: () => void;
  TreatmentData: TreatmentLabInterface;
}

const DeleteTreatLab: React.FC<DeleteTreatLabInterface> = ({
  modal,
  toggle,
  TreatmentData,
}) => {
  const { labId } = useParams();

  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowLaboratoryContext);
  
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const boundActions = bindActionCreators({ DeleteTreatLabApi }, dispatch);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await boundActions.DeleteTreatLabApi(
        labId || "",
        TreatmentData._id
      );
      if (typeof response === "boolean") {
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        toggle();
      } else if (Array.isArray(response)) {
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

export default DeleteTreatLab;
