import React, { useContext, useEffect, useState } from 'react'
import { DefaultDataInputsPatientContext } from '../types'
import { InputElement } from '../../../HtmlComponents/InputElement'
import { InputCheckbox } from '../../../HtmlComponents/InputCheckbox'
import { UserInterface } from '../../users/types'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { ShowPaymentMethodApi } from '../../../redux/paymentMethods/paymentMethodApiCalls'
import { UserData } from '../../../requestMethods'
import { SelectElement } from '../../../HtmlComponents/SelectElement'

const InputsPatient = () => {
  const { 
    name, setName,
    phone, setPhone,
    whatsApp, setWhatsApp,
    address, setAddress,
    healthyCondition, setHealthyCondition,
    yearOfBirth, setYearOfBirth,
    social, setSocial,
    consultation, setConsultation,
    doctor, setDoctor,
    paymentMethod, setPaymentMethod
  } = useContext(DefaultDataInputsPatientContext)
  
  const [ArrayOfDoctors, setArrayOfDoctors] = useState<UserInterface[]>([])
  const [hideChooseDr, setHideChooseDr] = useState(false)
  const { users } = useSelector((state: State) => state.users)
  const { paymentMethods } = useSelector((state: State) => state.paymentMethods)

  useEffect(() => {
    setArrayOfDoctors(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  useEffect(() => {
    const doctorData = UserData().doctor.cabinet
    setHideChooseDr(!doctorData && true)
    setDoctor(doctorData ? UserData()._id : ArrayOfDoctors[0]?._id)
  }, [ArrayOfDoctors, setDoctor])

  const dispatch: any = useDispatch()
  
  useEffect(() => {
    const fetchPaymentMethod = async () => {
      await dispatch(ShowPaymentMethodApi())
    }
    fetchPaymentMethod();
  }, [dispatch])


  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-2">
        <InputElement name="Nom" id="name" placeholder="Nom du patient ..." value={name} setValue={setName} />
        <InputElement name="Telephone" id="phone" placeholder="Numero de telephone" value={phone} setValue={setPhone} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InputElement name="Address" id="address" placeholder="Address du patient" value={address} setValue={setAddress} />
        <InputElement name="WhatsApp" id="whatsApp" placeholder="Whatsapp" value={whatsApp} setValue={setWhatsApp} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InputElement name="Etat de Santé" id="healthyCondition" placeholder="Etat de santé" value={healthyCondition} setValue={setHealthyCondition} />
        <InputElement name="Année de naissance" id="yearOfBirth" placeholder="Année de naissance" value={yearOfBirth} setValue={setYearOfBirth} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InputCheckbox name="Consultation" id="cons" value={consultation} setValue={setConsultation} />
        <InputCheckbox name="Social" id="social" value={social} setValue={setSocial} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {consultation && (
          <>
          <SelectElement  
            id="paymentMethod"
            value={paymentMethod}
            setValue={setPaymentMethod}
            options={ paymentMethods
              .map((option: any) => ({_id: option._id, name: option.name}))
            }
            defaultOption={<option>cash</option>} 
            />
          {hideChooseDr && (
            <SelectElement  id="doctor" value={doctor} setValue={setDoctor} options={ArrayOfDoctors.map((option: any) => ({_id: option._id, name: option.username}))} />
          )}
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default InputsPatient


/**
 
            <div className="mb-2">
              <select
                className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => {
                  const index = e.target.selectedIndex;
                  setPaymentMethod(e.target.options[index].value);
                }}
              >
                <option value="">Cash</option>
                {paymentMethods.map((option: any) => (
                  <option value={option._id} key={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

 */