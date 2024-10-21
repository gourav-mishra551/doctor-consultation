import React from 'react'

const FillRfqForm = () => {
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 sm:px-10 mt-10'>
        <p className='font-bold text-xl text-center'>Request Form</p>
        <div className="request-form flex flex-col gap-5 sm:ml-20 px-10 sm:w-[550px] p-5  rounded-[10px] shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px]">

                <div className='flex sm:flex-row flex-col gap-5'>
                    <div>
                        <p className='font-semibold'>Name<span className='text-red-700'>*</span></p>
                        <input
                            type="text"
                            className='border border-gray-400 sm:w-[220px] w-full h-[40px] p-2 focus:outline-none focus:ring-2 focus:ring-rgb(0,118,138)-500'
                        />
                        <p className='text-[10px] font-normal'>First Name</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            className='border border-gray-400 sm:w-[220px] w-full h-[40px] p-2 mt-[27px] focus:outline-none focus:ring-2 focus:ring-rgb(0,118,138)-500'
                        />
                        <p className='text-[10px] font-normal'>Last Name</p>
                    </div>
                </div>


                <div>
                    <p className='font-semibold'>Email <span className='text-red-700'>*</span></p>
                    <input
                        type="email"
                        className='border border-gray-400 sm:w-[460px] w-full h-[40px] p-2 focus:outline-none focus:ring-2 focus:ring-rgb(0,118,138)-500'
                    />
                    <p className='text-[10px] font-normal'>Email</p>
                </div>

                <div>
                    <p className='font-semibold'>Phone <span className='text-red-700'>*</span></p>
                    <input
                        type="phone"
                        className='border border-gray-400 sm:w-[460px] w-full h-[40px] p-2 focus:outline-none focus:ring-2 focus:ring-rgb(0,118,138)-500'
                    />
                    <p className='text-[10px] font-normal'>Phone</p>
                </div>

                <div>
                    <p className='font-semibold'>Request Description <span className='text-red-700'>*</span></p>
                    <textarea
                        type="phone"
                        className='border border-gray-400 sm:w-[460px] w-full h-[70px] p-2 focus:outline-none focus:ring-2 focus:ring-rgb(0,118,138)-500'
                    />
                    <p className='text-[10px] font-normal'>0 of 1000 max words.</p>
                </div>

                <div style={{display:"flex",justifyContent:"center"}}>
                    <button className='font-bold text-white h-[40px] w-[100px] p-3 bg-[#066aab] flex justify-center items-center rounded-sm border-none'>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default FillRfqForm