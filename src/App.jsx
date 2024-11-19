import "./App.css";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import DoctorForm from "./Components/DoctorForm";
import Categories from "./Components/Categories";
import UserProfile from "./Components/UserProfile";
import About from "./Pages/About";
import ContactPage from "./Pages/ContactPage";
import DrProfilePage from "./Pages/DrProfilePage";
import DrIndividualProfilePage from "./Pages/DrIndividualProfilePage";

import DrVerifyOtp from "./Components/DrVerifyOtp";
import BrandAmPage from "./Pages/BrandAmPage";
import WhyWeDiffPage from "./Pages/WhyWeDiffPage";
import WellnessSafetyPage from "./Pages/WellnessSafetyPage";
import PricePromisePage from "./Pages/PricePromisePage";
import OurTreatmentPage from "./Pages/OurTreatmentPage";
import DeliveryPage from "./Pages/DeliveryPage";
import HowAmWorkPage from "./Pages/HowAmWorkPage";
import PurchaseTermsCondtionsPage from "./Pages/PurchaseTermsCondtionsPage";
import ReturnRefundsPage from "./Pages/ReturnRefundsPage";
import PrivacyPage from "./Pages/PrivacyPage";
import TermsOfUsePage from "./Pages/TermsOfUsePage";
import ShippingInfoPage from "./Pages/ShippingInfoPage";
import SupportCenterPage from "./Pages/SupportCenterPage";
import FillRfqFormPage from "./Pages/FillRfqFormPage";

import DisclaimerPage from "./Pages/DisclaimerPage";
import Covid19DrugsPage from "./Pages/Covid19DrugsPage";
import VaccinePage from "./Pages/VaccinePage";
import DataFillingForm from "./Components/DataFillingForm";
import HowItWorks from "./Components/HowItWorks";

import CategoriesDetails from "./Components/CategoriesDetails";
import DRProfileShow from "./Components/DRProfileShow";
import DrAppointmentCreation from "./Components/DrAppoinmentCreation";
import FirstQuestion from "./Pages/AppointmentBooking/FirstQuestion";
import NewPatient from "./Pages/AppointmentBooking/NewPatient/NewPatient";
import Login from "./Components/Login";

import DrExam from "./Components/DrExam";
import ProfilePage from "./Pages/ProfilePage";
import PrescriptionMakerPage from "./Pages/PrescriptionMakerPage";
import EditProfilePage from "./Pages/EditProfilePage";
import OutSideIndia from "./Pages/AppointmentBooking/NewPatient/OutSideIndia/OutSideIndia";
import ReturningPatient from "./Pages/AppointmentBooking/ReturningPatient/ReturningPatient";
import ConsultwithLastDoctor from "./Pages/AppointmentBooking/ReturningPatient/ConsultwithLast/ConsultwithLastDoctor";
import ConsultwithNewDoctor from "./Pages/AppointmentBooking/ReturningPatient/ConsultwithNew/ConsultwithNewDoctor";

import InsideIndia from "./Pages/AppointmentBooking/NewPatient/InsideIndia/InsideIndia";
import BookingSlot from "./Pages/BookingSlot/BookingSlot";
import Navbar from "./Components/Navbar";
import TopHeader from "./Components/TopHeader";

function App() {
  const location = useLocation();

  const hideNavbar = ["/auth","/login", "/signup"].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <TopHeader />}
      {!hideNavbar && <Navbar />}
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* pending */}
          <Route path="/doctor-slots-generation" element={<DrExam />} />

          <Route path="/auth" element={<Login />} />
          <Route path="/doctor-onboarding-form" element={<DoctorForm />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/CategoriesDetails/:id"
            element={<CategoriesDetails />}
          />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/drs-profile" element={<DrProfilePage />} />
          <Route path="/BookingSlot/:id" element={<BookingSlot />} />
          <Route path="/dr-indi/:id" element={<DrIndividualProfilePage />} />
          <Route
            path="/DrAppointmentCreation"
            element={<DrAppointmentCreation />}
          />
          {/* linking of this page is not done */}
          <Route path="/DRProfileShow" element={<DRProfileShow />} />
          <Route path="/dr-otp" element={<DrVerifyOtp />} />

          {/* static pages */}
          <Route path="/brand-ametheus" element={<BrandAmPage />} />
          <Route path="/why-we-are-different" element={<WhyWeDiffPage />} />
          <Route path="/wellness-and-safety" element={<WellnessSafetyPage />} />
          <Route path="/price-promise" element={<PricePromisePage />} />
          <Route path="/our-treatments/" element={<OurTreatmentPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/how-amatheus-work" element={<HowAmWorkPage />} />
          <Route
            path="/purchase-terms-conditions/"
            element={<PurchaseTermsCondtionsPage />}
          />
          <Route path="/return-refunds/" element={<ReturnRefundsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms-of-use/" element={<TermsOfUsePage />} />
          <Route path="/shipping-information/" element={<ShippingInfoPage />} />
          <Route path="/support-center" element={<SupportCenterPage />} />
          <Route path="/request-for-quote/" element={<FillRfqFormPage />} />
          <Route path="/disclaimer/" element={<DisclaimerPage />} />
          <Route path="/covid-19-drug/" element={<Covid19DrugsPage />} />
          <Route path="/vaccine/" element={<VaccinePage />} />
          <Route path="/data-filling-form" element={<DataFillingForm />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* static page end */}

          <Route path="/appointments" element={<FirstQuestion />} />
          <Route path="/appointments/location" element={<NewPatient />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/prescription-maker"
            element={<PrescriptionMakerPage />}
          />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/appointment/inside-india" element={<InsideIndia />} />
          <Route path="/OutSideIndia" element={<OutSideIndia />} />
          <Route path="/ReturningPatientPage" element={<ReturningPatient />} />
          <Route path="/ConsultWithLastDoctor" element={<ConsultwithLastDoctor />} />
          <Route path="/ConsultwithNewDoctor" element={<ConsultwithNewDoctor />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
