import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// PDF Styles to mimic the exact design from the image
const styles = StyleSheet.create({
  page: {
    padding: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
  },
  column: {
    width: "48%", // Each column takes 48% width to leave some space between them
    marginBottom: "10px",
    padding: 3,
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: "10px",
    marginBottom: 3,
  },
  textValue: {
    fontSize: "10px",
    color: "#333",
  },
  section: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    paddingHorizontal: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rowItem: {
    width: "32%", // Allowing three items in a row
    borderRightWidth: 1,
    borderColor: "#ccc",
    padding: "5px",
  },
  lastRowItem: {
    width: "32%",
    padding: "5px",
  },
  title: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
  },
  tableText: {
    fontSize: "10px",
    color: "#333",
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  tableHeaderCell: {
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    border: "1px solid #ccc",
    padding: 8,
    textAlign: "center",
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  sNoCell: {
    width: "5%",
  },
  containerCell: {
    width: "15%",
  },
  packageCell: {
    width: "15%",
  },
  descriptionCell: {
    width: "25%",
  },
  hsnCodeCell: {
    width: "10%",
  },
  quantityCell: {
    width: "10%",
  },
  rateCell: {
    width: "10%",
  },
  amountCell: {
    width: "10%",
  },
  amountBlock: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

const InvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Proforma Invoice</Text>
      <View style={styles.section}>
        <Text style={{ fontSize: "10px", marginBottom: "10px" }}>
          Exporter: {`{lc_company_name}`}
        </Text>
        <Text style={{ fontSize: "10px", marginBottom: "10px" }}>
          Manufacturer / Supplier: {`{manufacturer_supplier}`}
        </Text>

        {/* Consignee and other details */}
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.textLabel}>Consignee:</Text>
            <Text style={styles.textValue}>{`{consignee_name}`}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.textLabel}>Shipper’s Reference:</Text>
            <Text style={styles.textValue}>{`{shipper_reference}`}</Text>
          </View>
          <View style={styles.lastRowItem}>
            <Text style={styles.textLabel}>
              Buyer (if other than consignee):
            </Text>
            <Text style={styles.textValue}>{`{other_buyer}`}</Text>
          </View>
        </View>

        {/* Carriage details */}
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.textLabel}>
              Carriage by Air, Sea or Multimodal:
            </Text>
            <Text style={styles.textValue}>{`{carriage_by}`}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.textLabel}>Pre Carriage By:</Text>
            <Text style={styles.textValue}>{`{pre_carriage_by}`}</Text>
          </View>
          <View style={styles.lastRowItem}>
            <Text style={styles.textLabel}>
              Place of receipt by pre-carrier:
            </Text>
          </View>
        </View>

        {/* Country and Port Details */}
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Country of Origin of goods:</Text>
            <Text style={styles.textValue}>{`{country_of_origin_good}`} </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.textLabel}>Country of Final Destination:</Text>
            <Text
              style={styles.textValue}
            >{`{country_of_final_destination}`}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Port of Loading:</Text>
            <Text style={styles.textValue}>{`{loading_Port_name}`}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.textLabel}>Port of Discharge:</Text>
            <Text style={styles.textValue}>{`{unloading_port_name}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Invoice No. & Date:</Text>
            <Text style={styles.textValue}>{`{invoice_number}`}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Buyer’s Order No. & Date:</Text>
            <Text style={styles.textValue}>{`{buyer_order}`}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Other reference(s):</Text>
            <Text style={styles.textValue}>{`{other_reference}`}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Bill of lading / Air waybill:</Text>
            <Text style={styles.textValue}>{`{bill}`}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Notify Party:</Text>
            <Text style={styles.textValue}>{`{notify_party}`}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textLabel}>Terms of Delivery and Payment:</Text>
            <Text style={styles.textValue}>{`{other_conditions}`}</Text>
          </View>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableRow}>
        <View
          style={[styles.tableCell, styles.tableHeaderCell, styles.sNoCell]}
        >
          <Text style={styles.tableHeaderText}>S No</Text>
        </View>
        <View
          style={[
            styles.tableCell,
            styles.tableHeaderCell,
            styles.containerCell,
          ]}
        >
          <Text style={styles.tableHeaderText}>MARKS & NOS. CONTAINER</Text>
        </View>
        <View
          style={[styles.tableCell, styles.tableHeaderCell, styles.packageCell]}
        >
          <Text style={styles.tableHeaderText}>No. & KIND OF PACKAGES</Text>
        </View>
        <View
          style={[
            styles.tableCell,
            styles.tableHeaderCell,
            styles.descriptionCell,
          ]}
        >
          <Text style={styles.tableHeaderText}>DESCRIPTION OF GOODS</Text>
        </View>
        <View
          style={[styles.tableCell, styles.tableHeaderCell, styles.hsnCodeCell]}
        >
          <Text style={styles.tableHeaderText}>HSN CODE</Text>
        </View>
        <View
          style={[
            styles.tableCell,
            styles.tableHeaderCell,
            styles.quantityCell,
          ]}
        >
          <Text style={styles.tableHeaderText}>QUANTITY</Text>
        </View>
        <View
          style={[styles.tableCell, styles.tableHeaderCell, styles.rateCell]}
        >
          <Text style={styles.tableHeaderText}>Rate in USD/MT/Bag</Text>
        </View>
        <View
          style={[styles.tableCell, styles.tableHeaderCell, styles.amountCell]}
        >
          <Text style={styles.tableHeaderText}>Amount</Text>
        </View>
      </View>

      {/* Table Content - Sample Rows */}
      <View style={styles.tableRow}>
        <View style={[styles.tableCell, styles.sNoCell]}>
          <Text style={styles.tableText}>1</Text>
        </View>
        <View style={[styles.tableCell, styles.containerCell]}>
          <Text style={styles.tableText}>Mark1</Text>
        </View>
        <View style={[styles.tableCell, styles.packageCell]}>
          <Text style={styles.tableText}>10 Packages</Text>
        </View>
        <View style={[styles.tableCell, styles.descriptionCell]}>
          <Text style={styles.tableText}>Goods Description 1</Text>
        </View>
        <View style={[styles.tableCell, styles.hsnCodeCell]}>
          <Text style={styles.tableText}>1234</Text>
        </View>
        <View style={[styles.tableCell, styles.quantityCell]}>
          <Text style={styles.tableText}>100</Text>
        </View>
        <View style={[styles.tableCell, styles.rateCell]}>
          <Text style={styles.tableText}>1500 USD</Text>
        </View>
        <View style={[styles.tableCell, styles.amountCell]}>
          <Text style={styles.tableText}>150000</Text>
        </View>
      </View>

      {/* footer */}
      <View
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "row",
          height: "auto",
          
        }}
      >
        {/* Left Section */}
        <View style={{ width: "50%", paddingRight: 10 }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginBottom: 10 }}
          >
            Beneficiary BANK COORDINATES:
          </Text>

          {/* Rows */}
          <View style={{ marginBottom: 10 }}>
            {[
              { label: "A/C Name:", value: "{ac_name}" },
              { label: "Bank Name:", value: "{bank_name}" },
              { label: "Address of the Bank:", value: "{address_bank}" },
              { label: "Branch IFSC Code:", value: "{branch}" },
              { label: "A/C Number:", value: "{account_number}" },
              { label: "Swift Code:", value: "{consignee_bank_address}" },
            ].map(({ label, value }, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                  
                }}
              >
                <Text style={{ fontSize: "10px", flex: 1 }}>{label}</Text>

                {/* Vertical Line */}
                <View
                  style={{
                    width: 1,
                    backgroundColor: "black",
                    marginHorizontal: 10,
                    height: "80%",
                  }}
                />

                <Text style={{ fontSize: "10px", flex: 2 }}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Corresponding Bank Coordinates */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{ fontSize: "12px", fontWeight: "bold", marginBottom: 5 }}
            >
              Corresponding Bank Coordinates:
            </Text>
            <View
              style={{
                border: "1px solid black",
                padding: 10,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: "10px" }}>
                All Banking charges outside the Beneficiary’s Bank, including
                reimbursement charges, would be in the {`{account_type}`}.
              </Text>
            </View>
            <View
              style={{
                border: "1px solid black",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: "10px" }}>
                CERTIFICATION: We declare that this invoice shows the actual
                price of the goods described and that all particulars are true
                and correct.
              </Text>
            </View>
          </View>
        </View>

        {/* Right Section */}
        <View
          style={{
            width: "50%",
            border: "1px solid black",
            padding: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            SIGNATURE AND DATE:
          </Text>
          <View
            style={{
              borderTop: "1px solid black",
              width: "80%",
              alignSelf: "center",
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </Page>
  </Document>
);

// Main Component with Download Button
const PreformaGoods = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Download PERFORMA INVOICE</h2>
      <PDFDownloadLink
        document={<InvoicePDF />}
        fileName="performa_invoice.pdf"
      >
        {({ loading }) =>
          loading ? (
            <button style={{ padding: "10px", cursor: "pointer" }}>
              Loading...
            </button>
          ) : (
            <button style={{ padding: "10px", cursor: "pointer" }}>
              Download PDF
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PreformaGoods;
