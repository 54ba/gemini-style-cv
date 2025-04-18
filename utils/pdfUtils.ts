import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface PageDimensions {
  width: number;
  height: number;
}

export async function renderPageToCanvas(
  element: HTMLElement,
  dimensions: PageDimensions,
  pageNumber: number
): Promise<HTMLCanvasElement> {
  const { width, height } = dimensions;
  
  const pageDiv = document.createElement('div');
  pageDiv.style.width = `${width}pt`;
  pageDiv.style.height = `${height}pt`;
  pageDiv.style.position = 'absolute';
  pageDiv.style.overflow = 'hidden';
  pageDiv.style.top = `${-pageNumber * height}pt`;
  
  const clone = element.cloneNode(true) as HTMLElement;
  pageDiv.appendChild(clone);
  document.body.appendChild(pageDiv);

  try {
    const canvas = await html2canvas(pageDiv, {
      scale: 1.2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      removeContainer: true,
      width,
      height,
    });
    return canvas;
  } finally {
    pageDiv.remove();
  }
}

export async function generateOptimizedPDF(
  element: HTMLElement,
  dimensions: PageDimensions
): Promise<jsPDF> {
  const { width, height } = dimensions;
  const totalHeight = element.scrollHeight;
  const pageCount = Math.ceil(totalHeight / height);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: [width, height],
    compress: true
  });

  for (let i = 0; i < pageCount; i++) {
    if (i > 0) pdf.addPage();
    
    const canvas = await renderPageToCanvas(element, dimensions, i);
    const imgData = canvas.toDataURL('image/jpeg', 0.7);
    
    pdf.addImage(
      imgData,
      'JPEG',
      0,
      0,
      width,
      height,
      undefined,
      'FAST'
    );
    
    canvas.remove();
  }

  return pdf;
}
