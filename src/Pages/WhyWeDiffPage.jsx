import React from 'react'
import WhyWeDifferent from '../Components/WhyWeDifferent'
import TopHeader from '../Components/TopHeader'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

const WhyWeDiffPage = () => {
    return (
        <div>
            <header className="App-header">
                <TopHeader />
                <Navbar />
                <WhyWeDifferent />
                <div className="mt-20">
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default WhyWeDiffPage