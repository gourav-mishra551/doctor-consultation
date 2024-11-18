import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ContactUs from '../Components/ContactUs'

const ContactPage = () => {
    return (
        <div>
            {/* <TopHeader />
            <Navbar /> */}
            <ContactUs />

            <div className='mt-10'>
                <Footer />
            </div>

        </div>
    )
}

export default ContactPage