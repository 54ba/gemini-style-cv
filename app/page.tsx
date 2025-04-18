"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatGptCvDesign, GeminiCvDesign } from "@/components/cv-designs"
import { Download, FileText } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import FileSaver from "file-saver"
import { Packer, Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx"
import { cvData } from "@/data/cv-data"

export default function CVPage() {
  const [activeDesign, setActiveDesign] = useState<"chatgpt" | "gemini">("chatgpt")
  const cvRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    if (!cvRef.current || isExporting) return

    try {
      setIsExporting(true)

      // Get the CV element
      const cvElement = cvRef.current

      // Create a canvas from the CV element
      const canvas = await html2canvas(cvElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: activeDesign === "gemini" ? "#1a1a1a" : "#ffffff",
      })

      // Calculate dimensions to fit A4
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
        format: "a4",
      })

      // Add the image to the PDF
      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

      // Save the PDF
      pdf.save(`${cvData.basics.name.replace(/\s+/g, "-").toLowerCase()}-cv-${activeDesign}.pdf`)
    } catch (error) {
      console.error("Error exporting PDF:", error)
      alert("Failed to export PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportWord = async () => {
    if (isExporting) return

    try {
      setIsExporting(true)

      // Create Word document
      const doc = new Document({
        styles: {
          paragraphStyles: [
            {
              id: "Normal",
              name: "Normal",
              run: {
                size: 24,
                font: "Calibri",
              },
              paragraph: {
                spacing: {
                  line: 276,
                },
              },
            },
            {
              id: "Heading1",
              name: "Heading 1",
              basedOn: "Normal",
              next: "Normal",
              run: {
                size: 36,
                bold: true,
                color: activeDesign === "gemini" ? "4B9EFB" : "10B981",
              },
              paragraph: {
                spacing: {
                  before: 240,
                  after: 120,
                },
              },
            },
            {
              id: "Heading2",
              name: "Heading 2",
              basedOn: "Normal",
              next: "Normal",
              run: {
                size: 30,
                bold: true,
                color: activeDesign === "gemini" ? "8AB4F8" : "059669",
              },
              paragraph: {
                spacing: {
                  before: 240,
                  after: 120,
                },
              },
            },
          ],
        },
        sections: [
          {
            properties: {},
            children: [
              // Header with name and title
              new Paragraph({
                text: cvData.basics.name,
                heading: HeadingLevel.HEADING_1,
                thematicBreak: true,
              }),
              new Paragraph({
                text: cvData.basics.label,
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${cvData.basics.location.city}, ${cvData.basics.location.region} • ${cvData.basics.email}`,
                    italics: true,
                  }),
                ],
                spacing: {
                  after: 400,
                },
              }),

              // Summary
              new Paragraph({
                text: "Summary",
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                text: cvData.basics.summary,
                spacing: {
                  after: 400,
                },
              }),

              // Experience
              new Paragraph({
                text: "Experience",
                heading: HeadingLevel.HEADING_2,
              }),
              ...cvData.work.flatMap((job) => [
                new Paragraph({
                  text: job.position,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: job.company,
                      bold: true,
                    }),
                    new TextRun({
                      text: ` | ${job.startDate} - ${job.endDate || "Present"}`,
                      italics: true,
                    }),
                  ],
                  spacing: {
                    after: 200,
                  },
                }),
                ...job.highlights.map(
                  (highlight) =>
                    new Paragraph({
                      text: `• ${highlight}`,
                      spacing: {
                        after: 100,
                      },
                    }),
                ),
                new Paragraph({
                  text: "",
                  spacing: {
                    after: 200,
                  },
                }),
              ]),

              // Education
              new Paragraph({
                text: "Education",
                heading: HeadingLevel.HEADING_2,
              }),
              ...cvData.education.flatMap((edu) => [
                new Paragraph({
                  text: edu.studyType + " " + edu.area,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: edu.institution,
                      bold: true,
                    }),
                    new TextRun({
                      text: ` | ${edu.startDate} - ${edu.endDate}`,
                      italics: true,
                    }),
                  ],
                }),
                new Paragraph({
                  text: edu.description || "",
                  spacing: {
                    after: 400,
                  },
                }),
              ]),

              // Skills
              new Paragraph({
                text: "Skills",
                heading: HeadingLevel.HEADING_2,
              }),
              ...cvData.skills.flatMap((skillGroup) => [
                new Paragraph({
                  text: skillGroup.name,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: skillGroup.keywords.join(", "),
                  spacing: {
                    after: 200,
                  },
                }),
              ]),

              // Certifications
              new Paragraph({
                text: "Certifications",
                heading: HeadingLevel.HEADING_2,
              }),
              ...cvData.certificates.flatMap((cert) => [
                new Paragraph({
                  text: cert.name,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cert.issuer,
                      bold: true,
                    }),
                    new TextRun({
                      text: ` | ${cert.date}`,
                      italics: true,
                    }),
                  ],
                  spacing: {
                    after: 200,
                  },
                }),
              ]),

              // Footer
              new Paragraph({
                text: "",
                spacing: {
                  after: 400,
                },
              }),
              new Paragraph({
                text: `Made with ❤️ by ${cvData.basics.name} • Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
                alignment: AlignmentType.CENTER,
                spacing: {
                  after: 0,
                },
              }),
            ],
          },
        ],
      })

      // Generate the Word document
      const buffer = await Packer.toBuffer(doc)

      // Save the Word document using file-saver
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      FileSaver.saveAs(blob, `${cvData.basics.name.replace(/\s+/g, "-").toLowerCase()}-cv-${activeDesign}.docx`)
    } catch (error) {
      console.error("Error exporting Word document:", error)
      alert("Failed to export Word document. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">AI-Styled CV Designs</h1>
          <div className="flex gap-3">
            <Button
              onClick={handleExportPDF}
              className="flex items-center gap-2"
              variant={activeDesign === "chatgpt" ? "default" : "secondary"}
              disabled={isExporting}
            >
              <Download size={16} />
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
            <Button
              onClick={handleExportWord}
              className="flex items-center gap-2"
              variant="outline"
              disabled={isExporting}
            >
              <FileText size={16} />
              {isExporting ? "Exporting..." : "Export Word"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="chatgpt" onValueChange={(value) => setActiveDesign(value as "chatgpt" | "gemini")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chatgpt">ChatGPT Style</TabsTrigger>
            <TabsTrigger value="gemini">Gemini Dark Mode</TabsTrigger>
          </TabsList>

          <div ref={cvRef}>
            <TabsContent value="chatgpt" className="mt-0">
              <ChatGptCvDesign data={cvData} />
            </TabsContent>

            <TabsContent value="gemini" className="mt-0">
              <GeminiCvDesign data={cvData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
