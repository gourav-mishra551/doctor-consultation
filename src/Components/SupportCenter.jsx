import React from 'react'

const SupportCenter = () => {
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 sm:px-10 px-3 mt-10'>
            <div className='flex flex-col sm:justify-center sm:items-center gap-2'>
                <p className='font-bold text-2xl sm:text-start text-center'>Support Centre</p>
                <p className='font-semibold text-gray-700 sm:text-start text-center'>Call or Whatsapp at: +91-9999099538</p>
                <p className='font-semibold text-gray-700 sm:text-start text-center'>Whatsapp Support: +91-9999099538, +91 9990032288, +91 9990045588</p>
                <p className='font-semibold text-gray-700 sm:text-start text-center'>Email: info@ametheushealth.com</p>
                <p className='font-semibold text-gray-700 sm:text-start text-center'>Message us on X: www.twitter.com/ametheushealth</p>

                <div className='flex flex-col gap-5'>
                    <p className='text-center font-bold text-2xl'>OR</p>
                    <p className='font-semibold text-gray-700 sm:text-right text-center'>FILL THIS REQUEST FORM</p>
                </div>
            </div>

            <div className="request-form flex flex-col sm:gap-5 gap-2 sm:ml-20 px-5 sm:w-[500px] p-5 rounded-[10px]  shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px]">
                <div className='flex sm:flex-row flex-col sm:gap-5'>
                    <div>
                        <p className='font-semibold'>Name<span className='text-red-700'>*</span></p>
                        <input
                            type="text"
                            className='border border-gray-400 sm:w-[220px] w-full h-[40px] p-2'
                            style={{  outlineColor: 'rgb(0, 118, 138)'}}
                        />
                        <p className='text-[10px] font-normal'>First Name</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            className='border border-gray-400 sm:w-[220px] w-full h-[40px] p-2 mt-[27px]'
                            style={{  outlineColor: 'rgb(0, 118, 138)'}}
                        />
                        <p className='text-[10px] font-normal'>Last Name</p>
                    </div>
                </div>


                <div>
                    <p className='font-semibold'>Email <span className='text-red-700'>*</span></p>
                    <input
                        type="email"
                        className='border border-gray-400 sm:w-[460px] w-full h-[40px] p-2'
                        style={{  outlineColor: 'rgb(0, 118, 138)'}}
                    />
                    <p className='text-[10px] font-normal'>Email</p>
                </div>

                <div>
                    <p className='font-semibold'>Phone <span className='text-red-700'>*</span></p>
                    <input
                        type="phone"
                        className='border border-gray-400 sm:w-[460px] w-full h-[40px] p-2'
                        style={{  outlineColor: 'rgb(0, 118, 138)'}}
                    />
                    <p className='text-[10px] font-normal'>Phone</p>
                </div>

                <div>
                    <p className='font-semibold'>Request Description <span className='text-red-700'>*</span></p>
                    <textarea
                        type="phone"
                        className='border border-gray-400 sm:w-[460px] w-full h-[70px] p-2'
                        style={{  outlineColor: 'rgb(0, 118, 138)'}}
                    />
                    <p className='text-[10px] font-normal'>0 of 1000 max words.</p>
                </div>

                <div className='flex justify-center'>
                    <button className='font-bold text-white h-[40px] w-[100px] p-3 bg-[#066aab] flex justify-center items-center rounded-sm border-none'>Submit</button>
                </div>

            </div>

        </div>
    )
}

export default SupportCenter