import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "10px",
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
  },
  colSno: {
    width: "8%",
  },
  colDescription: {
    width: "42%",
  },
  colUnitPrice: {
    width: "12%",
  },
  colSGST: {
    width: "8%",
  },
  colCGST: {
    width: "8%",
  },
  colQuantity: {
    width: "10%",
  },
  colAmount: {
    width: "12%",
  },
  block: {
    border: "1px solid block",
    height: "100px",
    padding: "10px",
  },
});

// Static PDF Document
const ProformaDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Aalphaa</Text>
      <Text style={styles.subHeader}>Proforma Invoice</Text>
      <Text style={styles.subHeader}>PI No: 12345</Text>
      <Text style={styles.subHeader}>Date: 2024-12-13</Text>

      {/* Table */}
      <View style={[styles.table, { marginTop: 20 }]}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCol, styles.colSno]}>
            <Text style={styles.tableCell}>S No</Text>
          </View>
          <View style={[styles.tableCol, styles.colDescription]}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={[styles.tableCol, styles.colUnitPrice]}>
            <Text style={styles.tableCell}>Unit Price</Text>
          </View>
          <View style={[styles.tableCol, styles.colSGST]}>
            <Text style={styles.tableCell}>SGST</Text>
          </View>
          <View style={[styles.tableCol, styles.colCGST]}>
            <Text style={styles.tableCell}>CGST</Text>
          </View>
          <View style={[styles.tableCol, styles.colQuantity]}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={[styles.tableCol, styles.colAmount]}>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
        </View>

        {/* Static Table Rows */}
        {[1, 2, 3].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={[styles.tableCol, styles.colSno]}>
              <Text style={styles.tableCell}>{index + 1}</Text>
            </View>
            <View style={[styles.tableCol, styles.colDescription]}>
              <Text style={styles.tableCell}>Item {index + 1}</Text>
            </View>
            <View style={[styles.tableCol, styles.colUnitPrice]}>
              <Text style={styles.tableCell}>100</Text>
            </View>
            <View style={[styles.tableCol, styles.colSGST]}>
              <Text style={styles.tableCell}>9</Text>
            </View>
            <View style={[styles.tableCol, styles.colCGST]}>
              <Text style={styles.tableCell}>9</Text>
            </View>
            <View style={[styles.tableCol, styles.colQuantity]}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={[styles.tableCol, styles.colAmount]}>
              <Text style={styles.tableCell}>118</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Additional Information */}
      <Text style={styles.header}>Total: 1000</Text>
      <Text style={styles.subHeader}>Gross Total: 1200</Text>
      <Text style={styles.subHeader}>
        Gross Total In Word: One Thousand Two Hundred
      </Text>
      <Text style={styles.subHeader}>Advanced Received: 500</Text>
      <Text style={styles.subHeader}>Payment Due: 700</Text>

      <Text style={styles.header}>Terms and Conditions</Text>
      <Text style={[styles.subHeader, styles.block]}>
        These are the terms and conditions...
      </Text>

      <Text style={styles.header}>Seller’s Bank Information</Text>
      <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <View>
          <Text style={styles.subHeader}>Seller’s Name: John Doe</Text>
          <Text style={styles.subHeader}>Bank Coordinates: USA</Text>
          <Text style={styles.subHeader}>Beneficiary Name: John Doe Ltd.</Text>
          <Text style={styles.subHeader}>Account Number: 123456789</Text>
          <Text style={styles.subHeader}>Type of Account: Business</Text>
          <Text style={styles.subHeader}>Beneficiary Address: 1234 Elm St</Text>
        </View>

        <View>
          <Text style={styles.subHeader}>Receiving Bank: Bank of America</Text>
          <Text style={styles.subHeader}>Swift Code: BOFAUS3N</Text>
          <Text style={styles.subHeader}>IFSC Code: BOFA0000001</Text>
        </View>
      </View>
      <Text style={styles.header}>Buyer's Note For Internal use</Text>
      <Text style={styles.subHeader}>
      {`{buyerNote}`}
      </Text>
    </Page>
  </Document>
);

// Main Component
const Proforma = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <PDFDownloadLink
        document={<ProformaDocument />}
        fileName="Proforma_Invoice.pdf"
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          color: "#fff",
          backgroundColor: "#007BFF",
          borderRadius: "5px",
        }}
      >
        {({ loading }) =>
          loading ? "Preparing document..." : "Download Invoice"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Proforma;
