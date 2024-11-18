import React from 'react'
import ShippingInfo from '../Components/ShippingInfo'
import Footer from '../Components/Footer'

const ShippingInfoPage = () => {
    return (
        <div>
            <header className='App-header'>
      
                <ShippingInfo />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default ShippingInfoPage