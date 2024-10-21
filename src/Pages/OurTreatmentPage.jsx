import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import OurTreatment from '../Components/OurTreatment'
import Footer from '../Components/Footer'

const OurTreatmentPage = () => {
    return (
        <div>
            <header className="App-header">
                <TopHeader />
                <Navbar />
                <OurTreatment />
                <div className="mt-20">
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default OurTreatmentPage