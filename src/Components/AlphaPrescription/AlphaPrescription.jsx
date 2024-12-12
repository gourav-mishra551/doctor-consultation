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
import AmethusLogo from "../../../src/Assests/ametheus-helath-logo.jpg"; // Importing the logo image

const AlphaPrescription = () => {
  const [signature, setSignature] = useState(null);

  const tableData = [
    { serial: "001", code: "ABC34", description: "Surgical Masks", hsCode: "123456", quantity: "10", unitPrice: "$1.5", amount: "$15" },
    { serial: "002", code: "DEF56", description: "Gloves", hsCode: "654321", quantity: "20", unitPrice: "$2.0", amount: "$40" },
    // Add more rows as needed
  ];
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: "Helvetica",
      position: "relative",
    },
    Heading: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start", // Align text to the left for better readability
      marginTop: 10,
    },
    text: {
      fontSize: 10,
      width: "100%",
      textAlign: "left",
      paddingRight: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
    section: {
      marginBottom: 15,
      width: "100%",
    },
    table: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#000",
      borderCollapse: "collapse",
      marginBottom: 20, // Add space below the table
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#000",
    },
    tableCell: {
      paddingHorizontal: 10,
      textAlign: "left",
      paddingVertical: 8,
      fontSize: 8,
      borderColor: "#000",
      borderRightWidth: 1,
      flex: 1,
      flexWrap: "wrap", // Ensures text wrapping for longer content
      overflow: "hidden", // Prevents content from spilling out
    },
    tableCol: {
      flex: 1,
    },
    noColumn: {
      flex: 0.7,
    },
    codeColumn: {
      flex: 0.7,
    },
    descriptionColumn: {
      flex: 1.5,
    },
    hsCodeColumn: {
      flex: 1.5,
    },
    quantityColumn: {
      flex: 1.5,
    },
    unitPriceColumn: {
      flex: 1.5,
    },
    amountColumn: {
      flex: 1.5,
    },
    tableHeader: {
      backgroundColor: "#f1f1f1", // Adds background to the header row for better visibility
      fontWeight: "bold",
    },
    lastRowCell: {
      borderBottomWidth: 0, // Removes the border for the last row
    },
    signature: {
      marginTop: 30,
      width: "100%",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    value: {
      color: "#616A76",
    },
    additionalText: {
      fontSize: 10,
      color: "#000",
      marginBottom: 10,
      width: "100%",
    },
    checklist: {
      fontSize: 10,
      marginLeft: 15,
    },
  });
  

  const effective_date = "2024-12-10";
  const validity_date = "2024-12-20";
  const purchase_of = "Medical Equipment";
  const the_buyer = "ABC Health Care";
  const seller = "XYZ Suppliers";
  const product_name = "Surgical Masks";
  const amount_of_product = "500";
  const weight = "kg";
  const currency_product = "$";
  const price_product = "1.5";
  const subtotal_price = "$750";
  const serial = "001";
  const codesss = "ABC34";
  const descriptionsss = "Surgical Masks";
  const hsCodesss = "123456";
  const quantitysss = "10";
  const unitPricesss = "$1.5";
  const amountsss = "$15";
  const specification_head = "Product";
  const specification =
    "High-quality surgical masks with 95% filtration efficiency.";

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setSignature(reader.result);
    reader.readAsDataURL(file);
  };

  const PDFGenerator = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text style={styles.Heading}>PURCHASE LETTER OF INTENT</Text>
          <Text style={styles.text}>
            Effective Date: <Text style={styles.value}>{effective_date}</Text> |{" "}
            Validity of LOI: <Text style={styles.value}>{validity_date}</Text>
          </Text>
          <Text style={styles.text}>RE: Purchase of {purchase_of}</Text>

          <View style={styles.section}>
            <Text style={styles.text}>
              This purchase letter of intent (the “Letter of Intent”) represents
              the basic terms agreed upon by the Buyer and Seller. After this
              Letter of Intent has been made, a formal agreement may be
              constructed to the benefit of the Parties involved.
            </Text>
            <Text style={styles.text}>The Buyer: {the_buyer}</Text>
            <Text style={styles.text}>The Seller: {seller}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>
              The Product or Service: The Buyer intends to purchase the
              following Product:{" "}
              <Text style={styles.value}>{product_name}</Text>
            </Text>
            <Text style={styles.text}>
              The Buyer intends to purchase of the Product at USD per MT :{" "}
              <Text style={styles.value}>
                {amount_of_product} {weight}
              </Text>
            </Text>
            <Text style={styles.text}>
              Price: {currency_product} {price_product} per {weight}
            </Text>
            <Text style={styles.text}>Subtotal: {subtotal_price}</Text>
          </View>

          <View style={[styles.section, styles.table]}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text
                style={[styles.tableCell, styles.noColumn, styles.tableHeader]}
              >
                No
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.codeColumn,
                  styles.tableHeader,
                ]}
              >
                Code
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.descriptionColumn,
                  styles.tableHeader,
                ]}
              >
                Description
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.hsCodeColumn,
                  styles.tableHeader,
                ]}
              >
                HS Code
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.quantityColumn,
                  styles.tableHeader,
                ]}
              >
                Quantity
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.unitPriceColumn,
                  styles.tableHeader,
                ]}
              >
                Unit Price
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.amountColumn,
                  styles.tableHeader,
                ]}
              >
                Amount
              </Text>
            </View>

            {/* Table Rows */}
            {tableData.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={[styles.tableCell, styles.noColumn]}>
                  {row.serial}
                </Text>
                <Text style={[styles.tableCell, styles.codeColumn]}>
                  {row.code}
                </Text>
                <Text style={[styles.tableCell, styles.descriptionColumn]}>
                  {row.description}
                </Text>
                <Text style={[styles.tableCell, styles.hsCodeColumn]}>
                  {row.hsCode}
                </Text>
                <Text style={[styles.tableCell, styles.quantityColumn]}>
                  {row.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.unitPriceColumn]}>
                  {row.unitPrice}
                </Text>
                <Text style={[styles.tableCell, styles.amountColumn]}>
                  {row.amount}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>Delivery:</Text>
            <Text style={styles.additionalText}>
              First Week of <Text style={styles.value}>[Delivery Date]</Text>
            </Text>
            <Text style={styles.additionalText}>
              Mid-Week of <Text style={styles.value}>[Mid-Delivery Date]</Text>
            </Text>
            <Text style={styles.additionalText}>
              Last Week of <Text style={styles.value}>[Last Week Date]</Text>
            </Text>
            <Text style={styles.additionalText}>
              The Port for Delivery of the Product will be{" "}
              <Text style={styles.value}>[Port]</Text>
            </Text>
            <View style={styles.section}>
              <Text style={styles.text}>Payment:</Text>
              <Text style={styles.text}>
                The Purchase Price shall be paid in the following manner:
              </Text>
              <Text style={styles.text}>MT 103 or International wire</Text>
              <Text style={styles.text}>[Bank Details]</Text>
              <Text style={styles.text}>Check No</Text>
              <Text style={styles.text}>Credit (Card Information: )</Text>
              <Text style={styles.text}>☐ ☑ RTGS / IMPS / NEFT /</Text>
              <Text style={styles.text}>
                ☐ ☑ 100% L/C, DLC via SWIFT MT700 at the loading port /
                unloading port
              </Text>
              <Text style={styles.text}>☐ ☑ Inco Terms</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>
                Financing: The Buyer has made it known that this Letter of
                Intent is
                <Text style={styles.value}> conditional </Text> or
                <Text style={styles.value}> non-conditional </Text>
                on their ability to obtain financing.
              </Text>
              <Text style={styles.text}>
                If this letter is conditional on financing, it shall be under
                the following terms:
              </Text>
            </View>
            f<Text style={styles.text}>Indemnity:</Text>
            <Text style={styles.additionalText}>
              This document is a letter of intent only. It is not intended to
              be, and shall not constitute in any way, a binding or legal
              document, or impose any legal obligation or duty on either of our
              company. If the foregoing reflects our mutual statement of
              intention, please issue us an offer in seller’s letterhead with
              company profile. Force majeure applied.
            </Text>
          </View>

          <View style={styles.signature}>
            <Text>SELLER</Text>
            <Text>
              Signature: __________________________ Date: ________________
            </Text>
            <Text>Print Name: __________________________</Text>

            <Text>BUYER</Text>
            <Text>
              Signature: __________________________ Date: ________________
            </Text>
            <Text>Print Name: __________________________</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink document={PDFGenerator()} fileName="Prescription.pdf">
        {({ loading }) =>
          loading ? "Loading document..." : "Download Prescription PDF"
        }
      </PDFDownloadLink>
      <input type="file" accept="image/*" onChange={handleSignatureUpload} />
    </div>
  );
};

export default AlphaPrescription;
