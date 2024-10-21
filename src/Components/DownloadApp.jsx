import React from 'react'
import { PiCheckLight } from "react-icons/pi";

const DownloadApp = () => {
    return (
        <div className='flex justify-center gap-[100px] bg-[#f0f0f5]'>
            <div className='left w-[300px]'>
                <img src="am-mobile.png" alt="" />
            </div>

            <div className="right mt-[70px]">
                <div className='flex flex-col gap-2'>
                    <p className='text-[#2d2d32] text-3xl font-semibold'>Download the Ametheus Health app</p>
                    <p className='text-[#2d2d32] font-semibold'>Get ₹200 HealthCash</p>
                </div>

                <div className='flex flex-col gap-3 mt-10'>
                    <div className='flex gap-2'>
                        <PiCheckLight className='mt-2 text-[#1ea1d9]' />
                        <p className='text-[#2d2d32] font-normal'>Video consult with Doctors</p>
                    </div>

                    <div className='flex gap-2'>
                        <PiCheckLight className='mt-2 text-[#1ea1d9]' />
                        <p className='text-[#2d2d32] font-normal'>Live medicine order tracking</p>
                    </div>

                    <div className='flex gap-2'>
                        <PiCheckLight className='mt-2 text-[#1ea1d9]' />
                        <p className='text-[#2d2d32] font-normal'>Exclusive healthcare packages</p>
                    </div>

                    <div className='flex gap-2'>
                        <PiCheckLight className='mt-2 text-[#1ea1d9]' />
                        <p className='text-[#2d2d32] font-normal'>Ask free questions</p>
                    </div>
                </div>

                <div className='mt-7'>
                    <p className='text-[#4e4e53] font-semibold text-lg'>Get the link to download the app</p>
                    <div className='mt-3 flex gap-3'>
                        <div className='bg-white p-3 flex gap-3 w-[300px]'>
                            <p className='text-[#4e4e53] font-semibold text-lg'>+91</p>
                            <div className='h-[20px] w-[1px] bg-black mt-1'></div>
                            <input type="text"
                                className=''
                                placeholder='Enter Phone number'
                                style={{outline:"none"}}
                            />
                        </div>
                        <div className='bg-[#199fd9] p-3 w-[135px] text-white font-bold'>
                            <button>Send App Link</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DownloadApp