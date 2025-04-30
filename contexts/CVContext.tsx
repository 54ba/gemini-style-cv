import { createContext, useContext, useState, ReactNode } from "react";
import { CVData } from "@/types/cv-types";
import { cvData as initialCVData } from "@/data/cv-data";

interface CVContextType {
  cvData: CVData;
  updateCVData: (newData: CVData) => void;
  updateField: (path: string[], value: any) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(initialCVData);

  const updateCVData = (newData: CVData) => {
    setCVData(newData);
  };

  const updateField = (path: string[], value: any) => {
    setCVData((prev) => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  return (
    <CVContext.Provider value={{ cvData, updateCVData, updateField }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
} 