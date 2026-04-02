import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export const downloadInvoice = () => {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(18)
  doc.text("Laundry Order Invoice", 14, 20)

  // Order Info
  doc.setFontSize(12)
  doc.text("Order ID: LDR-10245", 14, 35)
  doc.text("Customer: Shamon Esmail", 14, 42)
  doc.text("Mobile: +91 98765 43210", 14, 49)
  doc.text("Address: Kochi, Kerala - 682030", 14, 56)

  // Table ( CORRECT)
  autoTable(doc, {
    startY: 70,
    head: [["Service", "Qty", "Price"]],
    body: [
      ["Wash & Fold", "3", "Rs. 460"],
      ["Pickup Charge", "-", "Rs. 40"],
    ],
  })

  // Total
  const finalY = (doc as any).lastAutoTable.finalY

  doc.text("Total Amount: Rs. 500", 14, finalY + 15)

  // Download
  doc.save("Laundry_Invoice_LDR-10245.pdf")
}
