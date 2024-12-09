import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import Icon from "../../../src/Assests/fav-icon.png";
import companyLogo from "../../../src/Assests/ametheus-helath-logo.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const UserBookingDetails = () => {
  const [bookingDetailsData, setBookingDetailsData] = useState([]);
  const { ubid } = useParams();
  const { state } = useLocation();
  const [pdfBlob, setPdfBlob] = useState(null);
  const { formData, medicineData, pdfData, bpData } = state || {};

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const userBookingDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/history/${ubid}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setBookingDetailsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const convertTo12HourFormat = (time) => {
    if (!time) return ""; // Return an empty string if no time is provided
    const [hours, minutes] = time.split(":").map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format, handling 0 hours for 12 AM and 12 hours for 12 PM
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const convertToIST = (utcDate) => {
    if (!utcDate) return "--";
    const date = new Date(utcDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };

  function formatDateWithTodayOrTomorrow(dateString) {
    if (!dateString) return "N/A";

    const inputDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const isToday = inputDate.toDateString() === today.toDateString();
    const isTomorrow = inputDate.toDateString() === tomorrow.toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  useEffect(() => {
    userBookingDetails();
  }, []);

  //   pdf generation code and its style sheet starts here
  // Create styles
  const styles = StyleSheet.create({
    main: {
      border: "1px solid red",
    },
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: "Helvetica",
      position: "relative",
    },
    Name: {
      display: "flex",
      flexDirection: "row",
      gap: "10px", // Kept the most recent value
    },
    Gender: {
      display: "flex",
      flexDirection: "row",
      gap: "5px",
      marginRight: "75px",
    },
    DOB: {
      display: "flex",
      flexDirection: "row",
      textAlign: "left",
      marginRight: "100px",
    },
    Date: {
      display: "flex",
      flexDirection: "row",
      gap: "5px",
    },
    Age: {
      display: "flex",
      flexDirection: "row",
      gap: "20px",
    },
    Address: {
      display: "flex",
      flexDirection: "row",
      gap: "30px",
    },
    Mobile: {
      display: "flex",
      flexDirection: "row",
      gap: "15px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    doctorSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    medicineTable: {
      marginTop: 10, // Kept the most recent value
      border: "1px solid #000", // Kept the most recent value
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      overflow: "hidden",
    },
    tableCell: {
      paddingHorizontal: 5,
      textAlign: "left",
      borderRightWidth: 1,
      padding: 5,
      fontSize: 8,
      flex: 1,
      borderColor: "#000",
    },
    medicineName: {
      flex: 2,
    },
    frequency: {
      flex: 2, // 20% width
    },
    duration: {
      flex: 2, // 20% width
    },
    instructions: {
      flex: 4, // 40% width
      textAlign: "left", // Align text for better readability
    },
    heading: {
      fontSize: "8px",
    },
    data: {
      color: "#616A76",
    },
    logo: { width: 70, height: 70, marginRight: 10 },
    companyImage: { width: 200, marginRight: 10 },
    doctorName: { fontSize: 20, fontWeight: "bold", color: "#0074D9" },
    qualification: { fontSize: 8, color: "#7F8C8D" },
    section: {
      padding: 15,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      backgroundColor: "#f9f9f9",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    labelRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      gap: "0px",
      alignItems: "center",
    },
    labelDOBAddress: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      gap: "58px",
      alignItems: "center",
    },
    labelAddress: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-center",
      marginBottom: 10,
      alignItems: "center",
      width: "80%",
      gap: "10px",
    },
    label: { fontSize: 10, fontWeight: 900, width: "auto", paddingRight: 5 },
    labelKg: {
      fontSize: 14,
      fontWeight: 900,
      width: "40%",
      paddingRight: 5,
    },
    labelHeight: {
      fontSize: 14,
      fontWeight: 900,
      paddingRight: 5,
      width: "55%",
    },
    text: {
      fontSize: 10,
      width: "30%",
      paddingRight: "20px",
    },
    notesSection: {
      marginBottom: 20,
      fontSize: 12,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1, // Horizontal line between rows
      borderColor: "#000",
    },
    tableHeader: {
      fontWeight: "bold",
      backgroundColor: "#f5f5f5", // Kept the most recent value
      borderBottomWidth: 1, // Stronger line for header
      // borderColor: "#ccc",
      display: "flex",
    },
    signatureSection: {
      marginTop: 30,
      display: "flex",
      flexDirection: "column",
    },
    signatureImage: { width: 100, height: 50, objectFit: "contain" },
    footer: {
      textAlign: "left",
      fontSize: 10,
      color: "#7F8C8D",
    },
    horizontalLine: {
      height: 2,
      backgroundColor: "#0074D9", // Blue color
      marginVertical: 10,
      borderRadius: 1, // Smooth edges
      marginTop: "5px",
    },
    watermark: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: 100, // Increase font size for better visibility
      color: "#E0E0E0", // Slightly darker gray for better contrast
      opacity: 0.2, // Ensure transparency doesn't obscure content
      textAlign: "center",
      zIndex: -10, // Keep it behind all other elements
    },
    Addr: {
      width: "100%",
    },
    WKG: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center", // Align text vertically
    },
    KG: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      textAlign: "left",
      width: "100%",
      gap: "0px",
      marginLeft: "20px",
    },
    BP: {
      width: "50%",
      display: "flex",
      flexDirection: "row",
    },
    lastCell: {
      borderRightWidth: 0, // Remove the right border for the last cell in each row
    },
  });

  const PrescriptionPDF = () => (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles?.header}>
          <View style={styles?.doctorSection}>
            <Image style={styles?.logo} src={Icon} />
            <View>
              <Text style={styles.doctorName}>
                Dr. {bookingDetailsData?.data?.doctorId?.doctorUserDetails.name}
              </Text>

              {bookingDetailsData?.data?.doctorId?.qualifications?.map(
                (qualification) => (
                  <Text style={styles?.qualification}>
                    {qualification?.degree}
                  </Text>
                )
              )}
              <Text style={styles?.qualification}>
                Reg No- {bookingDetailsData?.data?.doctorId?.RegistrationNumber}
              </Text>
            </View>
          </View>
          <Image style={styles.logo} src="https://via.placeholder.com/50" />
        </View>

        {/* Patient Details Section */}
        {bookingDetailsData?.data?.patientDetails ? (
          <View style={styles?.section}>
            <View style={styles?.labelRow}>
              <View style={styles?.Name}>
                <Text style={styles?.label}>Patient:</Text>
                <Text style={[styles.text, styles.data]}>
                  {bookingDetailsData?.data?.patientDetails?.name}
                </Text>
              </View>

              <View style={styles.Gender}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={[styles.text, styles.data]}>
                  {bookingDetailsData?.data?.patientDetails?.gender}
                </Text>
              </View>
            </View>
            <View style={styles.labelDOBAddress}>
              <View style={styles.DOB}>
                <Text style={styles.label}>DOB:</Text>
                <Text style={[styles.text, styles.data]}>
                  {" "}
                  {bookingDetailsData?.data?.patientDetails?.dateOfBirth}
                </Text>
              </View>
              {bookingDetailsData?.data?.doctorId?.clinic_hospital_address &&
                bookingDetailsData.data.doctorId.clinic_hospital_address
                  .permanentAddress &&
                bookingDetailsData.data.doctorId.clinic_hospital_address
                  .PinCode &&
                bookingDetailsData.data.doctorId.clinic_hospital_address
                  .state && (
                  <View style={[styles.Address, styles.labelAddress]}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={[styles.text, styles.Addr, styles.data]}>
                      {
                        bookingDetailsData.data.doctorId.clinic_hospital_address
                          .permanentAddress
                      }
                      ,{" "}
                      {
                        bookingDetailsData.data.doctorId.clinic_hospital_address
                          .PinCode
                      }
                      ,{" "}
                      {
                        bookingDetailsData.data.doctorId.clinic_hospital_address
                          .state
                      }
                    </Text>
                  </View>
                )}
            </View>

            {/* <View style={styles.labelAddress}>
              
            </View> */}
            <View style={styles.labelRow}>
              <View style={styles.WKG}>
                <Text style={[styles.labelHeight, styles.label]}>
                  Height (in cms):
                </Text>
                <Text style={[styles.text, styles.data]}>
                  {bookingDetailsData?.data?.prescription?.bpData?.height}
                </Text>
              </View>

              <View style={styles.KG}>
                <Text style={[styles.labelKg, styles.label]}>
                  Weight (in Kg):
                </Text>
                <Text style={[styles.text, styles.data]}>
                  {bookingDetailsData?.data?.prescription?.bpData?.weight}
                </Text>
              </View>
            </View>

            <View style={styles.labelRow}>
              <View style={styles.BP}>
                <Text style={[styles.labelHeight, styles.label]}>
                  Blood Presure (B.P):
                </Text>
                <Text style={[styles.text, styles.data]}>
                  {" "}
                  {bookingDetailsData?.data?.prescription?.bpData?.bp}
                </Text>
              </View>

              <View style={styles.BP}>
                <Text style={[styles.labelHeight, styles.label]}>
                  Temperature:
                </Text>
                <Text style={[styles.text, styles.data]}>
                  {bookingDetailsData?.data?.prescription?.bpData?.temperature}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.labelRow}>
              <View style={styles.Name}>
                <Text style={styles.label}>Patient:</Text>
                <Text style={[styles.text, styles.data]}>
                  {pdfData?.data?.userPatientData?.name}
                </Text>
              </View>

              <View style={styles.Gender}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={[styles.text, styles.data]}>
                  {pdfData?.data?.userPatientData?.gender}
                </Text>
              </View>
            </View>
            <View style={styles.labelRow}>
              <View style={styles.DOB}>
                <Text style={styles.label}>DOB:</Text>
                <Text style={[styles.text, styles.data]}>
                  {pdfData?.data?.userPatientData?.dateOfBirth}
                </Text>
              </View>
            </View>

            <View style={styles.labelAddress}>
              <View style={styles.Address}>
                <Text style={styles.label}>Address:</Text>
                <Text style={[styles.text, styles.Addr, styles.data]}>
                  75/106 halsy road kanpur
                </Text>
              </View>
            </View>
            <View style={styles.labelRow}>
              <View style={styles.WKG}>
                <Text style={[styles.labelHeight, styles.label]}>
                  Height (in cms):
                </Text>
                <Text style={[styles.text, styles.data]}>{bpData?.height}</Text>
              </View>

              <View style={styles.KG}>
                <Text style={[styles.labelKg, styles.label]}>
                  Weight (in Kg):
                </Text>
                <Text style={[styles.text, styles.data]}>{bpData?.weight}</Text>
              </View>
            </View>

            <View style={styles.labelRow}>
              <View style={styles.BP}>
                <Text style={[styles.labelHeight, styles.label]}>
                  Blood Presure (B.P):
                </Text>
                <Text style={[styles.text, styles.data]}> {bpData?.bp}</Text>
              </View>

              <View style={styles.BP}>
                <Text style={[styles.labelHeight, styles.label]}>
                  Temperature:
                </Text>
                <Text style={[styles.text, styles.data]}>
                  {bpData?.temperature}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Problems and Observations Section */}
        <View style={styles.medicineTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.medicineName]}>
              Complaints
            </Text>
            <Text style={[styles.tableCell, styles.frequency]}>Diagnose</Text>
            <Text style={[styles.tableCell, styles.duration]}>Advice</Text>
          </View>
          {bookingDetailsData?.data?.prescription?.formData?.map(
            (form, index) => (
              <React.Fragment key={index}>
                {/* Table Header */}

                {/* Table Row */}
                <View style={styles.tableRow}>
                  <Text
                    style={[styles.tableCell, styles.medicineName, styles.data]}
                  >
                    {form.problems || "N/A"}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.frequency, styles.data]}
                  >
                    {form.observations || "N/A"}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.duration, styles.data]}
                  >
                    {form.notes || "N/A"}
                  </Text>
                </View>
              </React.Fragment>
            )
          )}
        </View>

        {/* Medicines Section */}
        <View style={styles.medicineTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.medicineName]}>
              Medicine
            </Text>
            <Text style={[styles.tableCell, styles.frequency]}>Dose</Text>
            <Text style={[styles.tableCell, styles.duration]}>Duration</Text>

            <Text style={[styles.tableCell, styles.instructions]}>When</Text>
            <Text
              style={[styles.tableCell, styles.instructions, styles.lastCell]}
            >
              Frequency
            </Text>
            <Text style={[styles.tableCell, styles.instructions]}>
              Instructions
            </Text>
          </View>
          {bookingDetailsData?.data?.prescription?.medicineData.map(
            (medicine) => (
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, styles.medicineName, styles.data]}
                >
                  {medicine.medicineName}
                </Text>
                <Text style={[styles.tableCell, styles.frequency, styles.data]}>
                  {medicine.frequency}
                </Text>
                <Text style={[styles.tableCell, styles.duration, styles.data]}>
                  {medicine.duration}
                </Text>

                <Text
                  style={[styles.tableCell, styles.instructions, styles.data]}
                >
                  {medicine.when}
                </Text>
                <Text
                  style={[styles.tableCell, styles.instructions, styles.data]}
                >
                  {medicine.dose}
                </Text>
                <Text
                  style={[styles.tableCell, styles.instructions, styles.data]}
                >
                  {medicine.instruction}
                </Text>
              </View>
            )
          )}
        </View>

        {/* RX Section */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 40, color: "#0074D9", fontWeight: "bold" }}>
            Rx
          </Text>
        </View>

        {/* Signature Section */}
        {/* <View style={styles.signatureSection}>
          <Text>Signature:</Text>
          {signature && <Image style={styles.signatureImage} src={signature} />}
        </View> */}

        {/* Footer */}
        <Text style={styles.footer}>
          Clinic Name | 24 Dummy Street Area | +12-345 678 9012
        </Text>

        <Image style={styles.companyImage} src={companyLogo} />
      </Page>
    </Document>
  );

  // Generate the PDF Blob
  const generatePdfBlob = async () => {
    const blob = await pdf(<PrescriptionPDF />).toBlob();
    setPdfBlob(blob);
  };

  // Function to upload the PDF
  const handleUploadPdf = async () => {
    if (!pdfBlob) {
      alert("No PDF to upload. Please generate the PDF first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("files", pdfBlob, "Prescription.pdf");
      formData.append("title", "Prescription Title"); // Example title
      formData.append("typeOfRecord", "Health Record"); // Example type
      formData.append("doctorName", "Dr. John Doe"); // Example doctor name
      formData.append("disease", "Hypertension"); // Example disease
      formData.append("firmName", "HealthCare Clinic"); // Example firm name
      formData.append("recordGeneratedDate", new Date().toISOString()); // Example date
      formData.append("additionalNotes", "This is a sample note."); // Example notes

      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/health-record`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );

      console.log("File and data uploaded successfully:", response.data);
      toast.success("PDF uploaded to Health Records successfully!");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Failed to upload the PDF.");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Doctor Details
        </h2>
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-5">
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">
              {bookingDetailsData?.data?.patientDetails.name}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">
              Reason of Appointment:
            </span>
            <span className="text-gray-800">
              {bookingDetailsData?.data?.patientDetails.reasonForAppointment}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">Gender:</span>
            <span className="text-gray-800">
              {bookingDetailsData?.data?.patientDetails.gender}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">Date of Birth:</span>
            <span className="text-gray-800">
              {bookingDetailsData?.data?.patientDetails.dateOfBirth}
            </span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto h-[1px] bg-gray-300 bg-opacity-80"></div>
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-5">
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">Start time:</span>
            <span className="text-gray-800">
              {convertTo12HourFormat(
                bookingDetailsData?.data?.specificSlotData.startTime
              )}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">End time:</span>
            <span className="text-gray-800">
              {convertTo12HourFormat(
                bookingDetailsData?.data?.specificSlotData.endTime
              )}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">Doctor Charge:</span>
            <span className="text-gray-800">
              ₹ {bookingDetailsData?.data?.specificSlotData.doctorCharge}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-gray-600">Consultation Date:</span>
            <span className="text-gray-800">
              {convertToIST(bookingDetailsData?.data?.availibileTimeSlotsData.selectDate)}
            </span>
          </div>
        </div>

        {/* Download prescription button */}
        <div className="flex gap-5">
          {/* Conditional Rendering for Prescription Data */}
          {bookingDetailsData?.data?.prescription &&
            (bookingDetailsData?.data?.prescription?.bpData.bp ||
              bookingDetailsData?.data?.prescription?.bpData.height ||
              bookingDetailsData?.data?.prescription?.bpData.weight ||
              bookingDetailsData?.data?.prescription?.bpData.temperature ||
              bookingDetailsData?.data?.prescription?.formData?.length > 0 ||
              bookingDetailsData?.data?.prescription?.medicineData?.length >
              0) && (
              <PDFDownloadLink
                document={<PrescriptionPDF />}
                fileName="Prescription.pdf"
                className="bg-blue-500 text-white mt-5 py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {({ loading, blob }) => {
                  if (blob && !pdfBlob) setPdfBlob(blob); // Save blob when it's available
                  return loading
                    ? "Loading Prescription..."
                    : "Download Prescription";
                }}
              </PDFDownloadLink>
            )}

          {/* Upload Button */}
          <div className="bg-[#00768A] hover:bg-[#1b545e] transition-all duration-300 ease-in-out flex justify-center items-center sm:max-w-[200px] rounded-md mt-5">
            <button onClick={handleUploadPdf} className="text-white px-2 py-1">
              Upload to Health Records
            </button>
          </div>
          {
            bookingDetailsData?.data?.roomId && (
              <Link to={`https://doctor-consultation.vercel.app/video-call/join?call_id=${bookingDetailsData?.data?.roomId}&call_type=default`}>
                <div className="bg-[#00768A] hover:bg-[#1b545e] transition-all duration-300 ease-in-out flex justify-center items-center sm:max-w-[200px] rounded-md mt-5">
                  <button className="text-white px-2 py-1">
                    Join Meeting
                  </button>
                </div>
              </Link>
            )
          }
        </div>
      </div>
    </>
  );
};

export default UserBookingDetails;
