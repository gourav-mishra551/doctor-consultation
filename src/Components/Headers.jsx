
import Categories from "./Categories";




const Headers = () => {


  return (
    <>
      <div className="background bg-teal-100 -z-10">
        <div className="flex sm:flex-row flex-col sm:w-[90vw] mx-auto " >


          <div className="left p-5 flex-col justify-center relative xl:container ">

            <h1 className="sm:mx-auto sm:mt-[70px] sm:w-10/12 md:w-2/3 font-[700]  sm:text-6xl text-3xl lg:w-auto lg:text-left text-[#1c8e81]">
              Your Partner in <br />
              Health and Wellness
            </h1>

            <div className="relative mt-8 md:mt-12 space-y-8 text-center sm:ml-5 font-semibold">
              <p className="sm:text-2xl  text-justify">
                We are committed to providing you with the best medical and
                healthcare services to help you live healthier and happier.
              </p>
            </div>
          </div>

          <div className="right">
            <img
              className="relative w-full sm:w-[100vw] sm:h-[80vh]"
              src="./hero_img.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
