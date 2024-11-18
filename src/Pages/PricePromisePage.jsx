import React from 'react'
import PricePromise from '../Components/PricePromise'
import Footer from '../Components/Footer'

const PricePromisePage = () => {
    return (
        <div>
            <header className="App-header">
             
                <PricePromise />
                <div className="mt-20">
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default PricePromisePage