import React, { useEffect, useState } from 'react'
import { DefaultDevisInterface, DevisInterface, LineDevisType } from '../../../Devis/types'
import { useDispatch } from 'react-redux'
import { ShowInvoicesApi } from '../../../../../redux/invoices/invoiceApiCalls'
import { useParams } from 'react-router'
import { get } from '../../../../../requestMethods'
import LineDevisData from './LineDevisData'

const DevisData = () => {
  
  const dispatch: any = useDispatch()
  const { patientId } = useParams()

  useEffect(() => {
    const fetchInvoices = async () => {
      await dispatch(ShowInvoicesApi(patientId));
    };
    fetchInvoices();
  }, [dispatch, patientId]);

  const [DevisData, setDevisData] = useState<DevisInterface[]>([DefaultDevisInterface])

  useEffect(() => {
    const getAllDevis = async () => {
      try {
        const response = await get(`invoice/${patientId}/getAllDevis`)
        const resData: DevisInterface[] = response.data.success
        console.log("resData: ", response.data.success)
        setDevisData(resData)
        return resData
      } catch (err) {
        console.log("err: ", err)
      }
    }
    getAllDevis()
  }, [patientId])
  

  return (
  <>
    {
      DevisData
      .sort((a: DevisInterface, b: DevisInterface) => a.numDevis - b.numDevis)
      .map((dv: DevisInterface) => (
        <React.Fragment 
        key={dv._id}
        >
        <h3 className='text-xl font-bold text-center p-1 my-1 bg-main'>Devis-{dv.numDevis}</h3>
        {
            <div className="flex flex-col border">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium text-center">
                      <tr>
                        <th className="px-3 py-2 border-r">Traitement</th>
                        <th className="px-3 py-2 border-r">Dents</th>
                        <th className="px-3 py-2 border-r">Surface</th>
                        <th className="px-3 py-2 border-r">NBS.SN</th>
                        <th className="px-3 py-2 border-r">Prix.u</th>
                        <th className="px-3 py-2 border-r">Total</th>    
                        <th className="px-3 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      dv.LineDevis
                      .sort((a:LineDevisType, b: LineDevisType ) => new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime())
                      .map((ln: LineDevisType, index) => {
                        return (
                          <React.Fragment key={index}>
                            <LineDevisData ln={ln} index={index}/>
                          </React.Fragment>
                        );
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
 
        </React.Fragment>
      ))
    }
  </>
  )


  // return (
  // <>
  //   {
  //     devis
  //     .slice()
  //     .sort((a: DevisInterface, b: DevisInterface) => a.numDevis - b.numDevis)
  //     .map((dv: DevisInterface) => (
  //       <React.Fragment key={dv._id}>
  //       <h3 className='text-xl font-bold text-center p-1 my-1 bg-main'>Devis-{dv.numDevis}</h3>
  //       {
  //           <div className="flex flex-col border">
  //           <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
  //             <div className="inline-block min-w-full sm:px-6 lg:px-8">
  //               <div className="overflow-hidden">
  //                 <table className="min-w-full text-left text-sm font-light">
  //                   <thead className="border-b font-medium text-center">
  //                     <tr>
  //                       <th className="px-3 py-2 border-r">Traitement</th>
  //                       <th className="px-3 py-2 border-r">Dents</th>
  //                       <th className="px-3 py-2 border-r">Surface</th>
  //                       <th className="px-3 py-2 border-r">NBS.SN</th>
  //                       <th className="px-3 py-2 border-r">Prix.u</th>
  //                       <th className="px-3 py-2 border-r">Total</th>    
  //                       <th className="px-3 py-2">Actions</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                   {
  //                     dv.LineDevis
  //                     .filter(async (ln: LineDevisType) => {
  //                       const result = await checkTreat(dv._id, ln.treatment._id, ln.teeth)
  //                       console.log("result : ", result)
  //                     })
  //                     .filter((ln: LineDevisType) => {
  //                       return ln._id !== "6491be5f579fca8cdec4b3a0"
  //                     })
  //                     .map((ln: LineDevisType, index) => {
  //                       return (
  //                         <React.Fragment key={index}>
  //                           <LineDevisData ln={ln} index={index}/>
  //                         </React.Fragment>
  //                       );
  //                     })
  //                   }
  //                   </tbody>
  //                 </table>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       }
 
  //       </React.Fragment>
  //     ))
  //   }
  // </>
  // )
}

export default DevisData


// .filter(async (ln: LineDevisType) => {
//   // const result:any = await checkTreat(dv._id, ln.treatment._id, ln.teeth);
//   // console.log("result: ", result)
//   // return result && !ln._id
//   // console.log(ln._id !== "6491be5f579fca8cdec4b3a0")
//   // return ln._id !== "6491be5f579fca8cdec4b3a0"
//   // return result?.treatment?._id === ln.treatment._id
//   // return result?.treatment?._id && !result?.LineInvoice?.some((line: LineInvoiceInterface) => line._id !== ln._id)
// })



// .filter(async function (ln){
//   // let result
//   // result = await checkTreat(dv._id, ln.treatment._id, ln.teeth);
//   // console.log("result inside : ", result)
//   return ln._id !== "6491be5f579fca8cdec4b3a0"
// }) // Replace "6491be5f579fca8cdec4b3a0" with your desired _id
