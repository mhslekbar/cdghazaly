import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../redux/store'
import { FaEdit } from 'react-icons/fa'
import { MdRemoveCircle } from 'react-icons/md'
import { PaymentModeInterface, ShowPaymentModeContext } from './types'

const DataPaymentMode = () => {
  const { paymentModes } = useSelector((state: State) => state.paymentModes)

  const {
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    setSelectedPaymentMode
  } = useContext(ShowPaymentModeContext)

  const toggleEditPaymentMode = (paymentMode: PaymentModeInterface) => {
    setShowEditModal(!showEditModal)
    setSelectedPaymentMode(paymentMode)
  }

  const toggleDeletePaymentMode = (paymentMode: PaymentModeInterface) => {
    setShowDeleteModal(!showDeleteModal)
    setSelectedPaymentMode(paymentMode)
  }


  return (
    <div className="grid grid-cols-2 mt-3">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-sm font-light text-center">
            <thead className="border-b font-medium bg-main text-white">
              <tr>
                <th className="px-6 py-4 border-r">Nom</th>
                <th className="px-6 py-4 border-r">Code</th>
                <th className="px-6 py-4 border-r">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentModes.map((paymentMode: any, index: number) => (
                <tr className="border-b" key={index}>
                  <td className="text-start whitespace-nowrap px-4 py-2 bg-white border-r font-medium">
                    {paymentMode.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 bg-white border-r font-medium">
                    {paymentMode.code}
                  </td>
                  <td className="bg-white h-full">
                      <div className="flex justify-center">
                        <FaEdit className="text-blue" style={{
                          fontSize: "22px"
                        }} 
                        onClick={() => toggleEditPaymentMode(paymentMode)}
                        />
                        <MdRemoveCircle className="text-red" style={{
                          fontSize: "22px"
                        }}
                        onClick={() => toggleDeletePaymentMode(paymentMode)}
                        />
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DataPaymentMode