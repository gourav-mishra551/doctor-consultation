import React from 'react'
import FillRfqForm from '../Components/FillRfqForm'
import Footer from '../Components/Footer'

const FillRfqFormPage = () => {
    return (
        <div>
            <header className='App-header'>
                <FillRfqForm />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default FillRfqFormPage