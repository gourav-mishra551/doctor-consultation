import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import SupportCenter from '../Components/SupportCenter'
import Footer from '../Components/Footer'

const SupportCenterPage = () => {
    return (
        <div>
            <header className='App-header'>
                <TopHeader />
                <Navbar />
                <SupportCenter />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default SupportCenterPage