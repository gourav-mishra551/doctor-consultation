import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Disclaimer from '../Components/Disclaimer'
import Footer from '../Components/Footer'

const DisclaimerPage = () => {
    return (
        <div>
            <header className='App-header'>
                {/* <TopHeader />
                <Navbar /> */}
                <Disclaimer />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default DisclaimerPage