"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, X } from "lucide-react";

interface TemplateATSInfoProps {
  template: "geminiDark" | "chatGPTLight";
}

export function TemplateATSInfo({ template }: TemplateATSInfoProps) {
  const templateScores = {
    geminiDark: {
      score: 85,
      pros: [
        "Clean, modern design",
        "Good content hierarchy",
        "Readable typography",
        "Proper section separation"
      ],
      cons: [
        "Dark theme may not print well without adjustments",
        "Some ATS systems may struggle with gradient text"
      ]
    },
    chatGPTLight: {
      score: 92,
      pros: [
        "Simple, traditional layout",
        "High text contrast",
        "Print-friendly design",
        "Standard section formatting"
      ],
      cons: [
        "Less visual emphasis on section headers"
      ]
    }
  };

  const templateInfo = templateScores[template];

  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
          <h3 className="text-sm font-medium">Template ATS Compatibility</h3>
          <Badge 
            variant="outline" 
            className={`ml-auto ${
              templateInfo.score >= 90 
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
            }`}
          >
            {templateInfo.score}%
          </Badge>
        </div>
        
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium mb-1 flex items-center">
              <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
              Strengths
            </h4>
            <ul className="space-y-1 pl-5 list-disc text-muted-foreground">
              {templateInfo.pros.map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </div>
          
          {templateInfo.cons.length > 0 && (
            <div>
              <h4 className="font-medium mb-1 flex items-center">
                <X className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                Considerations
              </h4>
              <ul className="space-y-1 pl-5 list-disc text-muted-foreground">
                {templateInfo.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 