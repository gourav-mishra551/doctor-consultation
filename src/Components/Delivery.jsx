import React from 'react'

const Delivery = () => {
    return (
        <div className='sm:max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 p-10 mt-10'>
            <p className='font-bold text-3xl'>Delivery</p>
            <p className='font-normal'>We are committed to reach medicines to any body anywhere in the world overcoming all the hurdles. We offer numerous delivery options across our range of treatments, including:</p>
            <div className='flex flex-col gap-3'>
                <ul>
                    <li className='list-disc'>
                        <p className='font-normal'>Shiprocket, Delhivary, DTDC</p>
                    </li>
                    <li className='list-disc'>
                        <p className='font-normal'>Post Office Collection by EMS</p>
                    </li>
                    <li className='list-disc'>Special Delivery in 7-21 Days Guaranteed by DHL, Fedex, UPS, Aramex</li>
                    <li className='list-disc'>Same Day or Next day delivery Possible with conditions.</li>
                </ul>
            </div>
            <div className='flex flex-col gap-3'>
                <p className='font-bold text-3xl'>Plain Packaging Guaranteed:</p>
                <p className='font-normal'>With our discreet packaging, you can order in confidence.</p>
                <p className='font-normal'>We never use our brand name on bills, delivery papers or your bank statement.</p>
                <p className='font-normal'>All packages are completely plain, without any details of what’s inside or who has sent it.</p>
                <p className='font-normal'>2. There is no indication of what’s inside the package or who has sent it. The packaging is plain brown or enclosed in an envelope and completely unmarked.</p>
                <p className='font-normal'>3. There are no markings on the parcel other than the address label on the front. There is also no mention of ametheushealth.com or a pharmacy on the label, so no one would know it contains medication.</p>
            </div>
            <p className='font-normal'>Please check shipment policy</p>
        </div>
    )
}

export default Delivery