import React from 'react'
import TopHeader from './TopHeader'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactUs from './ContactUs'

const ContactPage = () => {
    return (
        <div>
            <TopHeader />
            <Navbar />
            <ContactUs />

            <div className='mt-10'>
                <Footer />
            </div>

        </div>
    )
}

export default ContactPage