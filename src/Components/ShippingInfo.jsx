import React from 'react'
import { CiDeliveryTruck } from "react-icons/ci";

const ShippingInfo = () => {
    return (
        <div className='max-w-5xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10'>
            <p className='font-bold text-2xl'>SHIPPING POLICY</p>
            <div className='h-[1px] w-full bg-gray-400'></div>
            <div className='flex flex-col gap-5'>
                <p className='font-normal text-gray-500'>Orders are shipped on business days only. Business days are Monday-Friday, excluding National holidays within country of origin and country of destination.</p>
                <p className='font-normal text-gray-500'>The shipping cost shown for an individual item reflects what you can expect to pay if the item ships alone. An order containing multiple items typically receives a volume-shipping discount and therefore your total shipping and handling cost may be lower than the sum of individual ship charges appearing in your cart. Your actual shipping and handling cost will automatically compute on the Shipping Options page of checkout.</p>
                <p className='font-normal text-gray-500'>You will not be charged for any item until it is shipped to you.</p>
            </div>

            <div className='sm:w-[50%] w-full'>
                <p className='text-red-700 font-semibold text-xl'>Delivery Charge Worldwide (Except India)</p>
                <div className='flex justify-around mt-5'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold'>From </p>
                        <p className='font-normal'>$0.01</p>
                        <p className='font-normal'>50$</p>
                        <p className='font-normal'>200$</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-white'> -</p>
                        <p className='font-normal'>-</p>
                        <p className='font-normal'>-</p>
                        <p className='font-normal'>-</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-bold'>To</p>
                        <p className='font-normal'> $49.99</p>
                        <p className='font-normal'>$199.99</p>
                        <p className='font-normal'>Above</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-white'> -</p>
                        <p className='font-normal'>-</p>
                        <p className='font-normal'>-</p>
                        <p className='font-normal'>-</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-bold'>Shipping Cost</p>
                        <p className='font-normal'> $50</p>
                        <p className='font-normal'>$40</p>
                        <p className='font-normal'>Free Delivery</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                <div>
                    <CiDeliveryTruck className="text-[100px]" />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='font-bold text-2xl'>Delivery</p>
                    <p className='font-normal text-gray-500'>Fast, reliable and discreet delivery across the world.</p>
                </div>

                <div>
                    <p className='font-normal text-gray-400'>We offer a variety of delivery services for our patients via:</p>
                    <ul className='flex flex-col gap-3 mt-2 px-5'>
                        <li className='list-disc font-normal text-gray-500'>Shiprocket, Delhivary, DTDC</li>
                        <li className='list-disc font-normal text-gray-500'>Post Office Collection by EMS</li>
                        <li className='list-disc font-normal text-gray-500'>Special Delivery in 7-21 Days Guaranteed by DHL, Fedex, UPS, Aramex</li>
                        <li className='list-disc font-normal text-gray-500'>Same Day or Next day delivery Possible with conditions.</li>
                    </ul>
                </div>
                <p className='font-normal text-gray-400'>Our options start with first-class delivery, and can be upgraded to a tracked service if needed.</p>
            </div>

            <div className='flex flex-col gap-3'>
                <p className='font-semibold text-gray-700 text-lg'>Plain Packaging Guaranteed:</p>
                <p className='font-normal text-gray-500'>With our discreet packaging, you can order in confidence.</p>
                <p className='font-normal text-gray-500'>We never use our brand name on bills, delivery papers or your bank statement.</p>
                <p className='font-normal text-gray-500'>All packages are completely plain, without any details of what’s inside or who has sent it.</p>

                <div>
                    <p className='font-normal text-gray-500'>2. There is no indication of what’s inside the package or who has sent it. The packaging is plain brown or enclosed in an envelope and completely unmarked.</p>
                    <p className='font-normal text-gray-500'>3. There are no markings on the parcel other than the address label on the front. There is also no mention of ametheushealth.com or a pharmacy on the label, so no one would know it contains medication.</p>
                </div>
            </div>
        </div>
    )
}

export default ShippingInfo