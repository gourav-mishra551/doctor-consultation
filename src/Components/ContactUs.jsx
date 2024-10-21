import React from 'react'
import { NavLink } from 'react-router-dom'

const ContactUs = () => {
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 px-10 sm:mt-10'>

            <div className='sm:block hidden h-[1px] w-full bg-gray-400 opacity-40'></div>

            <div className='sm:mt-10 mt-5'>
                <p className='text-3xl text-black font-bold sm:mb-2'>CONTACT US</p>
                <div className='h-[1px] max-w-6xl mx-auto bg-gray-500 mt-3'></div>
            </div>

            <div>
                <NavLink to="https://www.ametheushealth.com" target="_blank">
                    <p className='font-bold text-xl'>www.ametheushealth.com</p>
                </NavLink>
            </div>

            <div>
                <p className='text-xl '>Powered by Ametheus Holdings Pvt Ltd
                    Registered Address: BlackTiger Corporation Limited, 508, Rise Commercial Building,
                    5-11 Granville Circuit, T.S.T. Kowloon, Hong Kong.</p>
            </div>

            <div>
                <p className='text-xl'>If you ever feel like you can’t find the right product for you on our site or you need a little more information or assistance please get in touch with the sales team.</p>
            </div>

            <div>
                <ul>
                    <li >Call Us on mobile: <NavLink to="tel:+9999099538"><span> +91-9999099538</span></NavLink></li>
                    <li>Whatsapp Support: <NavLink to="whatsapp://send?phone=919999099538">+91-9999099538</NavLink> </li>
                    <li>Customer Care:
                        <span> <NavLink to="tel:+9990032288"> +91-9990032288</NavLink></span>
                        <span><NavLink to='tel:+9990045588'>+91-9990045588</NavLink></span>
                    </li>
                    <li>Email: <NavLink to={`mailto:info@ametheushealth.com?subject=Subject&body=Body`}>info@ametheushealth.com</NavLink></li>
                    <li>Twitter Support: <NavLink to='https://twitter.com/ametheushealth' target='_blank'>
                         www.twitter.com/ametheushealth
                    </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ContactUs