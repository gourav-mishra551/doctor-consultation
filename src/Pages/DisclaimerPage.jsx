import React from 'react'
import Disclaimer from '../Components/Disclaimer'
import Footer from '../Components/Footer'

const DisclaimerPage = () => {
    return (
        <div>
            <header className='App-header'>
            
                <Disclaimer />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default DisclaimerPage