import { CVData } from "@/types/cv-types";

// Calculate ATS score based on CV content
export function calculateATSScore(cvData: CVData): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let totalPoints = 0;
  let maxPoints = 0;

  // Check basics
  if (cvData.basics) {
    // Name present and properly formatted
    if (cvData.basics.name && cvData.basics.name.trim().length > 0) {
      totalPoints += 10;
      maxPoints += 10;
    } else {
      feedback.push("Add your full name");
      maxPoints += 10;
    }

    // Email present
    if (cvData.basics.email && cvData.basics.email.includes("@")) {
      totalPoints += 10;
      maxPoints += 10;
    } else {
      feedback.push("Include a valid email address");
      maxPoints += 10;
    }

    // Phone present
    if (cvData.basics.phone && cvData.basics.phone.trim().length > 0) {
      totalPoints += 5;
      maxPoints += 5;
    } else {
      feedback.push("Add your phone number");
      maxPoints += 5;
    }

    // Location information
    if (cvData.basics.location && cvData.basics.location.city) {
      totalPoints += 5;
      maxPoints += 5;
    } else {
      feedback.push("Include your location (city/region)");
      maxPoints += 5;
    }

    // Professional summary
    if (cvData.basics.summary) {
      if (cvData.basics.summary.length < 50) {
        feedback.push(
          "Expand your professional summary (aim for 3-5 sentences)"
        );
        maxPoints += 15;
      } else if (cvData.basics.summary.length > 1000) {
        feedback.push(
          "Shorten your summary to be more concise (aim for 3-5 sentences)"
        );
        totalPoints += 10;
        maxPoints += 15;
      } else {
        totalPoints += 15;
        maxPoints += 15;
      }
    } else {
      feedback.push("Add a professional summary");
      maxPoints += 15;
    }
  }

  // Check work experience
  if (cvData.work && cvData.work.length > 0) {
    maxPoints += 30;

    // Check for quantity of work experiences
    if (cvData.work.length >= 2) {
      totalPoints += 10;
    } else {
      feedback.push("Include at least 2 work experiences if possible");
      totalPoints += 5;
    }

    // Check quality of work descriptions
    let hasGoodDescriptions = true;
    let hasActionVerbs = true;
    let hasResults = true;
    let hasDates = true;

    cvData.work.forEach((job) => {
      // Check if job has start and end dates
      if (!job.startDate || (!job.endDate && job.endDate !== "Present")) {
        hasDates = false;
      }

      // Check highlights quality
      if (job.highlights && job.highlights.length > 0) {
        // Check for action verbs and results in highlights
        const actionVerbRegex =
          /^(Led|Developed|Created|Managed|Implemented|Achieved|Reduced|Increased|Improved|Built|Designed|Launched|Collaborated|Executed|Generated|Optimized|Produced|Resolved|Streamlined|Transformed)/i;
        const resultsRegex =
          /(increased|decreased|reduced|improved|grew|achieved|gained|saved|delivered|generated|resulted|succeeded)/i;

        let actionVerbCount = 0;
        let resultsCount = 0;

        job.highlights.forEach((highlight) => {
          if (actionVerbRegex.test(highlight)) actionVerbCount++;
          if (resultsRegex.test(highlight)) resultsCount++;

          // If highlight is too short, mark descriptions as not good
          if (highlight.length < 20) hasGoodDescriptions = false;
        });

        if (actionVerbCount < job.highlights.length / 2) hasActionVerbs = false;
        if (resultsCount < job.highlights.length / 3) hasResults = false;
      } else {
        hasGoodDescriptions = false;
      }
    });

    if (hasGoodDescriptions) totalPoints += 5;
    else feedback.push("Expand your job descriptions with more details");

    if (hasActionVerbs) totalPoints += 5;
    else feedback.push("Begin achievement bullets with strong action verbs");

    if (hasResults) totalPoints += 5;
    else feedback.push("Include measurable results in your job descriptions");

    if (hasDates) totalPoints += 5;
    else feedback.push("Include clear start and end dates for all positions");
  } else {
    feedback.push("Add work experience");
    maxPoints += 30;
  }

  // Check skills
  if (cvData.skills && cvData.skills.length > 0) {
    maxPoints += 15;
    let totalKeywords = 0;

    cvData.skills.forEach((skillGroup) => {
      if (skillGroup.keywords) {
        totalKeywords += skillGroup.keywords.length;
      }
    });

    if (totalKeywords > 15) {
      totalPoints += 15;
    } else if (totalKeywords > 8) {
      totalPoints += 10;
      feedback.push("Add more relevant skills (aim for 15+ skills total)");
    } else if (totalKeywords > 4) {
      totalPoints += 5;
      feedback.push("Add more relevant skills (aim for 15+ skills total)");
    } else {
      feedback.push("Add more relevant skills (aim for 15+ skills total)");
    }
  } else {
    feedback.push("Add relevant skills");
    maxPoints += 15;
  }

  // Check education
  if (cvData.education && cvData.education.length > 0) {
    maxPoints += 10;
    let hasCompleteEducation = true;

    cvData.education.forEach((edu) => {
      if (
        !edu.institution ||
        !edu.area ||
        !edu.studyType ||
        !edu.startDate ||
        !edu.endDate
      ) {
        hasCompleteEducation = false;
      }
    });

    if (hasCompleteEducation) {
      totalPoints += 10;
    } else {
      totalPoints += 5;
      feedback.push(
        "Complete all education fields (institution, degree, dates)"
      );
    }
  } else {
    feedback.push("Add education details");
    maxPoints += 10;
  }

  // Check projects (if any)
  if (cvData.projects && cvData.projects.length > 0) {
    maxPoints += 10;
    let hasGoodProjects = true;

    cvData.projects.forEach((project) => {
      if (
        !project.name ||
        !project.description ||
        project.description.length < 30
      ) {
        hasGoodProjects = false;
      }

      // Bonus for having keywords/tech stack in projects
      if (!project.keywords || project.keywords.length < 2) {
        hasGoodProjects = false;
      }
    });

    if (hasGoodProjects) {
      totalPoints += 10;
    } else {
      totalPoints += 5;
      feedback.push(
        "Enhance project descriptions and include tech stack for each project"
      );
    }
  }

  // Calculate final score as percentage
  const score = Math.round((totalPoints / maxPoints) * 100);

  // Sort feedback by importance
  feedback.sort((a, b) => {
    const priorityA = getPriorityScore(a);
    const priorityB = getPriorityScore(b);
    return priorityB - priorityA;
  });

  return {
    score,
    feedback: feedback.slice(0, 5), // Limit to top 5 feedback items
  };
}

// Helper function to determine priority of feedback items
function getPriorityScore(feedback: string): number {
  if (feedback.includes("name") || feedback.includes("email")) return 10;
  if (feedback.includes("work experience")) return 9;
  if (
    feedback.includes("action verbs") ||
    feedback.includes("measurable results")
  )
    return 8;
  if (feedback.includes("skills")) return 7;
  if (feedback.includes("summary")) return 6;
  if (feedback.includes("education")) return 5;
  if (feedback.includes("project")) return 4;
  if (feedback.includes("dates")) return 3;
  return 1;
}
