import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import PricePromise from '../Components/PricePromise'
import Footer from '../Components/Footer'

const PricePromisePage = () => {
    return (
        <div>
            <header className="App-header">
                <TopHeader />
                <Navbar />
                <PricePromise />
                <div className="mt-20">
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default PricePromisePage