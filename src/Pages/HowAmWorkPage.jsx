import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import HowAmWork from '../Components/HowAmWork'
import Footer from '../Components/Footer'

const HowAmWorkPage = () => {
    return (
        <div>
            <TopHeader />
            <Navbar />
            <HowAmWork />
            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default HowAmWorkPage