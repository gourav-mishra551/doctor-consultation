import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import PurchaseTermsCondtions from '../Components/PurchaseTermsCondtions'
import Footer from '../Components/Footer'

const PurchaseTermsCondtionsPage = () => {
    return (
        <div>
            <TopHeader />
            <Navbar />
            <PurchaseTermsCondtions />
            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default PurchaseTermsCondtionsPage