import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import TermsOfUse from '../Components/TermsOfUse'
import Footer from '../Components/Footer'

const TermsOfUsePage = () => {
    return (
        <div>
            <TopHeader />
            <Navbar />
            <TermsOfUse />
            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default TermsOfUsePage