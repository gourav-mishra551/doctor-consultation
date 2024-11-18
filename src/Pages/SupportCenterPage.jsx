import React from 'react'
import SupportCenter from '../Components/SupportCenter'
import Footer from '../Components/Footer'

const SupportCenterPage = () => {
    return (
        <div>
            <header className='App-header'>
              
                <SupportCenter />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default SupportCenterPage