import React from 'react'
import WellnessSafety from './WellnessSafety'
import Footer from './Footer'

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