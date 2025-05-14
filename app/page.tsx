"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatGptCvDesign, GeminiCvDesign } from "@/components/cv-designs"
import { Download, FileText, Printer } from "lucide-react"
import { cvData } from "@/data/cv-data"
import { DOCXExport } from "@/components/DOCXExport"
import { PDFExport } from "@/components/PDFExport"
import { CVProvider } from "@/contexts/CVContext"
import { BulkInput } from "@/components/BulkInput"
import { ATSScoreDisplay } from "@/components/ATSScoreDisplay"
import { TemplateATSInfo } from "@/components/TemplateATSInfo"

export default function CVPage() {
  const [activeTheme, setActiveTheme] = useState<"geminiDark" | "chatGPTLight">("geminiDark")
  const [activeTab, setActiveTab] = useState<"design" | "bulk">("design")
  const cvRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  return (
    <CVProvider>
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-4 mb-8 print:hidden">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "design" | "bulk")}>
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
            </TabsList>
            <TabsContent value="design">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <Tabs value={activeTheme} onValueChange={(value) => setActiveTheme(value as "geminiDark" | "chatGPTLight")}>
                    <TabsList className="w-full">
                      <TabsTrigger value="chatGPTLight" className="w-1/2">ChatGPT Style</TabsTrigger>
                      <TabsTrigger value="geminiDark" className="w-1/2">Gemini Style</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <TemplateATSInfo template={activeTheme} />
                </div>
                
                <div>
                  <ATSScoreDisplay />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-6 mb-8">
                <DOCXExport theme={activeTheme} />
                <PDFExport cvRef={cvRef} theme={activeTheme} />
                <Button onClick={handlePrint} variant="outline" size="sm" className="w-full sm:w-auto">
                  <Printer className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Print</span>
                  <span className="sm:hidden">Print</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="bulk">
              <BulkInput />
            </TabsContent>
          </Tabs>
        </div>
        {activeTab === "design" && (
          <div ref={cvRef}>
            {activeTheme === "chatGPTLight" ? (
              <ChatGptCvDesign />
            ) : (
              <GeminiCvDesign />
            )}
          </div>
        )}
      </div>
    </CVProvider>
  )
}

