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
  const { formData, medicineData } = state || {};

  // Log the data to see if it's available
  //   useEffect(() => {
  //     console.log("State updated:", formData, medicineData);
  //   }, [state]);
  console.log("State updated:", formData, medicineData);

  // Early exit if no data is available
  if (!formData || !formData[0]) {
    return <Text>No form data available.</Text>;
  }

  // Create styles
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
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
    logo: { width: 50, height: 50, marginRight: 10 },
    doctorName: { fontSize: 20, fontWeight: "bold", color: "#0074D9" },
    qualification: { fontSize: 12, color: "#7F8C8D" },
    section: { marginBottom: 10 },
    labelRow: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    },
    label: { fontSize: 14, fontWeight: "bold", width: "30%" },
    text: {
      fontSize: 14,
      width: "70%",

      paddingLeft: 5,
    },
    notesSection: {
      marginBottom: 20,
      fontSize: 12,
    },
    medicineTable: {
      marginTop: 10,
      border: "1px solid #000",
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #000",
    },
    tableHeader: {
      fontWeight: "bold",
      backgroundColor: "#F0F0F0",
    },
    tableCell: {
      padding: 5,
      fontSize: 12,
      flex: 1,
      textAlign: "center",
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
              <Text style={styles.doctorName}>Dr. Martin Jameson</Text>
              <Text style={styles.qualification}>
                MBBS, MD - General Physician
              </Text>
            </View>
          </View>
          <Image style={styles.logo} src="https://via.placeholder.com/50" />
        </View>

        {/* Patient Details Section */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Patient:</Text>
            <Text style={styles.text}>Arman Ali</Text>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.text}>2024-11-29</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.text}>45</Text>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.text}>Male</Text>
          </View>
        </View>

        {/* Problems and Observations Section */}
        <View style={styles.notesSection}>
          <Text style={styles.label}>Problems:</Text>
          <Text style={styles.text}>Chronic headache and fatigue.</Text>
        </View>
        <View style={styles.notesSection}>
          <Text style={styles.label}>Observations:</Text>
          <Text style={styles.text}>Blood pressure slightly elevated.</Text>
        </View>
        <View style={styles.notesSection}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.text}>
            Recommend further evaluation for hypertension and stress.
          </Text>
        </View>

        {/* Medicines Section */}

        <View style={styles.medicineTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Medicine Name</Text>
            <Text style={styles.tableCell}>Frequency</Text>
            <Text style={styles.tableCell}>Duration</Text>
            <Text style={styles.tableCell}>Action</Text>
          </View>

          {medicineData.map((medicine, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {medicine.medicineName || "N/A"}
              </Text>
              <Text style={styles.tableCell}>
                {medicine.frequency || "N/A"}
              </Text>
              <Text style={styles.tableCell}>{medicine.duration || "N/A"}</Text>
              <Text style={styles.tableCell}>{medicine.action || "N/A"}</Text>
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
