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
    page: {
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
      padding: 20,
    },
    section: {
      marginBottom: 10, // Reduced margin to minimize space
      padding: 10,
      flexGrow: 1,
    },
    label: {
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 2, // Added margin to separate label from content
    },
    text: {
      fontSize: 10,
      marginBottom: 6, // Added bottom margin for better spacing between texts
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
  });

  const PrescriptionPDF = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Medical Prescription</Text>

        {/* Map through formData to display multiple entries */}
        {formData.map((data, index) => (
          <View key={index} style={styles.section}>
            {/* Patient Details */}
            <Text style={styles.label}>Problems:</Text>
            <Text style={styles.text}>{data?.problems || "Not available"}</Text>

            <Text style={styles.label}>Observations:</Text>
            <Text style={styles.text}>
              {data?.observations || "Not available"}
            </Text>

            {/* Doctor Details */}
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.text}>{data?.notes || "Not available"}</Text>
          </View>
        ))}

        {/* Map through medicineData */}
        {medicineData.map((medicine, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.label}>Medicine Name:</Text>
            <Text style={styles.text}>
              {medicine?.medicineName || "Not available"}
            </Text>

            <Text style={styles.label}>Frequency:</Text>
            <Text style={styles.text}>
              {medicine?.frequency || "Not available"}
            </Text>

            <Text style={styles.label}>Instruction:</Text>
            <Text style={styles.text}>
              {medicine?.instruction || "Not available"}
            </Text>

            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.text}>
              {medicine?.duration || "Not available"}
            </Text>
          </View>
        ))}
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
