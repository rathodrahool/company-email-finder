// src/utils/emailGenerator.ts

/**
 * Validates if a string is a properly formatted domain.
 * @param domain - The domain string to validate.
 * @returns True if the domain is valid, false otherwise.
 */
export const isValidDomain = (domain: string): boolean => {
  // Basic domain validation regex
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return domainRegex.test(domain);
};

/**
 * Generates a list of HR and hiring-related email addresses based on the provided domain.
 * @param domain - The company domain (e.g., example.com).
 * @returns An array of HR and hiring-related email addresses.
 */
export const generateCorporateEmails = (domain: string): string[] => {
  // Primary HR and recruitment email prefixes
  const hrPrefixes = [
    // Standard HR emails
    "hr",
    "humanresources",
    "human-resources",
    "human.resources",
    "h.r",
    
    // Careers and jobs
    "careers",
    "career",
    "jobs",
    "job",
    "employment",
    "work",
    "workwithus",
    "work-with-us",
    
    // Recruitment specific
    "recruiting",
    "recruiter",
    "recruitment",
    "recruit",
    "hiring",
    "hiringteam",
    "hiring-team",
    "apply",
    "application",
    "applications",
    
    // Talent acquisition
    "talent",
    "talentacquisition",
    "talent-acquisition",
    "talent.acquisition",
    "talents",
    
    // HR personnel titles
    "hr-manager",
    "hrmanager",
    "hr-director",
    "hrdirector",
    "hr-team",
    "hrteam",
    "hr-department",
    "hrdepartment",
    
    // Recruitment personnel
    "recruiter",
    "recruiters",
    "recruitment-team",
    "recruitmentteam",
    "talent-manager",
    "talentmanager",
    
    // Application specific
    "apply-jobs",
    "applyjobs",
    "jobapplication",
    "job-application",
    "jobapplications",
    "job-applications",
    "resume",
    "resumes",
    "cv",
    "cvs",
    
    // Internship specific
    "internship",
    "internships",
    "intern",
    "interns",
    
    // Regional variations
    "careers-us",
    "careers-uk",
    "careers-eu",
    "careers-asia",
    
    // Department specific
    "techjobs",
    "tech-jobs",
    "tech-careers",
    "engineering-jobs",
    "sales-jobs",
    "marketing-jobs",
    
    // Common combinations
    "jobs-careers",
    "careers-jobs",
    "join-us",
    "joinus",
    "join-team",
    "jointeam",
    "join",
    
    // Opportunity related
    "opportunities",
    "opportunity",
    "career-opportunities",
    "careeropportunities",
    
    // Staffing related
    "staffing",
    "staff",
    "personnel",
  ];

  // Generate emails by appending each prefix to the domain
  const emails = hrPrefixes.map((prefix) => `${prefix}@${domain}`);

  // Remove any potential duplicates and return the list
  return Array.from(new Set(emails));
};
