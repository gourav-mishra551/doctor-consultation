import Headers from "../Components/Headers";
import Footer from "../Components/Footer";
import HowItWorks from "../Components/HowItWorks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MegaMenu from "../Components/MegaMenu";
import { useState } from "react";
import CategoriesHome from "../Components/CategoriesHome/CategoriesHome";
import WhyChooseUs from "../Components/whyChooseUs/WhyChooseUs";
import TestimonialSection from "../Components/Testimonial/Testimonial";
const Home = () => {
  const [MegaMenubtn, setMegaMenubtn] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Disable default arrows
  };

  return (
    <div>
      <header className="App-header">
        <Headers />

        <div className="py-10">
          {/* <Categories /> */}
          <CategoriesHome />
        </div>
        <WhyChooseUs />
        <div className="py-10 bg-gray-50">
          <HowItWorks />
        </div>

        <div className="my-5">
          <TestimonialSection />
        </div>
        {/* appointment form */}

        
        <div >
          <Footer />
        </div>
      </header>
    </div>
  );
};

export default Home;
