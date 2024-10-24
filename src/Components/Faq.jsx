import React, { useState } from 'react';

const Faq = ({result}) => {
    const [openIndex, setOpenIndex] = useState(null);
     
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    // const faqs = [
    //     {
    //         question: "Why don’t you need a prescription to sell your products, even though the same products require one over the counter?",
    //         answer: "Any non-controlled drugs can be legally imported into many countries (including the USA) by individuals for their personal use. We are a Hong Kong-based company and operate under different laws and regulations. We operate within all regulations and laws of the Hong Kong Special Administrative Region, and all products have been issued the necessary import and export licenses by the Hong Kong Health Department."
    //     },
    //     {
    //         question: "Do I need to have a medical evaluation?",
    //         answer: "We do not require you to have a medical evaluation, but we do strongly recommend you tell your doctor about all medication you are taking or planning to take, whether it is prescribed or non-prescription. Always consult your doctor before you start a new course of medication."
    //     },
    //     {
    //         question: "Are the products that you sell Genuine or Generic?",
    //         answer: "The pharmaceutical products we supply are all genuine branded products unless otherwise clearly stated on our website. The packaging may be different from what you are used to. This is due to the fact that we are based in Oceania and source from countries where packaging laws and branding can differ."
    //     },
    //     {
    //         question: "Are the products you sell within their expiration dates?",
    //         answer: "We do not sell prescription medication that is past its expiry date. It would be illegal to do so."
    //     },
    //     {
    //         question: "Do you guarantee I will receive my order?",
    //         answer: "If your order does not arrive with you, we will happily refund the amount of your purchase. Alternatively, if you prefer, we can arrange a replacement order to be sent to you."
    //     },
    //     {
    //         question: "Is it legal to order medications like this?",
    //         answer: "It is legal in most countries, including the USA and the UK. If you have concerns, please check with your local authorities. We will always let you know if we think there may be a problem with customs in your particular country."
    //     },
    //     {
    //         question: "Are the medications you ship the same quality as the ones I buy at the local pharmacy?",
    //         answer: "We only sell medications manufactured and marketed by leading international pharmaceutical companies. As a result, you can be assured of receiving high-quality medication."
    //     },
    //     {
    //         question: "Will you accept my health insurance as payment?",
    //         answer: "Unfortunately, we do not have any arrangements with health insurance companies or PBMs (Prescription Benefit Management companies) for prescription medication coverage, but we are going to do this very soon."
    //     },
    //     {
    //         question: "What currency are the prices in?",
    //         answer: "All prices listed on our website are in US dollars, British pound, & INR."
    //     },
    //     {
    //         question: "What is the shipping fee?",
    //         answer: "Orders totaling between $0.01 to $50 have a shipping cost of $50. For orders between $51 to $199, the shipping charge is only $40. For orders over $200, enjoy free shipping. We also offer express shipping options."
    //     },
    //     {
    //         question: "Do you have an express shipping option and how long does it take to deliver?",
    //         answer: "Our express shipping option takes 7-21 days, and DHL takes 4-7 days."
    //     },
    //     {
    //         question: "Will I be liable for international taxes, duties, and customs fees?",
    //         answer: "Royal Mail and USPS’s local country affiliates will charge the recipient any applicable duty, taxes, and/or brokerage fees C.O.D. All taxes, duties, and customs fees are the responsibility of the recipient."
    //     },
    //     {
    //         question: "Do you charge a consultation fee?",
    //         answer: "We charge our customers no consultation fee."
    //     },
    //     {
    //         question: "Do you ship overseas?",
    //         answer: "We can ship globally."
    //     },
    //     {
    //         question: "How do I place an order or re-order a product I’ve ordered in the past?",
    //         answer: "To place an order, add the items to your shopping cart, proceed to checkout, and follow the instructions provided. If you have ordered from us in the past, you can repeat a previous order directly on our website."
    //     },
    //     {
    //         question: "I haven’t received an email confirmation of my order, and it’s been over 24 hours. Where is it?",
    //         answer: "We aim to process all orders within 24 hours, after which you should receive your order confirmation. Check your spam folder as some ISPs may block our emails."
    //     },
    //     {
    //         question: "If you still haven’t received your order confirmation, contact us on +91-9999099538, and we can check on your order for you.",
    //         answer: ""
    //     },
    //     {
    //         question: "Why won’t you reply to my emails?",
    //         answer: "It is possible our email has been filtered into your spam or junk folder. It is also possible your ISP has blocked emails from us."
    //     },
    //     {
    //         question: "I’m having difficulty using the online order form. What do I do?",
    //         answer: "For assistance, you can either email us from the Contact Us page or call us toll-free at +91-9999099538."
    //     },
    //     {
    //         question: "What payment methods do you offer?",
    //         answer: "We accept all major payment cards, American Express, Apple and Android Pay. We are also proud to offer PayPal."
    //     },
    //     {
    //         question: "Seasonal and unavoidable delivery delays",
    //         answer: "Delays in delivery are most likely to happen during busy periods of the year, such as Christmas and Easter holidays. Unexpected events like weather problems may also cause delays."
    //     },
    //     {
    //         question: "Can my order be sent to the forwarder service address?",
    //         answer: "We are only responsible for sending out our orders to residential and workplace addresses and cannot be responsible for forwarder addressees."
    //     },
    // ];

    const faqs = Array.isArray(result?.FAQ) ? result.FAQ : [];
    
   console.log(faqs);
   

    return (
        <div className='max-w-5xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10'>
            <p className='font-bold text-2xl'>FAQ’s</p>
            <div className='h-[1px] w-full bg-gray-400'></div>
            <div className='flex flex-col gap-3'>
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
