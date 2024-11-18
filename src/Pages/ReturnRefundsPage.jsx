import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import ReturnRefunds from '../Components/ReturnRefunds'
import Footer from '../Components/Footer'

const ReturnRefundsPage = () => {
  return (
    <div>
        {/* <TopHeader/>
        <Navbar/> */}
        <ReturnRefunds/>
        <div className='mt-20'>
            <Footer/>
        </div>
    </div>
  )
}

export default ReturnRefundsPage