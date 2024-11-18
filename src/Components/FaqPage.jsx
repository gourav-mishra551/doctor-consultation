import React from 'react'
import TopHeader from './TopHeader'
import Navbar from './Navbar'
import Faq from './Faq'
import Footer from './Footer'

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