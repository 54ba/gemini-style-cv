import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function renderToPDF(element: HTMLElement) {
  const a4Width = 595.28;
  const a4Height = 841.89;
  const padding = 40;

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // Calculate total height and number of pages
    const contentHeight = clone.scrollHeight;
    const totalPages = Math.ceil(contentHeight / (a4Height - (padding * 2)));

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [a4Width, a4Height],
      compress: true,
      hotfixes: ['px_scaling']
    });

    // Render each page separately
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      // Position clone for current page
      clone.style.transform = `translateY(${-page * (a4Height - (padding * 2))}pt)`;

      const canvas = await html2canvas(clone, {
        scale: 1.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        imageTimeout: 15000,
        logging: false,
        windowWidth: a4Width - (padding * 2),
        windowHeight: a4Height - (padding * 2),
        x: padding,
        y: padding + (page * (a4Height - (padding * 2))),
        width: a4Width - (padding * 2),
        height: Math.min(a4Height - (padding * 2), contentHeight - (page * (a4Height - (padding * 2))))
      });

      // Convert to JPEG for better compression
      const imgData = canvas.toDataURL('image/jpeg', 0.7);

      pdf.addImage(
        imgData,
        'JPEG',
        padding,
        padding,
        a4Width - (padding * 2),
        (canvas.height * (a4Width - (padding * 2))) / canvas.width,
        '',
        'FAST'
      );

      canvas.remove();
    }

    return pdf;
  } finally {
    container.remove();
  }
}
