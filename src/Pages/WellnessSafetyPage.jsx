import React from 'react'
import WellnessSafety from '../Components/WellnessSafety'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const WellnessSafetyPage = () => {
  return (
    <div>
      <header className="App-header">
        {/* <TopHeader />
        <Navbar /> */}
        <WellnessSafety />
        <div className="mt-20">
          <Footer />
        </div>
      </header>
    </div>
  )
}

export default WellnessSafetyPage