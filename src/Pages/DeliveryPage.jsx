import React from 'react'
import Delivery from '../Components/Delivery'
import Footer from '../Components/Footer'

const DeliveryPage = () => {
  return (
    <div>
        <header>
            <Delivery/>
            <div className='mt-20'>
                <Footer/>
            </div>
        </header>
    </div>
  )
}

export default DeliveryPage