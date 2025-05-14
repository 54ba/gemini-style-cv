"use client";

import { useState, useEffect } from "react";
import { useCV } from "@/contexts/CVContext";
import { calculateATSScore } from "@/utils/atsScoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, AlertCircle, Check, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ATSScoreDisplay() {
  const { cvData } = useCV();
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const { score, feedback } = calculateATSScore(cvData);
    setScore(score);
    setFeedback(feedback);
  }, [cvData]);

  const getScoreColor = () => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBackgroundColor = () => {
    if (score >= 85) return "bg-green-100 dark:bg-green-900/20";
    if (score >= 70) return "bg-blue-100 dark:bg-blue-900/20";
    if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900/20";
    return "bg-red-100 dark:bg-red-900/20";
  };

  const getScoreMessage = () => {
    if (score >= 85) return "Excellent! Your CV is highly ATS-friendly.";
    if (score >= 70) return "Good! Your CV is ATS-friendly but has room for improvement.";
    if (score >= 50) return "Fair. Your CV might be filtered by some ATS systems.";
    return "Needs improvement. Your CV may struggle to pass ATS scans.";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" /> 
          ATS Compatibility Score 
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>ATS (Applicant Tracking System) is software used by employers to filter and manage job applications. A high ATS score means your CV is more likely to pass automated screening.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          <div className={`flex items-center justify-center w-24 h-24 rounded-full ${getScoreBackgroundColor()} mb-2`}>
            <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}%</span>
          </div>
          <Progress value={score} className="w-full h-2 mt-2" />
          <p className="text-sm mt-2 text-muted-foreground text-center">{getScoreMessage()}</p>
        </div>

        {feedback.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center mb-1">
              <Lightbulb className="h-4 w-4 mr-1" /> Improvement Suggestions:
            </h4>
            <ul className="space-y-1.5">
              {feedback.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2 mt-0.5">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {feedback.length === 0 && (
          <div className="flex items-center justify-center py-2">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium">Perfect! No improvements needed.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 