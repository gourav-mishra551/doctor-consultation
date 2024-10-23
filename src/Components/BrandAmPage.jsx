import React from 'react'
import BrandAmatheus from './BrandAmatheus'
import TopHeader from './TopHeader'
import Navbar from './Navbar'
import Footer from './Footer'

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