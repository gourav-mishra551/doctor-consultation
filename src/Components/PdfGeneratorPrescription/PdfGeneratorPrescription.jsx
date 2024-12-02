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
    data: {
      color: "#616A76",
      padding: "4px",
    },
    doctorSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    medicineTable: {
      width: "100%",
      marginVertical: 10,
      borderWidth: 0,
      borderColor: "#ccc",
      borderRadius: 4,
      overflow: "hidden",
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    tableHeader: {
      backgroundColor: "#f5f5f5",
      fontWeight: "bold",
    },
    tableCell: {
      paddingHorizontal: 5,
      textAlign: "center",
    },
    medicineName: {
      flex: 2, // 20% width
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
      textAlign: "left",
    },
    signatureSection: {
      marginTop: 30,
      display: "flex",
      flexDirection: "column",
    },
    signatureImage: { width: 100, height: 50, objectFit: "contain" },
    footer: {
      textAlign: "center",
      marginTop: 30,
      fontSize: 12,
      color: "#7F8C8D",
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
        <View style={styles.medicineTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.medicineName]}>
              Problems
            </Text>
            <Text style={[styles.tableCell, styles.frequency]}>
              Observations
            </Text>
            <Text style={[styles.tableCell, styles.duration]}>Notes</Text>
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
              Medicine Name
            </Text>
            <Text style={[styles.tableCell, styles.frequency]}>Frequency</Text>
            <Text style={[styles.tableCell, styles.duration]}>Duration</Text>
            <Text style={[styles.tableCell, styles.instructions]}>
              Instructions
            </Text>
          </View>

          {medicineData.map((medicine, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableRow, styles.medicineName, styles.data]}>
                {medicine?.medicineName || "N/A"}
              </Text>
              <Text style={[styles.tableCell, styles.frequency, styles.data]}>
                {medicine?.frequency || "N/A"}
              </Text>
              <Text style={[styles.tableCell, styles.duration, styles.data]}>
                {medicine?.duration || "N/A"}
              </Text>
              <Text
                style={[styles.tableCell, styles.instructions, styles.data]}
              >
                {medicine?.instruction || "N/A"}
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
