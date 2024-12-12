// Install @react-pdf/renderer before using this
// npm install @react-pdf/renderer

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  section: {
    flexDirection: "row", // Arranges children in a row
    justifyContent: "space-between", // Distributes space between elements
    alignItems: "center", // Aligns items vertically
    marginBottom: 10,
  },

  header: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 5,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#000",
    flex: 1,
    textAlign: "center",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    border:"1px solid black",
    marginTop: 20,  // Adjust margin as needed
  },
  leftColumn: {
    width: "45%",  // Adjust width as needed
    padding: 10,
  },
  rightColumn: {
    width: "45%",  // Adjust width as needed
    padding: 10,
  },
  Commercial: {
    flexDirection: "row", // Aligns children in a row
    alignItems: "flex-start", // Aligns items vertically
    marginBottom: 10,
    gap: "10px",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  signatureLine: {
    borderBottomWidth: 1,  // Create a signature line effect
    borderBottomColor: "#000",  // Color of the signature line
    marginVertical: 5,  // Space for the line
  },
  cellSL: {
    width: "5%",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
  },
  cellSmall: {
    width: "10%",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
  },
  cellLarge: {
    width: "20%",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
  },
  cellMedium: {
    width: "15%",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
  },
  twoColumnSection: {
    flexDirection: "column",
    justifyContent: "space-between",
  
  },
  column: {
    width: "100%",
    marginTop: 20, // Adjust the spacing between the blocks
    paddingLeft: "20px",
    paddingBottom: "10px",
  },
  firstcolumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20, // Adjust to add space between blocks
    border: "1px solid black",
  },
  verticalLine: {
    width: 2, // Width of the vertical line
    backgroundColor: "#000", // Color of the vertical line
    height: "100%", // Make the line span the full height of the container
    marginRight: "20px",
  },
  words:{
    border:"1px solid black",
    height:"30px",
    marginBottom:"10px",
    marginTop:"0px",
    flexDirection:"row",
    padding:"5px",
   display:"flex",
   gap:"10px"
  }
});

const CommercialInvoice = () => (
  <Document>
    <Page style={styles.page} size="A4">
      {/* Header Section */}
      <View style={styles.section}>
        <View style={styles.Commercial}>
          <View>
            <Text style={styles.headerText}>COMMERCIAL INVOICE</Text>
          </View>

          <View>
            <Text>No: INV-001, Dated: 2024-12-11</Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={styles.headerText}>
              Shipping Bill: SB-12345, Dated: 2024-12-10
            </Text>
          </View>{" "}
          <View>
            <Text style={styles.headerText}>
              AWB: AWB-67890, Dated: 2024-12-10
            </Text>
          </View>
        </View>
      </View>

      {/* Shipper and Consignee Details */}
      <View style={styles.section}>
        <Text>SHIPPER: ABC Exports</Text>
        <Text>Consignee: XYZ Imports</Text>
      </View>

      {/* Notify Party Section */}
      <View style={styles.section}>
        <Text>Notify Party 1: John Doe</Text>
        <Text>Buyer other than Consignee: Jane Smith</Text>
      </View>

      {/* Table Section */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>SL</Text>
          <Text style={styles.tableCell}>Marking</Text>
          <Text style={styles.tableCell}>DESCRIPTION</Text>
          <Text style={styles.tableCell}>HSN CODE</Text>
          <Text style={styles.tableCell}>PACKING</Text>
          <Text style={styles.tableCell}>QUANTITY</Text>
          <Text style={styles.tableCell}>USD RATE</Text>
          <Text style={styles.tableCell}>AMOUNT</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>01</Text>
          <Text style={styles.tableCell}>No Marking</Text>
          <Text style={styles.tableCell}>Electronic Item</Text>
          <Text style={styles.tableCell}>8471</Text>
          <Text style={styles.tableCell}>Box</Text>
          <Text style={styles.tableCell}>10</Text>
          <Text style={styles.tableCell}>100.00</Text>
          <Text style={styles.tableCell}>1000.00</Text>
        </View>
      </View>
       <View style={styles.words}>
       <Text>in Words:</Text>
        <Text>Buyer other than Consignee: Jane Smith</Text>
       </View>
      {/* Bank Coordinates */}
      <View style={styles.twoColumnSection}>
        {/* First Block */}
        <View style={styles.firstcolumn}>
          <View style={styles.column}>
            <Text>Bank Coordinates:</Text>
            <Text>Beneficiary Name: ABC Exports</Text>
            <Text>Account Number: 123456789</Text>
            <Text>Type of Account: Current</Text>
            <Text>Beneficiary Address: 123 Export Street, Export City</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.column}>
            <Text>Company Name: company_name</Text>
            <Text>Company Account Number: account_no_company</Text>
            <Text>Bank Name: company_bank_name</Text>
            <Text>Bank Address: company_bank_address</Text>
            <Text>IFSC Code: company_ifsc</Text>
            <Text>Swift Code: company_swift</Text>
          </View>
        </View>

        {/* Second Block */}
        <View style={styles.firstcolumn}>
          <View style={styles.column}>
            <Text>Receiving Bank:</Text>
            <Text>Swift Code: ABCDEF12</Text>
            <Text>IFSC Code: ABCD0001234</Text>
            <Text>Bank Name: Global Bank</Text>
            <Text>Bank Address: 456 Bank Avenue, Finance City</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.column}>
            <Text>CORRESPONDING BANK Details:</Text>
            <Text>Bank Name: cross_bank_name</Text>
            <Text>Account No: cross_acc_no</Text>
            <Text>Account No with the Central Bank: cross_acc_no</Text>
            <Text>Bank Identification Code: cross_id</Text>
            <Text>SWIFT CODE: cross_swift_code</Text>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.leftColumn}>
          <Text>Signed by:</Text>
          <View style={styles.signatureLine}></View>{" "}
          {/* For the signature line */}
          <Text>For: ABC Exports</Text>
        </View>

        {/* Vertical line between sections */}
        <View style={styles.verticalLine} />

        <View style={styles.rightColumn}>
          <Text>Comments:</Text>
          <Text>{"All payments are subject to terms and conditions."}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const AlphaComercial = () => (
  <div>
    <PDFDownloadLink
      document={<CommercialInvoice />}
      fileName="Commercial_Invoice.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Generating PDF..." : "Download Invoice"
      }
    </PDFDownloadLink>
  </div>
);

export default AlphaComercial;
