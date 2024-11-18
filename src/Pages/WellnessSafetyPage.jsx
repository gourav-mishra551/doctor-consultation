import React from 'react'
import WellnessSafety from '../Components/WellnessSafety'
import Footer from '../Components/Footer'

const WellnessSafetyPage = () => {
  return (
    <div>
      <header className="App-header">
        <WellnessSafety />
        <div className="mt-20">
          <Footer />
        </div>
      </header>
    </div>
  )
}

export default WellnessSafetyPage