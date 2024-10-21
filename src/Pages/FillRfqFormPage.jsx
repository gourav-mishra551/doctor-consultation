import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import FillRfqForm from '../Components/FillRfqForm'
import Footer from '../Components/Footer'

const FillRfqFormPage = () => {
    return (
        <div>
            <header className='App-header'>
                <TopHeader />
                <Navbar />
                <FillRfqForm />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default FillRfqFormPage