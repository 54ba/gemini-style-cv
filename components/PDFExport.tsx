"use client";

import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { renderToPDF } from '@/utils/pdfRenderer';

interface PDFExportProps {
  children: React.ReactNode;
}

export const PDFExport = ({ children }: PDFExportProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePDFExport = async () => {
    if (!contentRef.current || isExporting) return;

    try {
      setIsExporting(true);
      const pdf = await renderToPDF(contentRef.current);
      pdf.save(`CV_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handlePDFExport}
        disabled={isExporting}
        variant="default"
        className="flex items-center gap-2 mb-4"
      >
        {isExporting ? (
          <>
            <span className="animate-spin">⌛</span>
            Generating PDF...
          </>
        ) : (
          "Export PDF"
        )}
      </Button>
      <div 
        ref={contentRef} 
        className="pdf-content bg-white mx-auto"
        style={{ 
          width: '595.28pt',
          minHeight: '841.89pt',
          padding: '40pt',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        {children}
      </div>
    </div>
  );
};
