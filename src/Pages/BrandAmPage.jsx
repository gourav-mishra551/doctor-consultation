import React from 'react'
import BrandAmatheus from '../Components/BrandAmatheus'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const BrandAmPage = () => {
    return (
        <div>
            <header className="App-header">
                <TopHeader />
                <Navbar />
                <BrandAmatheus/>
                <div className="mt-20">
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default BrandAmPage