import React, { useContext } from 'react'
import { RoleType } from './types'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { editRoleApi } from "../../redux/roles/roleApiCalls"
import { ShowRoleContext } from './ShowRoles'
import { Timeout } from '../../functions/functions'

interface SavePermissionsInterface {
  role: RoleType
}

const SavePermissions:React.FC<SavePermissionsInterface> = ({ role }) => {
  const dispatch = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext)

  const handleSavePermission = async () => {
    const selectedPerm: string[] = []
    document.querySelectorAll<HTMLInputElement>(`[id*=role-permis${role._id}]`).forEach((item) => {
      if(item.checked) {
        selectedPerm.push(item.value)
      }
    })
    const boundActions = bindActionCreators({ editRoleApi }, dispatch)
    try {
      const response = await boundActions.editRoleApi(role._id, { permissions: selectedPerm })
      if(typeof response === "boolean") {
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch {}
  
  }
  
  return (
    <div className='text-end'>
      <button className='btn-main rounded py-2 px-4 mt-2 focus:outline-none' onClick={handleSavePermission}>Enrgistrer</button>
    </div>
  )
}

export default SavePermissions
