import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 11,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyDetails: {
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: 1,
    borderStyle: "solid",
  },
  tableCell: {
    borderRight: 1,
    borderStyle: "solid",
    fontSize:"8px",
    padding: 5,
    width: "12.5%", // Adjust as per the number of columns (8 columns = 12.5%)
    textAlign: "center",
  },
  lastCell: {
    borderRightWidth: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#f2f2f2',
  },
 
});

// Static PDF Document
const CommercialInvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Header */}
      <View style={styles.header}>
        <View>
          <Text>Your Company Name</Text>
          <Text>123, Example Street, City, Country</Text>
        </View>

        <View>
          <Text style={styles.bold}>Registration No: 12345678</Text>
          <Text style={styles.bold}>GST NO: GST1234</Text>
        </View>

        <View>
          <Text>Telephone: +1 123 456 7890</Text>
          <Text>Fax No: +1 123 456 7891</Text>
          <Text>Website: www.example.com</Text>
        </View>
      </View>

      {/* Invoice Title */}
      <Text style={styles.title}>Commercial Invoice</Text>

      {/* Consignee and Buyer */}
      <View style={styles.section}>
        <View>
          <Text style={styles.sectionTitle}>CONSIGNEE NAME & ADDRESS</Text>
          <Text>John Doe</Text>
          <Text>456 Some Street, City, Country</Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>
            BUYER (IF OTHER THAN CONSIGNEE)
          </Text>
          <Text>Buyer Name</Text>
          <Text>789 Another Street, City, Country</Text>
        </View>
      </View>

      {/* Invoice Details */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text>Carriage By: Air</Text>
          <Text>Place of Receipt: City A</Text>
          <Text>Port of Loading: Port A</Text>
          <Text>Port of Discharge: Port B</Text>
          <Text>Final Destination: Destination City</Text>
          <Text>Date: 2024-06-01</Text>
          <Text>Terms of Payment: Net 30 Days</Text>
        </View>

        {/* Additional Invoice Details */}
        <View style={{ marginTop: 10, marginRight: "55px" }}>
          <Text>Invoice No: INV123456</Text>
          <Text>Buyer Order No: BO12345</Text>
          <Text>Exporter REF: Exporter Name</Text>
          <Text>Other Reference: REF123</Text>
          <Text>Proforma INV. NO: PER12345</Text>
          <Text>AWB/BL No: BL12345678</Text>
          <Text>Terms of Delivery: FOB</Text>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>No</Text>
          <Text style={styles.tableCell}>Code</Text>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>HS Code</Text>
          <Text style={styles.tableCell}>Batch No</Text>
          <Text style={styles.tableCell}>MFG Date</Text>
          <Text style={styles.tableCell}>Expiry Date</Text>
          <Text style={styles.tableCell}>SGST</Text>
          <Text style={styles.tableCell}>CGST</Text>
          <Text style={styles.tableCell}>Gross Wt</Text>
          <Text style={styles.tableCell}>Net Wt</Text>
          <Text style={styles.tableCell}>Qty</Text>
          <Text style={styles.tableCell}>Unit Price</Text>
          <Text style={[styles.tableCell, styles.lastCell]}>Amount</Text>
        </View>

        {/* Static Rows */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>CODE00</Text>
          <Text style={styles.tableCell}>Product A</Text>
          <Text style={styles.tableCell}>1234</Text>
          <Text style={styles.tableCell}>BATCH001</Text>
          <Text style={styles.tableCell}>2024-01-01</Text>
          <Text style={styles.tableCell}>2025-01-01</Text>
          <Text style={styles.tableCell}>5%</Text>
          <Text style={styles.tableCell}>5%</Text>
          <Text style={styles.tableCell}>10 kg</Text>
          <Text style={styles.tableCell}>9.5 kg</Text>
          <Text style={styles.tableCell}>100</Text>
          <Text style={styles.tableCell}>10</Text>
          <Text style={[styles.tableCell, styles.lastCell]}>1000</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>CODE002</Text>
          <Text style={styles.tableCell}>Product B</Text>
          <Text style={styles.tableCell}>5678</Text>
          <Text style={styles.tableCell}>BATCH002</Text>
          <Text style={styles.tableCell}>2024-02-01</Text>
          <Text style={styles.tableCell}>2025-02-01</Text>
          <Text style={styles.tableCell}>5%</Text>
          <Text style={styles.tableCell}>5%</Text>
          <Text style={styles.tableCell}>20 kg</Text>
          <Text style={styles.tableCell}>18 kg</Text>
          <Text style={styles.tableCell}>50</Text>
          <Text style={styles.tableCell}>20</Text>
          <Text style={[styles.tableCell, styles.lastCell]}>1000</Text>
        </View>
      </View>

      {/* Footer Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Class</Text>
          <Text style={styles.tableCell}>Total</Text>
          <Text style={styles.tableCell}>Discount</Text>
          <Text style={styles.tableCell}>Taxable</Text>
          <Text style={styles.tableCell}>SGST</Text>
          <Text style={styles.tableCell}>CGST</Text>
          <Text style={styles.tableCell}>Total GST</Text>
          <Text style={styles.tableCell}>Total :</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>A</Text>
          <Text style={styles.tableCell}>1000</Text>
          <Text style={styles.tableCell}>50</Text>
          <Text style={styles.tableCell}>950</Text>
          <Text style={styles.tableCell}>47.5</Text>
          <Text style={styles.tableCell}>47.5</Text>
          <Text style={styles.tableCell}>95</Text>
          <Text style={styles.tableCell}>1095</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Main Component
const CommercialInvoicePharma = () => {
  return (
    <div>
      <h1>Commercial Invoice Generator</h1>
      <PDFDownloadLink
        document={<CommercialInvoicePDF />}
        fileName="commercial_invoice.pdf"
      >
        {({ loading }) =>
          loading ? <button>Loading...</button> : <button>Download PDF</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default CommercialInvoicePharma;
