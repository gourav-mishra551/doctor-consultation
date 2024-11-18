import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Faq from '../Components/Faq'
import Footer from '../Components/Footer'

const FaqPage = () => {
    return (
        <div>
            {/* <TopHeader />
            <Navbar /> */}
            <Faq />
            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default FaqPage