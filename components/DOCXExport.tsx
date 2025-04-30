import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx"
import { useCV } from "@/contexts/CVContext"

interface DOCXExportProps {
  theme: string
}

export function DOCXExport({ theme }: DOCXExportProps) {
  const { cvData } = useCV()

  const handleExport = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: cvData.basics.name,
                heading: HeadingLevel.HEADING_1,
              }),
              new Paragraph({
                text: cvData.basics.label,
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                children: [
                  new TextRun(cvData.basics.email),
                  new TextRun(" • "),
                  new TextRun(cvData.basics.phone),
                  new TextRun(" • "),
                  new TextRun(`${cvData.basics.location.city}, ${cvData.basics.location.region}`),
                ],
              }),
              new Paragraph({
                text: cvData.basics.summary,
                spacing: { before: 400, after: 400 },
              }),
              new Paragraph({
                text: "Work Experience",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400 },
              }),
              ...cvData.work.flatMap((job) => [
                new Paragraph({
                  text: job.company,
                  heading: HeadingLevel.HEADING_3,
                  spacing: { before: 200 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: job.position,
                      bold: true,
                    }),
                    new TextRun(" • "),
                    new TextRun(`${job.startDate} - ${job.endDate}`),
                  ],
                }),
                ...job.highlights.map(
                  (highlight) =>
                    new Paragraph({
                      text: `• ${highlight}`,
                      indent: { left: 400 },
                    })
                ),
              ]),
              new Paragraph({
                text: "Education",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400 },
              }),
              ...cvData.education.flatMap((edu) => [
                new Paragraph({
                  text: edu.institution,
                  heading: HeadingLevel.HEADING_3,
                  spacing: { before: 200 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${edu.studyType} ${edu.area}`,
                      bold: true,
                    }),
                    new TextRun(" • "),
                    new TextRun(`${edu.startDate} - ${edu.endDate}`),
                  ],
                }),
                edu.description
                  ? new Paragraph({
                      text: edu.description,
                      indent: { left: 400 },
                    })
                  : null,
              ]),
              new Paragraph({
                text: "Skills",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400 },
              }),
              ...cvData.skills.flatMap((skillGroup) => [
                new Paragraph({
                  text: skillGroup.name,
                  heading: HeadingLevel.HEADING_3,
                  spacing: { before: 200 },
                }),
                new Paragraph({
                  text: skillGroup.keywords.join(", "),
                  indent: { left: 400 },
                }),
              ]),
            ].filter(Boolean),
          },
        ],
      })

      const blob = await Packer.toBlob(doc)
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${cvData.basics.name.replace(/\s+/g, "-")}-CV.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting DOCX:", error)
      alert("Error exporting DOCX. Please try again.")
    }
  }

  return (
    <Button onClick={handleExport} variant="outline" size="sm">
      <FileText className="h-4 w-4 mr-2" />
      Export DOCX
    </Button>
  )
} 