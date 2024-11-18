import React from 'react'
import Navbar from '../Components/Navbar'
import TopHeader from '../Components/TopHeader'
import ShippingInfo from '../Components/ShippingInfo'
import Footer from '../Components/Footer'

const ShippingInfoPage = () => {
    return (
        <div>
            <header className='App-header'>
                {/* <TopHeader />
                <Navbar /> */}
                <ShippingInfo />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default ShippingInfoPage