import React, { useEffect } from 'react'
import AboutUs from '../Components/AboutUs'
import Footer from '../Components/Footer'

const About = () => {
    useEffect(()=>{
        window.scroll(0,0)
    })
    return (
        <div>
          
            <AboutUs />
            <div className="mt-10">
                <Footer />
            </div>
        </div>
    )
}

export default About