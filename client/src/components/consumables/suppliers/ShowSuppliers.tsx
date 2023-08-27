import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DefaultSupplierInterface, ShowSuppliersContext, SupplierInterface } from './types'
import AddSupplier from './AddSupplier'
import EditSupplier from './EditSupplier'
import DataSuppliers from './DataSupplier'
import DeleteSupplier from './DeleteSupplier'
import { ShowSuppliersApi } from '../../../redux/suppliers/supplierApiCalls'

const ShowSupplier:React.FC = () => {
  const [showEditSupplier, setShowEditSupplier] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierInterface>(DefaultSupplierInterface)
  const [showDeleteSupplier, setShowDeleteSupplier] = useState(false)
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchSupplier = async () => {
      await dispatch(ShowSuppliersApi())
    }
    fetchSupplier()
  }, [dispatch])

  return (
    <ShowSuppliersContext.Provider value={{
      showEditSupplier, setShowEditSupplier,
      selectedSupplier, setSelectedSupplier,
      showDeleteSupplier, setShowDeleteSupplier
    }}>
      <AddSupplier />
      <DataSuppliers />
      {showEditSupplier && selectedSupplier && <EditSupplier SupplierData={selectedSupplier} modal={showEditSupplier} toggle={() => setShowEditSupplier(!showEditSupplier)} />}
      {showDeleteSupplier && selectedSupplier && <DeleteSupplier SupplierData={selectedSupplier} modal={showDeleteSupplier} toggle={() => setShowDeleteSupplier(!showDeleteSupplier)} />}
    </ShowSuppliersContext.Provider>
  )
}

export default ShowSupplier
