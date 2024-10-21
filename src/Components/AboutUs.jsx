import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const AboutUs = () => {
    return (
        <div className='sm:max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 p-10 mt-10'>
            <div className='h-[1px] w-full bg-gray-400 opacity-40'></div>
            <div className="heading">
                <p className='font-bold text-[30px]'>ABOUT US</p>
                <div className='h-[1px] max-w-6xl mx-auto bg-gray-500'></div>
            </div>

            <div className="welcome mt-5">
                <p className='text-xl text-black'>Welcome to <NavLink to='https://www.ametheushealth.com' target='_blank'><span>ametheushealth.com</span></NavLink> a healthcare focused ecommerce venture from India to provide fair priced medicine in global arena.</p>
            </div>

            <div>
                <p className='text-xl text-black'><NavLink to='https://www.ametheushealth.com' target='_blank'><span>ametheushealth.com</span></NavLink> was born out of a desire to do things differently. We saw how traditional pharmacies were selling online and felt that we could create a much simpler, easier process that puts patients at the centre of the care. </p>
            </div>

            <div>
                <p className='text-xl text-black'>For the interests of patient safety, we limit the amount of some treatments that can be purchased by our patients over certain time periods. Our online pharmacy is not a marketplace to sell all
                    available medicines in the market and to confused the clients rather the philosophy applied here
                    focusing on supply of the best in the segments, most effective, accurate and minimum medicine required for a medication.</p>
            </div>

            <div>
                <p className='text-xl text-black'>ametheushealth.com and its affiliated supplier companies has collaborated with many well-known pharmaceuticals and medical device manufacturers to provide life saving medicines in a range of life saving drugs, anti-retroviral, anti-infective, anti-viral, anti-hypertensive, anti-diabetic, lipid lowering agents, anthelmintic, analgesic & antipyretic drugs and medical electrical devices. We solemnly promise that the medicines and medical devices we supply are produced in factories having proper certifications and international standard  compliance  and regulatory guidelines.</p>
            </div>

            <div>
                <p className='text-xl text-black'>We’re confident in the pricing of our treatments, we created the ametheushealth.com Price Promise. We guarantee that you’re getting most effective medicines at the best price for your treatment from our online pharmacy www.ametheushealth.com</p>
            </div>

            <div>
                <p className='text-xl text-black'>Back office operation is supported from Hong Kong only for the Global B2C market. If clients are buying from USA/EU then the delivery will be as per guideline of EU/USA drug policy.</p>
            </div>

            <div>
                <p className='text-xl text-black'>
                    We are committed to reach medicines to any body anywhere in the world overcoming all the hurdles. We offer numerous delivery options across our range of treatments, including:
                </p>
                <ul>
                    <li className='list-disc'>Shiprocket, Delhivary, DTDC</li>
                    <li className='list-disc'>Post Office Collection by EMS</li>
                    <li className='list-disc'>Special Delivery 4-7 Days Guaranteed by DHL, Fedex, UPS, Aramex</li>
                    <li className='list-disc'>Same Day or Next day delivery Possible with conditions.</li>
                </ul>
            </div>

            <div>
                <p>Please check shipment policy</p>
                <p>If you ever feel like you can’t find the right product for you on our site or you need a little more information or assistance please get in touch with the sales team.</p>

                <ul>
                    <li>
                        Call Us: <NavLink to="tel:+9999099538"><span>+91-9999099538</span></NavLink></li>
                    <li>Whatsapp Support: <NavLink to="whatsapp://send?phone=919999099538"><span>+91-9999099538</span></NavLink></li>
                    <li>Email: <NavLink to={`mailto:info@ametheushealth.com?subject=Subject&body=Body`}><span>info@ametheushealth.com</span></NavLink></li>
                </ul>

            </div>
        </div>
    )
}

export default AboutUs