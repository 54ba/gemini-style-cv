"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCV } from "@/contexts/CVContext";

export default function BulkInput() {
  const [bulkData, setBulkData] = useState("");
  const { updateCV } = useCV();
  const { toast } = useToast();

  const handleBulkImport = () => {
    try {
      const data = JSON.parse(bulkData);
      updateCV(data);
      toast({
        title: "Success",
        description: "CV data has been successfully imported",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format. Please check your input.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Bulk CV Data Import</CardTitle>
          <CardDescription>
            Paste your CV data in JSON format to import it all at once.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Your data should be in valid JSON format</p>
                <p>2. The structure should match the following format:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`{
  "basics": {
    "name": "Your Name",
    "label": "Your Title",
    "email": "your.email@example.com",
    "phone": "+1234567890",
    "url": "https://yourwebsite.com",
    "summary": "Your professional summary",
    "location": {
      "address": "123 Street Name",
      "city": "City",
      "countryCode": "Country",
      "region": "Region"
    }
  },
  "work": [
    {
      "name": "Company Name",
      "position": "Job Title",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "summary": "Job description",
      "highlights": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "area": "Field of Study",
      "studyType": "Degree",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "score": "Grade/GPA"
    }
  ],
  "skills": [
    {
      "name": "Skill Category",
      "keywords": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description",
      "highlights": ["Feature 1", "Feature 2"],
      "keywords": ["Technology 1", "Technology 2"],
      "url": "https://project-url.com"
    }
  ]
}`}
                </pre>
                <p>3. Make sure all dates are in YYYY-MM format</p>
                <p>4. All arrays (work, education, skills, etc.) should contain at least one item</p>
                <p>5. After pasting, click "Import Data" to update your CV</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Paste Your CV Data</h3>
              <Textarea
                placeholder="Paste your JSON formatted CV data here..."
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                className="min-h-[400px] font-mono"
              />
              <Button onClick={handleBulkImport}>Import Data</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 