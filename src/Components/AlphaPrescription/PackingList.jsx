import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const PackingListPDF = ({ data }) => {
  const styles = StyleSheet.create({
    // Main Table Container
    table: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ddd",
      marginBottom: 10,
      borderRadius: 5,
      overflow: "hidden",
    },

    // Table Row Styles
    tableRow: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },

    // Header Row Styles
    headerRow: {
      borderBottomWidth: 2,
      borderColor: "#ddd",
    },

    // Table Cell Styles
    tableCell: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      fontSize: 10,
      borderRightWidth: 1,
      borderColor: "#ddd",
      color: "#333",
    },

    // Header Cell Styles
    headerCell: {
      fontWeight: "bold",
      color: "black", // White text for the header
      fontSize: 10,
    },

    // Styling for the last cell in each row (removing right border)
    lastCell: {
      borderRightWidth: 0,
    },

    // Alternating Row Colors
    tableRowEven: {
      backgroundColor: "#fff", // White for even rows
    },
    tableRowOdd: {
      backgroundColor: "#f7f7f7", // Light gray for odd rows
    },

    // Footer Styles
    footer: {
      marginTop: 20,
      padding: 10,
      borderTopWidth: 1,
      borderColor: "#ddd",
      textAlign: "right",
      color: "#555",
    },

    // Column-specific widths
    slColumn: { flex: 0.5 }, // Smallest column
    markingColumn: { flex: 1 },
    descriptionColumn: { flex: 3 }, // Largest column for detailed content
    packingColumn: { flex: 1.5 },
    quantityColumn: { flex: 1 },
    grossWeightColumn: { flex: 1.5 },
    netWeightColumn: { flex: 1 },
    measurementsColumn: { flex: 1.5 },

    // Title and Header Styles
    header: {
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: "#4CAF50", // Green color matching the header row
    },

    // Section Styles
    section: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderColor: "#ddd",
      marginBottom: 10,
    },
    Com: {
      fontSize: 8,
      gap: "30px",
      flexDirection: "row", // To arrange the children horizontally
      justifyContent: "flex-start", // Space out the child components
      borderWidth: 1,
      padding: 10, // Add some padding to ensure there's space around the items
    },
    valueColumn: {
      flex: 2, // Adjust this value for column width
      textAlign: "left", // Align value text to the left
    },
    labelColumn: {
      flex: 1, // Adjust this value for column width
      textAlign: "left", // Align label text to the left
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>PACKING LIST</Text>
        </View>

        <View style={styles.Com}>
          <Text>COMMERCIAL INVOICE NO – {data.commercialInvoiceNo}</Text>
          <Text>DATED: {data.purchaseLetterDate}</Text>
        </View>
        {/* Shipper and Consignee */}

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.headerRow]}>
            <Text
              style={[
                styles.tableCell,
                styles.descriptionColumn,
                styles.headerCell,
              ]}
            >
              SHIPPER
            </Text>

            <Text
              style={[
                styles.tableCell,
                styles.descriptionColumn,
                styles.headerCell,
              ]}
            >
              CONSIGNEE
            </Text>
          </View>
          <View style={[styles.tableRow, styles.headerRow]}>
            <Text style={[styles.tableCell, styles.descriptionColumn]}>
              ABC Logistics
            </Text>

            <Text style={[styles.tableCell, styles.descriptionColumn]}>
              XYZ.Ltd
            </Text>
          </View>
        </View>

        {/* Notify Parties */}
        {/* <View style={styles.section}>
          <Text>Notify Party 1: {data.notifyPartyOne}</Text>
          <Text>Notify Party 2: {data.notifyPartyTwo}</Text>
        </View> */}

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.headerRow]}>
            <Text
              style={[
                styles.tableCell,
                styles.descriptionColumn,
                styles.headerCell,
              ]}
            >
              Notify Party 1:
            </Text>

            <Text
              style={[
                styles.tableCell,
                styles.descriptionColumn,
                styles.headerCell,
              ]}
            >
              Notify Party 2:
            </Text>
          </View>
          <View style={[styles.tableRow, styles.headerRow]}>
            <Text style={[styles.tableCell, styles.descriptionColumn]}>
            Notify Party 1: {data.notifyPartyOne}
            </Text>

            <Text style={[styles.tableCell, styles.descriptionColumn]}>
            Notify Party 2: {data.notifyPartyTwo}
            </Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.headerRow]}>
            <Text
              style={[styles.tableCell, styles.slColumn, styles.headerCell]}
            >
              SL
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.markingColumn,
                styles.headerCell,
              ]}
            >
              Marking
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.descriptionColumn,
                styles.headerCell,
              ]}
            >
              Description
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.packingColumn,
                styles.headerCell,
              ]}
            >
              Packing
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.quantityColumn,
                styles.headerCell,
              ]}
            >
              Quantity
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.grossWeightColumn,
                styles.headerCell,
              ]}
            >
              Gross Weight (KGS)
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.netWeightColumn,
                styles.headerCell,
              ]}
            >
              Net Weight (KGS)
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.measurementsColumn,
                styles.headerCell,
                styles.lastCell,
              ]}
            >
              Measurements (MM)
            </Text>
          </View>
          {data.items.map((item, index) => (
            <View
              style={[
                styles.tableRow,
                index % 2 === 0
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#f7f7f7" },
              ]}
              key={index}
            >
              <Text style={[styles.tableCell, styles.slColumn]}>
                {item.serial}
              </Text>
              <Text style={[styles.tableCell, styles.markingColumn]}>
                {item.marking}
              </Text>
              <Text style={[styles.tableCell, styles.descriptionColumn]}>
                {item.description}
              </Text>
              <Text style={[styles.tableCell, styles.packingColumn]}>
                {item.packing}
              </Text>
              <Text style={[styles.tableCell, styles.quantityColumn]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.grossWeightColumn]}>
                {item.grossWeight}
              </Text>
              <Text style={[styles.tableCell, styles.netWeightColumn]}>
                {item.netWeight}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.measurementsColumn,
                  styles.lastCell,
                ]}
              >
                {item.measurements}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Signed by:</Text>
          <Text>For: {data.termsConditions}</Text>
        </View>
      </Page>
    </Document>
  );
};

const PackingList = () => {
  const sampleData = {
    commercialInvoiceNo: "12345",
    purchaseLetterDate: "2024-12-10",
    shipper: "ABC Logistics",
    consignee: "XYZ Ltd.",
    notifyPartyOne: "Notify 1 Details",
    notifyPartyTwo: "Notify 2 Details",
    items: [
      {
        serial: 1,
        marking: "Mark 1",
        description: "Item Description 1",
        packing: "Box",
        quantity: 10,
        grossWeight: 100,
        netWeight: 95,
        measurements: "100x50x30",
      },
      {
        serial: 2,
        marking: "Mark 2",
        description: "Item Description 2",
        packing: "Pallet",
        quantity: 20,
        grossWeight: 200,
        netWeight: 180,
        measurements: "200x100x50",
      },
    ],
    termsConditions: "All terms and conditions apply.",
  };

  return (
    <div>
      <PDFDownloadLink
        document={<PackingListPDF data={sampleData} />}
        fileName="packing-list.pdf"
      >
        {({ loading }) =>
          loading ? "Generating document..." : "Download Packing List"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PackingList;
