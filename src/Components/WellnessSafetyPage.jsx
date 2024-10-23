import React from 'react'
import WellnessSafety from './WellnessSafety'
import TopHeader from './TopHeader'
import Navbar from './Navbar'
import Footer from './Footer'

const WellnessSafetyPage = () => {
  return (
    <div>
      <header className="App-header">
        <TopHeader />
        <Navbar />
        <WellnessSafety />
        <div className="mt-20">
          <Footer />
        </div>
      </header>
    </div>
  )
}

export default WellnessSafetyPage