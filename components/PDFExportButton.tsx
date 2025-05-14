import { Button } from '@/components/ui/button';
import { exportToPDF } from '@/utils/pdfExport';
import { Download } from 'lucide-react';

interface PDFExportButtonProps {
  elementId: string;
  filename?: string;
}

export function PDFExportButton({ elementId, filename = 'document.pdf' }: PDFExportButtonProps) {
  const handleExport = async () => {
    try {
      await exportToPDF(elementId, filename);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      // You might want to show a toast notification here
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className="flex items-center gap-2 w-full sm:w-auto"
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Export to PDF</span>
      <span className="sm:hidden">PDF</span>
    </Button>
  );
} 