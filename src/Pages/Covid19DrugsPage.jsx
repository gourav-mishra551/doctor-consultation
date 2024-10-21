import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Covid19Drugs from '../Components/Covid19Drugs'
import Footer from '../Components/Footer'

const Covid19DrugsPage = () => {
    return (
        <div>
            <header className='App-header'>
                <TopHeader />
                <Navbar />
                <Covid19Drugs />
                <div className='mt-20'>
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default Covid19DrugsPage