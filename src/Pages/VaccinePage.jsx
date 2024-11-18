import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Vaccine from '../Components/Vaccine'
import Footer from '../Components/Footer'

const VaccinePage = () => {
    return (
        <div>
            <div className="App-header">
                {/* <TopHeader />
                <Navbar /> */}
                <Vaccine />
                <div className='mt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default VaccinePage