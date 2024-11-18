import React from 'react'
import Covid19Drugs from '../Components/Covid19Drugs'
import Footer from '../Components/Footer'

const Covid19DrugsPage = () => {
    return (
        <div>
            <header className='App-header'>
             
                <Covid19Drugs />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default Covid19DrugsPage