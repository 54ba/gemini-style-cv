import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

export const generatePDF = async (
  content: React.ReactElement,
  filename: string = "document.pdf"
) => {
  try {
    // Generate PDF blob
    const blob = await pdf(content).toBlob();
    const url = URL.createObjectURL(blob);

    // Download PDF
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
