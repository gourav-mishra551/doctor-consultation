import React from 'react'

const Covid19Drugs = () => {
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 sm:px-10 mt-10'>
            <p className='text-3xl font-bold text-center'>Covid-19 Drugs</p>

            <div className="mt-4 sm:px-0">
                <table className="table-auto w-full sm:px-0 px-5">
                    <thead className='sm:px-0 px-5'>
                        <tr>
                            <th className="px-4 py-2 border-b text-gray-700">DRUG NAME</th>
                            <th className="px-4 py-2 border-b text-gray-700">STRENGHT</th>
                            <th className="px-4 py-2 border-b text-gray-700">PRESENTATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Darunavir 600mg tablet</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">0.5mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Chlorhexidine Gluconate 100ml</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">500mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Interferon Alpha 2B</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">5m IU</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Inj</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Amoxicillin</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">500mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Azithromycin</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">250mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Oseltamavir</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">75mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Cap</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Lopinavir + Ritonavir</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">200mg + 50mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Hydroxychloroquine</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">200mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Chloroquine phosphate</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">200mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Ribavirin</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">200mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Tab</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Atracurium</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">10mg/5ml</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Inj</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Propofol</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">10mg/ml</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Inj</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Ganciclovir</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">500mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Inj</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Fluconazole</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">200mg</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Inj</td>
                        </tr>
                        <tr className='text-center'>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Ascorbic Acid</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">1.5gm/ml</td>
                            <td className="border-b px-4 py-2 text-gray-500 text-sm">Inj</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            {/* <div className='flex justify-around'>
                <p>DRUG NAME</p>
                <p>STRENGHT</p>
                <p>PRESENTATION</p>
            </div>

            <div className='flex justify-around'>
                <p>Darunavir 600mg tablet</p>
                <p>0.5mg</p>
                <p>Tab</p>
            </div>

            <div className='flex justify-around'>
                <p>Chlorhexidine Gluconate 100ml</p>
                <p>500mg</p>
                <p>Tab</p>
            </div>

            <div className='flex justify-around'>
                <p>Interferon Alpha 2B</p>
                <p>5m IU</p>
                <p>Inj</p>
            </div>

            <div className='flex justify-around'>
                <p>Amoxicillin</p>
                <p>500mg</p>
                <p>Tab</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Azithromycin</p>
                <p>250mg</p>
                <p>Tab</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Oseltamavir</p>
                <p>75mg</p>
                <p>Cap</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Lopinavir + Ritonavir</p>
                <p>200mg + 50mg</p>
                <p>Tab</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Hydroxychloroquine</p>
                <p>200mg</p>
                <p>Tab</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Chloroquine phosphate</p>
                <p>200mg</p>
                <p>Tab</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Ribavirin</p>
                <p>200mg</p>
                <p>Tab</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Atracurium</p>
                <p>10mg/5ml</p>
                <p>Inj</p>
            </div>

            <div  className='flex justify-around text-center' >
                <p>Propofol</p>
                <p>10mg/ml</p>
                <p>Inj</p>
            </div>  

            <div  className='flex justify-around text-center' >
                <p>Ganciclovir</p>
                <p>500mg</p>
                <p>Inj</p>
            </div>  

            <div  className='flex justify-around text-center' >
                <p>Fluconazole</p>
                <p>200mg</p>
                <p>Inj</p>
            </div> 

            <div  className='flex justify-around text-center' >
                <p>Ascorbic Acid</p>
                <p>1.5gm/ml</p>
                <p>Inj</p>
            </div> */}


        </div>
    )
}

export default Covid19Drugs