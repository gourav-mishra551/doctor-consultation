import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  section: {
    border: "1px solid black",
    padding: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  column: {
    width: "48%",
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  tableCell: {
    padding: 5,
    borderRight: "1px solid black",
    flex: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#000",
    textAlign: "center", // Optional: Center the text
  },
  lastCell: {
    borderRightWidth: 0, // Remove border for the last cell in the row
  },
  tableCellHeader: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 10,
    border: "1px solid black",
    paddingTop: 5,
    flexDirection:"row",
    justifyContent:"space-between",
    padding:"5px",
    gap:"10px",
    width:"100%"
  },
  block1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
    alignItems: "flex-start",
  },
  header: {
    backgroundColor: "#f1f1f1", // Optional: Add background color for headers
  },
  horizontalLine: {
    
    // borderBottomWidth: 2,
    // marginVertical: 10,
    border:"1px solid black",
    height:"100%"
},
});

const PDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.block1}>
        <View>
          <Text>Company Name: {`{company_name}`}</Text>
        </View>

        <View>
          <Text>Registration No: {`{registration_no}`}</Text>
        </View>

        <View>
          <Text>GST No: {`{gst_no}`}</Text>
        </View>
      </View>

      <View style={styles.block1}>
        <View>
          <Text>Company Number: {`{company_number}`}</Text>
        </View>

        <View>
          <Text>Telephone No: {`{Telephone_no}`}</Text>
        </View>

        <View>
          <Text>Fax no.: {`{fax_no}`}</Text>
        </View>
      </View>
      {/* Invoice Title */}
      <Text
        style={{
          margin: "10px 0",
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Commercial Invoice (Goods)
      </Text>

      {/* Consignee and Buyer Details */}
      <View
        style={[
          styles.section,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        {/* Consignee Name & Address Section */}
        <View
          style={[
            styles.column,
            {
              flex: 1,
              marginRight: 5,
              borderRightWidth: 1,
              borderColor: "black", // Add vertical line
              paddingRight: 10,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingBottom: 2,
            }}
          >
            CONSIGNEE NAME & ADDRESS
          </Text>
          <Text>{`{consignee_name_address}`}</Text>
        </View>

        {/* Buyer (if other than consignee) Section */}
        <View
          style={[
            styles.column,
            {
              flex: 1,
              marginHorizontal: 5,
              borderRightWidth: 1,
              borderColor: "black", // Add vertical line
              paddingRight: 10,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingBottom: 2,
            }}
          >
            BUYER (IF OTHER THAN CONSIGNEE)
          </Text>
          <Text>{`{buyer_other}`}</Text>
        </View>

        {/* Other Details Section */}
        <View
          style={[
            styles.column,
            { flex: 1, marginLeft: 5, borderRightWidth: 1 },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingBottom: 2,
            }}
          >
            Carriage By: {`{carriage_by}`}
          </Text>
          <Text>Place of Receipt: {`{place_receipt}`}</Text>
          <Text>Buyer Order NO: {`{buyer_order}`}</Text>
          <Text>Port of Loading: {`{loading_port}`}</Text>
          <Text>Port of Discharge: {`{discharge_port}`}</Text>
          <Text>Final Destination: {`{final}`}</Text>
          <Text>Terms of Payment: {`{term_payment}`}</Text>
        </View>

        <View style={[styles.column, { flex: 1, marginLeft: 5 }]}>
          <Text
            style={{
              fontWeight: "bold",
              paddingBottom: 2,
            }}
          >
            Invoice NO: {`{invoice_no}`}
          </Text>
          <Text>Exporter REF: {`{exporter}`}</Text>
          <Text>Other Reference: {`{other_ref}`}</Text>
          <Text>Proforma INV. NO: {`{perfoma_inv}`}</Text>
          <Text>AWB/BL No: {`{bl_no}`}</Text>
          <Text>
            BOE/SB No : {`{sb_no}`} Date : {`{sb}`}
          </Text>
          <Text>Terms of delivery: {`{tod}`}</Text>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: "#e0e0e0" }]}>
          {[
            "No",
            "Code",
            "Description",
            "HS Code",
            "SGST",
            "CGST",
            "Net Weight",
            "Quantity",
            "Unit Price",
            "Amount",
          ].map((header, index) => (
            <Text
              key={index}
              style={[styles.tableCell, styles.tableCellHeader]}
            >
              {header}
            </Text>
          ))}
        </View>
        {/* Example Row */}
        <View style={styles.tableRow}>
          {[
            "1",
            "AB123",
            "Product Name",
            "12345",
            "5%",
            "5%",
            "100 kg",
            "55",
            "10",
            "5000",
          ].map((cell, index) => (
            <Text key={index} style={styles.tableCell}>
              {cell}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.table}>
        {/* Table Header Row */}
        <View style={[styles.row, styles.header]}>
          <Text style={styles.cell}>Class</Text>
          <Text style={styles.cell}>Total</Text>
          <Text style={styles.cell}>Discount</Text>
          <Text style={styles.cell}>Taxable</Text>
          <Text style={styles.cell}>SGST</Text>
          <Text style={styles.cell}>CGST</Text>
          <Text style={styles.cell}>Total GST</Text>
          <Text style={[styles.cell, styles.lastCell]}>
            Total: {`{total_am}`}
          </Text>
        </View>

        {/* Table Data Row */}
        <View style={styles.row}>
          <Text style={styles.cell}>{`{class}`}</Text>
          <Text style={styles.cell}>{`{total}`}</Text>
          <Text style={styles.cell}>{`{discount}`}</Text>
          <Text style={styles.cell}>{`{taxable}`}</Text>
          <Text style={styles.cell}>{`{sgst}`}</Text>
          <Text style={styles.cell}>{`{cgst}`}</Text>
          <Text style={styles.cell}>{`{totalGst}`}</Text>
          <Text style={[styles.cell, styles.lastCell]}>{`{total_item}`}</Text>
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View>
        <Text style={{fontSize:"8px"}}>Terms and Conditions: {`{other_conditions}`}</Text>
        <Text style={{ marginTop: 10,fontSize:"8px" }}>Stamp and Signature</Text>
        </View>

        <View style={styles.horizontalLine}></View>
        <View>
            <Text style={{fontSize:"8px"}}>Beneficiary Name: {`{beneficiary_name}`}</Text>
            <Text style={{fontSize:"8px"}}>IBAN / Account Number : {`{iban_no}`}</Text>
            <Text style={{fontSize:"8px"}}>ABA Routing Number : {`{routing_no}`}</Text>
            <Text style={{fontSize:"8px"}}>Swift / BIC Code: -  {`{swify_code}`}</Text>
            <Text style={{fontSize:"8px"}}>IFSC Code: -   {`{ifsc_code}`}</Text>
            <Text style={{fontSize:"8px"}}>Bank Name: -  {`{bank_name}`}</Text>
            <Text style={{fontSize:"8px"}}>Bank Address: -  {`{bank_address}`}</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View>
            <Text style={{fontSize:"8px"}}>Beneficiary Phone : {`{beneficiary_ph}`}</Text>
            <Text style={{fontSize:"8px"}}>Beneficiary Email :  {`{beneficiary_email}`}</Text>
            <Text style={{fontSize:"8px"}}>Beneficiary Address :  {`{beneficiary_address}`}</Text>
            <Text style={{fontSize:"8px"}}>Type of Account: {`{type_acc}`}</Text>
            <Text style={{fontSize:"8px"}}>Currency : {`{currency}`}</Text>
            
        </View>
      </View>
    </Page>
  </Document>
);

const CommercialInvoice = () => (
  <div>
    <PDFDownloadLink document={<PDFDocument />} fileName="invoice.pdf">
      {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  </div>
);

export default CommercialInvoice;
