import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Icon from "../../../src/Assests/fav-icon.png"; // Importing the icon image
import AmethusLogo from "../../../src/Assests/ametheus-helath-logo.jpg"
const PDFGenerator = () => {
  const [signature, setSignature] = useState(null);

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
      gap: "10px",
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
      gap: "10px",
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
    // medicineTable: {
    //   marginTop: 10,
    //   border: "1px solid #000",
    //   borderWidth: 1,
    //   borderColor: "#ccc",
    //   borderRadius: 4,
    //   overflow: "hidden",
    // },
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
      flex: 2,
    },
    duration: {
      flex: 2,
    },
    instructions: {
      flex: 4,
      textAlign: "left",
    },
    heading: {
      fontSize: "8px",
    },
    data: {
      color: "#616A76",
    },
    logo: {
      width: 70,
      height: 70,
      marginRight: 10,
    },
    doctorName: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#0074D9",
    },
    qualification: {
      fontSize: 8,
      color: "#7F8C8D",
    },
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
    labelAddress: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-center",
      marginBottom: 10,
      alignItems: "center",
      width: "80%",
    },
    label: {
      fontSize: 10,
      fontWeight: 900,
      width: "auto",
      paddingRight: 5,
    },
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
      borderBottomWidth: 1,
      borderColor: "#000",
    },
    tableHeader: {
      fontWeight: "bold",
      backgroundColor: "#f5f5f5",
      borderBottomWidth: 1,
      display: "flex",
    },
    signatureSection: {
      marginTop: 30,
      display: "flex",
      flexDirection: "column",
    },
    signatureImage: {
      width: 100,
      height: 50,
      objectFit: "contain",
    },
    footer: {
      textAlign: "left",
      fontSize: 10,
      color: "#7F8C8D",
    },
    horizontalLine: {
      height: 2,
      backgroundColor: "#0074D9",
      marginVertical: 10,
      borderRadius: 1,
      marginTop: "5px",
    },
    watermark: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: 100,
      color: "#E0E0E0",
      opacity: 0.2,
      textAlign: "center",
      zIndex: -10,
    },
    Addr: {
      width: "100%",
    },
    WKG: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
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
      borderRightWidth: 0,
    },
  });
  

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setSignature(reader.result);
    reader.readAsDataURL(file);
  };

  const PrescriptionPDF = () => (
    <Document style={styles.main}>
      <Page style={styles.page}>


        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.doctorSection}>
            <Image style={styles.logo} src={Icon} />
            <View>
              <Text style={styles.doctorName}>Dr. Martin Jameson</Text>
              <Text style={styles.qualification}>
                MBBS, MD - General Physician
              </Text>
              <Text style={styles.footer}>
                Clinic Name | 24 Dummy Street Area | +12-345 678 9012
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {/* Patient Details Section */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <View style={styles.Name}>
              <Text style={styles.label}>Patient:</Text>
              <Text style={[styles.text, styles.data]}>Arman Ali</Text>
            </View>

            <View style={styles.Gender}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={[styles.text, styles.data]}>Male</Text>
            </View>
          </View>
          <View style={styles.labelRow}>
            {/* <View style={styles.Age}>
              <Text style={styles.label}>Age:</Text>
              <Text style={[styles.text, styles.data]}>45</Text>
            </View> */}

            <View style={styles.Mobile}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={[styles.text, styles.data]}>49839303922</Text>
            </View>

            <View style={styles.DOB}>
              <Text style={styles.label}>DOB:</Text>
              <Text style={[styles.text, styles.data]}>16-04-2003</Text>
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
              <Text style={[styles.labelHeight,styles.label]}>Height (in cms):</Text>
              <Text style={[styles.text, styles.data]}>175</Text>
            </View>

            <View style={styles.KG}>
              <Text style={[styles.labelKg,styles.label]}>Weight (in Kg):</Text>
              <Text style={[styles.text, styles.data]}>65</Text>
            </View>
          </View>

          <View style={styles.labelRow}>
            <View style={styles.BP}>
              <Text style={[styles.labelHeight,styles.label]}>Blood Presure (B.P):</Text>
              <Text style={[styles.text, styles.data]}>175</Text>
            </View>

            <View style={styles.BP}>
              <Text style={[styles.labelHeight,styles.label]}>Temperature:</Text>
              <Text style={[styles.text, styles.data]}>35</Text>
            </View>
          </View>
        </View>

        {/* Problems and Observations Section */}

        <View style={styles.medicineTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text
              style={[styles.tableCell, styles.medicineName, styles.heading]}
            >
             Complaint
            </Text>
            <Text style={[styles.tableCell, styles.frequency, styles.heading]}>
            Diagnose
            </Text>
            <Text style={[styles.tableCell, styles.duration, styles.heading,styles.lastCell]}>
              Advice
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.medicineName, styles.data]}>
              Chronic headache and fatigue.
            </Text>
            <Text style={[styles.tableCell, styles.frequency, styles.data]}>
              Blood pressure slightly elevated.
            </Text>
            <Text style={[styles.tableCell, styles.duration, styles.data,styles.lastCell]}>
              Blood pressure slightly elevated.
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.medicineName, styles.data]}>
              Chronic headache and fatigue.
            </Text>
            <Text style={[styles.tableCell, styles.frequency, styles.data]}>
              Blood pressure slightly elevated.
            </Text>
            <Text style={[styles.tableCell, styles.duration, styles.data,styles.lastCell]}>
              Blood pressure slightly elevated.
            </Text>
          </View>
        </View>

        {/* Medicines Section */}
        <View style={styles.medicineTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.medicineName]}>
              Medicine
            </Text>
            <Text style={[styles.tableCell, styles.frequency]}>Frequency</Text>
            <Text style={[styles.tableCell, styles.duration]}>Duration</Text>
            <Text style={[styles.tableCell, styles.instructions]}>
              Instructions
            </Text>
            <Text style={[styles.tableCell, styles.instructions]}>
              When
            </Text>
            <Text style={[styles.tableCell, styles.instructions,styles.lastCell]}>
              Dose
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.medicineName, styles.data]}>
              Paracetamol
            </Text>
            <Text style={[styles.tableCell, styles.frequency, styles.data]}>
              2 times a day
            </Text>
            <Text style={[styles.tableCell, styles.duration, styles.data]}>
              5 days
            </Text>
            <Text style={[styles.tableCell, styles.instructions, styles.data]}>
              Pain relief To create a table-like UI for Problems, Observations,
              
            </Text>

            <Text style={[styles.tableCell, styles.instructions, styles.data]}>
              morning
            </Text>

            <Text style={[styles.tableCell, styles.instructions, styles.data,styles.lastCell]}>
            1-0-1
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.medicineName, styles.data]}>
              Dolo
            </Text>
            <Text style={[styles.tableCell, styles.frequency, styles.data]}>
              7 times a day
            </Text>
            <Text style={[styles.tableCell, styles.duration, styles.data]}>
              5 days
            </Text>
            <Text style={[styles.tableCell, styles.instructions, styles.data]}>
              sajdfadhsdfuidh
            </Text>

            <Text style={[styles.tableCell, styles.instructions, styles.data]}>
              morning
            </Text>

            <Text style={[styles.tableCell, styles.instructions, styles.data,styles.lastCell]}>
            1-0-1
            </Text>
          </View>
        </View>


        <Image  src={AmethusLogo} />
        {/* RX Section */}
        {/* <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 40, color: "#0074D9", fontWeight: "bold" }}>
            Rx
          </Text>
        </View> */}

        {/* Signature Section */}
        {/* <View style={styles.signatureSection}>
          {signature && <Image style={styles.signatureImage} src={signature} />}
          <Text>Signature:</Text>
        </View> */}

        {/* Footer */}
      </Page>
    </Document>
  );

  return (
    <div className="mt-6">
      {/* Signature Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Doctor's Stamp/Signature
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleSignatureUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      {/* PDF Download Link */}
      <PDFDownloadLink
        document={<PrescriptionPDF />}
        fileName="Medical_Prescription.pdf"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFGenerator;
