import { PDFDocument } from "pdf-lib";
import html2canvas from "html2canvas";

export async function compressPDF(pdfBytes: Uint8Array): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  return await pdfDoc.save({
    useObjectStreams: true,
  });
}

export async function generatePDF(contentRef: React.RefObject<HTMLDivElement>): Promise<Uint8Array> {
  if (!contentRef.current) {
    throw new Error("Content reference is not available");
  }

  const canvas = await html2canvas(contentRef.current, {
    scale: 1,
    useCORS: true,
    logging: false,
    backgroundColor: null,
  });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([canvas.width, canvas.height]);

  const jpgImage = canvas.toDataURL("image/jpeg", 0.8);
  const image = await pdfDoc.embedJpg(jpgImage);

  page.drawImage(image, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  return await pdfDoc.save({
    useObjectStreams: true,
    // Removed unsupported property 'useStreamDeflate'
  });
}
