import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import AboutUs from '../Components/AboutUs'
import Footer from '../Components/Footer'

const About = () => {
    return (
        <div>
            {/* <TopHeader />
            <Navbar /> */}
            <AboutUs />
            <div className="mt-10">
                <Footer />
            </div>
        </div>
    )
}

export default About