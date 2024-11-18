import React from 'react'
import Vaccine from '../Components/Vaccine'
import Footer from '../Components/Footer'

const VaccinePage = () => {
    return (
        <div>
            <div className="App-header">
           
                <Vaccine />
                <div className='mt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default VaccinePage