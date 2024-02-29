import React, { useContext, useState } from 'react';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { ApprovePaymentsApi } from '../../../redux/payments/paymentApiCalls';
import { useParams } from 'react-router';
import { ShowStatisticContext } from '../types';
import { Timeout } from '../../../functions/functions';
import { PaymentInterface } from '../../ManagePatient/Payments/types';

interface props {
  filteredApproveData: PaymentInterface[],
  modal: boolean,
  toggle: any
}

const ApprovePayments:React.FC<props> = ({ filteredApproveData, modal, toggle }) => {
  const [loading, setLoading] = useState(false);
  const { setShowSuccessMsg } = useContext(ShowStatisticContext)
  const dispatch: any = useDispatch()
  const { doctorId } = useParams()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await dispatch(ApprovePaymentsApi(doctorId, filteredApproveData))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } finally {
      setLoading(false)
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
                    <p>Voulez-vous valider les statistiques?</p>
                    <ButtonsForm loading={loading} typeBtn='Valider' toggle={toggle}/>
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

export default ApprovePayments
