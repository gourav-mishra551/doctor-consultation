import React from 'react'
import TopHeader from '../Components/TopHeader'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SubCategories from '../Components/SubCategories'

const SubCategoryPage = () => {
    return (
        <div>
            <header className='app-header'>
                {/* <TopHeader />
                <Navbar /> */}
                <SubCategories />
                <div className="mt-20">
                    <Footer />
                </div>
            </header>
        </div>
    )
}

export default SubCategoryPage