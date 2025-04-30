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

export default function CVPage() {
  const [activeTheme, setActiveTheme] = useState<"geminiDark" | "chatGPTLight">("chatGPTLight")
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
              <div className="flex justify-between items-center mt-4">
                <Tabs value={activeTheme} onValueChange={(value) => setActiveTheme(value as "geminiDark" | "chatGPTLight")}>
                  <TabsList>
                    <TabsTrigger value="chatGPTLight">ChatGPT Style</TabsTrigger>
                    <TabsTrigger value="geminiDark">Gemini Style</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex gap-2">
                  <DOCXExport theme={activeTheme} />
                  <PDFExport cvRef={cvRef} theme={activeTheme} />
                  <Button onClick={handlePrint} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
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

