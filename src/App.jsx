import "./App.css";
import AuthRoute from "./Components/Auth/AuthRoute";
import Home from "./Pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import DoctorForm from "./Components/DoctorForm";
import Categories from "./Components/Categories";
import UserProfile from "./Components/UserProfile";
import About from "./Pages/About";
import ContactPage from "./Pages/ContactPage";
import DrProfilePage from "./Pages/DrProfilePage";
import DrIndividualProfilePage from "./Pages/DrIndividualProfilePage";
import Calendar from "./Components/Calender";
import FaqPage from "./Pages/FaqPage";
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
import HowItWorks from "./Components/HowItWorks";
import CategoriesDetails from "./Components/CategoriesDetails";
import DRProfileShow from "./Components/DRProfileShow";
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

import CategoriesHome from "./Components/CategoriesHome/CategoriesHome";
import InsideIndia from "./Pages/AppointmentBooking/NewPatient/InsideIndia/InsideIndia";
import BookingSlot from "./Pages/BookingSlot/BookingSlot";
import Navbar from "./Components/Navbar";
import TopHeader from "./Components/TopHeader";
import VideoCallApp from "./features/VideoCall/VideoCallApp";
import CreateSlotsByDr from "./Components/CreateSlotsByDr/CreateSlotsByDr";
import AllSlots from "./Components/AllSlots/AllSlots";

import CreateMeetingPage from "./features/VideoCall/CreateMeetingPage";
import JoinMeetingPage from "./features/VideoCall/JoinMeetingPage";
import Otp from "./Pages/Otp/Otp";
import PdfGeneratorPrescription from "./Components/PdfGeneratorPrescription/PdfGeneratorPrescription";
import PDFGenerator from "./Components/presception/Prescription";
import BookingDetails from "./Components/BookingDetails/BookingDetails";
import UserBookingDetails from "./Components/UserBookingDetails/UserBookingDetails";
import AlphaPrescription from "./Components/AlphaPrescription/AlphaPrescription";
import PackingList from "./Components/AlphaPrescription/PackingList";
import AlphaComercial from "./Components/AlphaPrescription/AlphaComercial";
import CommercialInvoice from "./Components/AlphaPrescription/commercialInvoice";
import Proforma from "./Components/AlphaPrescription/Proforma";
import SoftCorporate from "./Components/AlphaPrescription/SoftCorporate";
import CommercialInvoicePharma from "./Components/AlphaPrescription/CommercialInvoicePharma";

function App() {
  const location = useLocation();

  const hideNavbar = ["/login", "/signup", "/auth"].includes(location.pathname);
  return (
    <div className="App">
      {!hideNavbar && <TopHeader />}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/doctor-slots-generation"
          element={<AuthRoute element={DrExam} />}
        />
        <Route path="/auth" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route
          path="/doctor-onboarding-form"
          element={<AuthRoute element={DoctorForm} />}
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories-details/:id" element={<CategoriesDetails />} />
        <Route path="/category-home" element={<CategoriesHome />} />
        <Route
          path="/user-profile"
          element={<AuthRoute element={UserProfile} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/all-doctors" element={<DrProfilePage />} />
        <Route path="/booking-slot/:id" element={<BookingSlot />} />
        <Route
          path="/doctors-individual-profile/:id"
          element={<DrIndividualProfilePage />}
        />

        <Route
          path="/dr-profile-show"
          element={<AuthRoute element={DRProfileShow} />}
        />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/dr-otp" element={<DrVerifyOtp />} />
        <Route path="/brand-ametheus" element={<BrandAmPage />} />
        <Route path="/why-we-are-different" element={<WhyWeDiffPage />} />
        <Route path="/wellness-and-safety" element={<WellnessSafetyPage />} />
        <Route path="/price-promise" element={<PricePromisePage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/how-amatheus-work" element={<HowAmWorkPage />} />
        <Route
          path="/purchase-terms-conditions/"
          element={<PurchaseTermsCondtionsPage />}
        />
        <Route path="/return-refunds" element={<ReturnRefundsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms-of-use/" element={<TermsOfUsePage />} />
        <Route path="/shipping-information/" element={<ShippingInfoPage />} />
        <Route path="/support-center" element={<SupportCenterPage />} />
        <Route path="/request-for-quote/" element={<FillRfqFormPage />} />
        <Route path="/disclaimer/" element={<DisclaimerPage />} />
        <Route path="/covid-19-drug/" element={<Covid19DrugsPage />} />
        <Route path="/vaccine/" element={<VaccinePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/appointments" element={<FirstQuestion />} />
        <Route path="/appointments/location" element={<NewPatient />} />
        <Route path="/profile" element={<AuthRoute element={ProfilePage} />} />
        <Route
          path="/prescription-maker/:pid"
          element={<AuthRoute element={PrescriptionMakerPage} />}
        />

        <Route
          path="/edit-profile"
          element={<AuthRoute element={EditProfilePage} />}
        />
        <Route path="/appointment/inside-india" element={<InsideIndia />} />
        <Route path="/out-side-india" element={<OutSideIndia />} />
        <Route path="/returning-patient-page" element={<ReturningPatient />} />
        <Route
          path="/consult-with-last-doctor"
          element={<ConsultwithLastDoctor />}
        />
        <Route
          path="/consult-with-new-doctor"
          element={<ConsultwithNewDoctor />}
        />
        <Route
          path="/video-call/meeting-link-generation"
          element={<AuthRoute element={CreateMeetingPage} />}
        />
        <Route path="/video-call/join" element={<AuthRoute element={JoinMeetingPage} />} />
        <Route path="/slots-creation" element={<CreateSlotsByDr />} />
        <Route path="/pdf-genrate" element={<PdfGeneratorPrescription />} />
        <Route path="/prescription" element={<PDFGenerator />} />
        <Route path="/booking-details/:bid" element={<BookingDetails />} />
        <Route
          path="/user-booking-details/:ubid"
          element={<UserBookingDetails />}
        />
        
        <Route path="/alpha-prescription" element={<AlphaPrescription/>}/>
        <Route path="/alpha-packing-list" element={<PackingList/>}/>
        <Route path="/alpha-commercial-invoice" element={<AlphaComercial/>}/>
        <Route path="/commercial-invoice-goods" element={<CommercialInvoice/>}/>
        <Route path="/aalphaa-proforma-invoice" element={<Proforma/>}/>
        <Route path="/Soft-corporate" element={<SoftCorporate/>}/>
        <Route path="/commercial-invoice-pharma" element={<CommercialInvoicePharma/>}/>
      </Routes>
    </div>
  );
}

export default App;
