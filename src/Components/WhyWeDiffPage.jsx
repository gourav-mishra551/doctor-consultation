import React from 'react'
import WhyWeDifferent from './WhyWeDifferent'
import TopHeader from './TopHeader'
import Footer from './Footer'
import Navbar from './Navbar'

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