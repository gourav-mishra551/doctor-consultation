import React, { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import Icon from "../../../src/Assests/fav-icon.png";

const PdfGeneratorPrescription = () => {
  const { state } = useLocation();
  const { formData, medicineData, pdfData, bpData } = state || {};

  // Log the data to see if it's available
  //   useEffect(() => {
  //     console.log("State updated:", formData, medicineData);
  //   }, [state]);
  console.log("formData", formData);
  console.log("medicineData", medicineData);
  console.log("pdfdata", pdfData?.data);
  console.log("bpData", bpData);

  // Early exit if no data is available
  if (!formData || !formData[0]) {
    return <Text>No form data available.</Text>;
  }

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
        <View style={styles.header}>
          <View style={styles.doctorSection}>
            <Image style={styles.logo} src={Icon} />
            <View>
              <Text style={styles.doctorName}>
                Dr. {pdfData.data.userId.name}
              </Text>
              <Text style={styles.qualification}>
                MBBS, MD - General Physician
              </Text>
            </View>
          </View>
          <Image style={styles.logo} src="https://via.placeholder.com/50" />
        </View>

        {/* Patient Details Section */}
        {pdfData?.data?.patientDetails ? (
          <View style={styles.section}>
            <View style={styles.labelRow}>
              <View style={styles.Name}>
                <Text style={styles.label}>Patient:</Text>
                <Text style={[styles.text, styles.data]}>
                  {pdfData?.data?.patientDetails?.name}
                </Text>
              </View>

              <View style={styles.Gender}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={[styles.text, styles.data]}>
                  {pdfData?.data?.patientDetails?.gender}
                </Text>
              </View>
            </View>
            <View style={styles.labelDOBAddress}>
              <View style={styles.DOB}>
                <Text style={styles.label}>DOB:</Text>
                <Text style={[styles.text, styles.data]}>
                  {" "}
                  {pdfData?.data?.patientDetails?.dateOfBirth}
                </Text>
              </View>
              {pdfData?.data?.doctorId?.clinic_hospital_address &&
                pdfData.data.doctorId.clinic_hospital_address
                  .permanentAddress &&
                pdfData.data.doctorId.clinic_hospital_address.PinCode &&
                pdfData.data.doctorId.clinic_hospital_address.state && (
                  <View style={[styles.Address, styles.labelAddress]}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={[styles.text, styles.Addr, styles.data]}>
                      {
                        pdfData.data.doctorId.clinic_hospital_address
                          .permanentAddress
                      }
                      , {pdfData.data.doctorId.clinic_hospital_address.PinCode},{" "}
                      {pdfData.data.doctorId.clinic_hospital_address.state}
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
          {formData.map((form, index) => (
            <React.Fragment key={index}>
              {/* Table Header */}

              {/* Table Row */}
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, styles.medicineName, styles.data]}
                >
                  {form.problems || "N/A"}
                </Text>
                <Text style={[styles.tableCell, styles.frequency, styles.data]}>
                  {form.observations || "N/A"}
                </Text>
                <Text style={[styles.tableCell, styles.duration, styles.data]}>
                  {form.notes || "N/A"}
                </Text>
              </View>
            </React.Fragment>
          ))}
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
          {medicineData.map((medicine) => (
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
          ))}
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
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={<PrescriptionPDF />}
      fileName={`Prescription.pdf`}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  );
};

export default PdfGeneratorPrescription;
