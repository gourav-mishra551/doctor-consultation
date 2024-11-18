import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Delivery from '../Components/Delivery'
import Footer from '../Components/Footer'

const DeliveryPage = () => {
  return (
    <div>
        <header>
            {/* <TopHeader/>
            <Navbar/> */}
            <Delivery/>
            <div className='mt-20'>
                <Footer/>
            </div>
        </header>
    </div>
  )
}

export default DeliveryPage