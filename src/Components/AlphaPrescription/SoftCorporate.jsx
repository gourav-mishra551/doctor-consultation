// Install @react-pdf/renderer using `npm install @react-pdf/renderer`

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "blue",
  },
  title: {
    fontWeight: "bold",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f4f4f4",
    fontSize:"12px"
  },
  section: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  line: {
    fontSize: 12,
    marginBottom: 5,
  },
  body: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  table: {
    display: "table",
    width: "100%",

    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableCol: {
    border: "1px solid black",
    padding: 2,
    flex: 1,
  },
  tableCell: {
    fontSize: 10,
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingTop: 10,
  },
  descriptionCol: {
    border: "1px solid black",
    padding: 5,
    flex: 2,
  },
  container: {
    // padding: 10,
    backgroundColor: "#fff",
    marginTop:"10px",
    width:"100%"
  },
   label: {
    flex: 1,
    fontWeight: "bold",
    fontSize:"10px"
  },
  value: {
    flex: 2,
    fontSize:"10px"
  },
  signatureSection: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    height: 100,
  },
  signatureText: {
    fontWeight: "bold",
  },
  companyName: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#4A3AFF",
  },
  website: {
    fontWeight: "bold",
  },
});

// Create the PDF document
const SoftCorporateOffer = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{"{COMPANY_NAME}"}</Text>
      <Text style={[styles.title,{fontSize:"15px"}]} >Soft Corporate Offer (SCO)</Text>

      <View style={styles.section}>
        <Text style={styles.line}>
          Reference number / Date: {"{invoice_number}"}
        </Text>
        <Text style={styles.line}>To</Text>
        <Text style={styles.line}>The Purchase Department</Text>
        <Text style={styles.line}>Company name: {"{lc_company_name}"}</Text>
        <Text style={styles.line}>
          City: {"{city}"} Country: {"{country}"}
        </Text>
      </View>

      <Text style={styles.body}>
        Dear Sir,{"\n"}
        {"\n"}This Soft Corporate Offer outlines the initial terms provided by
        the Seller, paving the way for a formal agreement pending the Buyer's
        acceptance. It serves as a foundational document, with the potential to
        shape future arrangements beneficial to all involved parties. Here is
        the offer:
      </Text>

      <View style={styles.section}>
        <Text style={styles.line}>
          Country of Origin of goods: {"{country_of_origin_good}"}
        </Text>
        <Text style={styles.line}>
          Port of Loading: {"{loading_port_name}"}
        </Text>
        <Text style={styles.line}>
          Port of Discharge: {"{unloading_port_name}"}
        </Text>
        <Text style={styles.line}>
          Country of Final Destination: {"{country_of_final_destination}"}
        </Text>
        <Text style={styles.line}>
          Carriage by Air, Sea or Multimodal: {"{carriage_by}"}
        </Text>
      </View>

      {/* New table section */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, styles.tableCell]}>S No.</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>
            Marks & Nos. Container No.
          </Text>
          <Text style={[styles.tableCol, styles.tableCell]}>
            No. & Kind of Packages
          </Text>
          <Text style={[styles.descriptionCol, styles.tableCell]}>
            Description of Goods
          </Text>
          <Text style={[styles.tableCol, styles.tableCell]}>HSN Code</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>Quantity</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>
            Rate in USD/MT/Bag
          </Text>
          <Text style={[styles.tableCol, styles.tableCell]}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, styles.tableCell]}>{"{serial}"}</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>
            {"{container}"}
          </Text>
          <Text style={[styles.tableCol, styles.tableCell]}>{"{package}"}</Text>
          <Text style={[styles.descriptionCol, styles.tableCell]}>
            {"{description}"}
          </Text>
          <Text style={[styles.tableCol, styles.tableCell]}>{"{hsnCode}"}</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>
            {"{quantity}"}
          </Text>
          <Text style={[styles.tableCol, styles.tableCell]}>{"{rate}"}</Text>
          <Text style={[styles.tableCol, styles.tableCell]}>{"{amount}"}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          border: "1px solid black",
          height: "80px",
          padding: "10px",
        }}
      >
        <Text style={[styles.body]}>
          Amount Chargeable in Words: {"{amount_chargeable}"}
        </Text>
        {/* Vertical Line Divider */}
        <View
          style={{
            width: 1,
            backgroundColor: "black",
            height: "100%",
            marginHorizontal: 10,
          }}
        />

        <Text style={[styles.body]}>Value {`{value}`}</Text>
      </View>
      <Text
        style={[styles.body, { border: "1px solid black", padding: "10px" }]}
      >
        Terms of Delivery and Payment: {"{other_conditions}"}
        {"\n"}
        All Banking charges outside the Beneficiary’s Bank Including
        reimbursement charges would be in the {"{account_type}"}.
      </Text>

      <View style={styles.container}>
        {/* Beneficiary Bank Coordinates */}
        <View style={styles.table}>
          <Text style={styles.title}>Beneficiary BANK COORDINATES:</Text>

          {/* Table Rows */}
          <View style={styles.row}>
            <Text style={styles.label}>A/C Name:</Text>
            <Text style={styles.value}>{"{ac_name}"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bank Name:</Text>
            <Text style={styles.value}>{"{bank_name}"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address of the Bank:</Text>
            <Text style={styles.value}>{"{address_bank}"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Branch IFSC Code:</Text>
            <Text style={styles.value}>{"{branch}"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>A/C Number:</Text>
            <Text style={styles.value}>{"{account_number}"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Swift Code:</Text>
            <Text style={styles.value}>{"{consignee_bank_address}"}</Text>
          </View>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <Text style={styles.signatureText}>SIGNATURE AND DATE:</Text>
        </View>

        {/* Company Footer */}
        <View style={styles.footer}>
          <Text style={styles.companyName}>{"{company_name}"}</Text>
          <Text style={{fontSize:"10px",marginTop:"10px"}}>{"{company_address}"}</Text> 
          <Text style={{fontSize:"10px",marginTop:"10px"}}>Registration No: {"{company_registration_no}"}</Text>
           <Text style={{fontSize:"10px",marginTop:"10px"}}> GST: {"{gst_number}"}</Text> GST: {"{gst_number}"}
          
          
            <Text style={{fontSize:"10px",marginTop:"10px"}}>Ph: {"{company_telephone}"}</Text>
            <Text style={{fontSize:"10px",marginTop:"10px"}}>Email: {"{company_email}"} Website:{" "}</Text> 
            {/* <Text style={styles.website}>{"{company_website}"}</Text> */}
          
        </View>
      </View>
    </Page>
  </Document>
);

// Example Component
const SoftCorporate = () => {
  return (
    <div>
      <h1>Soft Corporate Offer Generator</h1>
      <PDFDownloadLink
        document={<SoftCorporateOffer />}
        fileName="SoftCorporateOffer.pdf"
      >
        {({ loading }) => (loading ? "Generating document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default SoftCorporate;
