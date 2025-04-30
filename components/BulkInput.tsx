"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCV } from "@/contexts/CVContext";
import { CVData } from "@/types/cv-types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function BulkInput() {
  const [bulkData, setBulkData] = useState("");
  const { updateCVData } = useCV();
  const { toast } = useToast();

  const validateCVData = (data: any): data is CVData => {
    try {
      // Basic structure validation
      if (!data.basics || !data.work || !data.education || !data.skills) {
        return false;
      }

      // Basics validation
      const requiredBasicFields = ['name', 'label', 'email', 'phone', 'url', 'summary', 'location'];
      if (!requiredBasicFields.every(field => data.basics[field])) {
        return false;
      }

      // Location validation
      const requiredLocationFields = ['address', 'city', 'region', 'countryCode'];
      if (!requiredLocationFields.every(field => data.basics.location[field])) {
        return false;
      }

      // Arrays validation
      if (!Array.isArray(data.work) || !Array.isArray(data.education) || !Array.isArray(data.skills)) {
        return false;
      }

      // Work entries validation
      const hasValidWork = data.work.every((job: any) => 
        job.company && job.position && job.startDate && Array.isArray(job.highlights)
      );
      if (!hasValidWork) return false;

      // Education entries validation
      const hasValidEducation = data.education.every((edu: any) => 
        edu.institution && edu.area && edu.studyType && edu.startDate
      );
      if (!hasValidEducation) return false;

      // Skills validation
      const hasValidSkills = data.skills.every((skill: any) => 
        skill.name && skill.level && Array.isArray(skill.keywords)
      );
      if (!hasValidSkills) return false;

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(bulkData);
      
      if (!validateCVData(data)) {
        toast({
          title: "Invalid CV Data Format",
          description: "Please ensure your data follows the required structure and all required fields are present.",
          variant: "destructive",
        });
        return;
      }

      updateCVData(data);
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk CV Data Import</CardTitle>
          <CardDescription>
            Paste your CV data in JSON format to import it all at once.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="format">
                <AccordionTrigger>Data Format Instructions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Structure:</h4>
                      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
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
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "url": "https://linkedin.com/in/yourprofile",
        "username": "yourprofile"
      }
    ]
  },
  "work": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "website": "https://company.com",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ],
      "keywords": [
        "Skill 1",
        "Skill 2"
      ]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "area": "Field of Study",
      "studyType": "Degree",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": "Grade/GPA",
      "description": "Description of your studies"
    }
  ],
  "skills": [
    {
      "name": "Skill Category",
      "level": "Advanced",
      "keywords": [
        "Skill 1",
        "Skill 2",
        "Skill 3"
      ]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description",
      "highlights": [
        "Feature 1",
        "Feature 2"
      ],
      "keywords": [
        "Technology 1",
        "Technology 2"
      ],
      "url": "https://project-url.com"
    }
  ]
}`}
                      </pre>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Important Notes:</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                        <li>All dates should be in YYYY-MM format</li>
                        <li>The JSON must be properly formatted and valid</li>
                        <li>All required fields must be present (basics, work, education, skills)</li>
                        <li>Arrays (work, education, skills) must contain at least one item</li>
                        <li>Each section should follow the exact structure shown above</li>
                        <li>Projects section is optional</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-4">
              <Textarea
                placeholder="Paste your JSON formatted CV data here..."
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                className="min-h-[400px] font-mono"
              />
              <Button onClick={handleImport}>Import Data</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 