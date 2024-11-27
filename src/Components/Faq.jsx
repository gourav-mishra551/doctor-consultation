import React, { useState } from 'react';

const Faq = ({result}) => {
    const [openIndex, setOpenIndex] = useState(null);
     
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = Array.isArray(result?.FAQ) ? result.FAQ : [];
    

   

    return (
        <div className='max-w-5xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10 mb-20'>
            <p className='font-bold text-2xl'>FAQ’s</p>
            <div className='h-[1px] w-full bg-gray-400'></div>
            <div className='flex flex-col gap-6'>
                {faqs.map((faq, index) => (
                    <div key={index} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",padding:"15px" }}>
                        <div 
                            className='cursor-pointer flex justify-between items-center'
                            onClick={() => toggleFAQ(index)}
                        >
                            <p className='text-gray-700 font-semibold text-lg'>{faq.title}</p>
                            <span className='text-gray-500'>{openIndex === index ? '-' : '+'}</span>
                        </div>
                        {openIndex === index && (
                            <p className='font-normal text-gray-500'>{faq.value}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
