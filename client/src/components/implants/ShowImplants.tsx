import React, { useEffect } from 'react'
import DataImplants from './DataImplants'
import { useDispatch } from 'react-redux'
import { ShowImplantsApi } from '../../redux/implants/implantApiCalls'
import { useNavigate } from 'react-router'
import { FaChevronCircleLeft } from 'react-icons/fa'

const ShowImplants = () => {
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchApis = async () => {
      await dispatch(ShowImplantsApi())
    }
    fetchApis()
  }, [dispatch])
  const navigate = useNavigate()

  return (
    <div>
      <FaChevronCircleLeft
        className="text-main"
        style={{ fontSize: "30px" }}
        onClick={() => {
          navigate(-1);
        }}
      />
      <DataImplants />
    </div>
  )
}

export default ShowImplants