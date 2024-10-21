import React from 'react'

const HowAmWork = () => {
    return (
        <div className='sm:max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 p-10 sm:mt-10'>
            <p className='text-[#1c8e81] sm:text-3xl text-xl text-center font-bold'>How ametheushealth.com works?</p>
            <div className='flex gap-5 justify-center'>
                <div className='w-[200px] h-[2px] bg-gray-300 mt-5'></div>
                <div>
                    <p className='text-[#0093a9] sm:text-2xl text-sm font-semibold'>For Personal Use 3 easy steps to receive your medication ⇓</p>
                </div>
                <div className='w-[200px] h-[2px] bg-gray-300 mt-5'></div>
            </div>

            <div className='flex sm:flex-row flex-col gap-5'>

                <div className='bg-[#0abbd5] sm:w-[33%] w-full rounded-xl p-5 flex flex-col justify-center items-center gap-3 hover:translate-y-1 transition-all duration-300 delay-150 ease-in-out'>
                    <div className='w-[80px]'>
                        <img src="Prescribed-Drugs.webp" alt="Prescribed-Drugs" />
                    </div>
                    <div>
                        <p className='text-white font-bold text-2xl'>1. Select your treatment</p>
                    </div>
                    <div className=''>
                        <p className='text-white font-normal text-[13px]'>Select the treatment or medication you require. Upload a valid doctor’s prescription
                            if its for personal use. please contact with our experienced pharmacists for advice on
                            +91-9999099538 or email us at <span>info@ametheushealth.com</span> Once you have selected your
                            medication, click the Buy button, which will add the medication to your cart. You can
                            now add more medication to your cart or simply checkout.</p>
                    </div>
                </div>

                <div className='bg-[#0abbd5] sm:w-[33%] w-full rounded-xl p-5 flex flex-col justify-center items-center gap-3 hover:translate-y-1 transition-all duration-300 delay-150 ease-in-out'>
                    <div className='w-[80px]'>
                        <img src="Prescribed-Drugs.webp" alt="Prescribed-Drugs" />
                    </div>
                    <div>
                        <p className='text-white font-bold text-2xl text-center'>2. Complete an online consultation</p>
                    </div>
                    <div className=''>
                        <p className='text-white font-normal text-[13px]'>Take an online medical consultation with questions resembling those from a GP. Determine treatment eligibility through a confidential assessment form, then proceed to checkout if eligible. A Physician prescriber reviews your answers and issues a prescription via email or WhatsApp if eligible.</p>
                    </div>
                </div>

                <div className='bg-[#0abbd5] sm:w-[33%] w-full rounded-xl p-5 flex flex-col justify-center items-center gap-3 hover:translate-y-1 transition-all duration-300 delay-150 ease-in-out'>
                    <div className='w-[80px]'>
                        <img src="Prescribed-Drugs.webp" alt="Prescribed-Drugs" />
                    </div>
                    <div>
                        <p className='text-white font-bold text-2xl'>3. Delivery</p>
                    </div>
                    <div className=''>
                        <p className='text-white font-normal text-[13px]'>Your medication is dispensed from a licensed pharmacy, with an option for 2 days delivery if you live or work within same city. If you live outside the territory of our registered pharmacy , then your medication can be delivered for the next 4 days via Special Delivery. Your medication is packed in plain packaging with no reference to the contents on the outside.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowAmWork