// src/utils/emailGenerator.ts

/**
 * Extracts and validates a domain from various input formats.
 * @param input - The input string which could be a URL or domain.
 * @returns The extracted domain or null if invalid.
 */
export const extractDomain = (input: string): string | null => {
  // Remove whitespace and convert to lowercase
  let cleanInput = input.trim().toLowerCase();
  
  try {
    // If the input includes a protocol, try to parse it as a URL
    if (cleanInput.includes('://')) {
      // Normalize multiple slashes in the URL path
      cleanInput = cleanInput.replace(/([^:]\/)\/+/g, "$1");
      const url = new URL(cleanInput);
      cleanInput = url.hostname;
    } else if (cleanInput.startsWith('www.')) {
      // Remove www. prefix if present
      cleanInput = cleanInput.substring(4);
    }
    
    // Remove any paths, query parameters, or fragments
    cleanInput = cleanInput.split('/')[0];
    
    // Basic domain validation
    if (cleanInput.includes('.') && !cleanInput.endsWith('.')) {
      return cleanInput;
    }
  } catch (error) {
    // URL parsing failed, try a more lenient approach
    // Extract domain using regex pattern
    const domainPattern = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/i;
    const match = cleanInput.match(domainPattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Validates if a string can be processed as a domain.
 * @param input - The input string to validate.
 * @returns True if the input can be processed as a domain, false otherwise.
 */
export const isValidDomain = (input: string): boolean => {
  return extractDomain(input) !== null;
};

/**
 * Generates a list of HR and hiring-related email addresses based on the provided domain.
 * @param input - The company domain or URL (e.g., example.com or https://www.example.com).
 * @returns An array of HR and hiring-related email addresses.
 */
export const generateCorporateEmails = (input: string): string[] => {
  const domain = extractDomain(input);
  
  if (!domain) {
    return [];
  }
  
  // Primary HR and recruitment email prefixes
  const hrPrefixes = [
    // Standard HR emails
    "hr",

    // Careers and jobs
    "careers",
    "career",
    "jobs",
    "job",
    "employment",
    "work",
    "workwithus",
    
    // Recruitment specific
    "recruiting",
    "recruiter",
    "recruitment",
    "recruit",
    "hiring",
    "hiringteam",
    "apply",
    "application",
    "applications",
    
    // Talent acquisition
    "talent",
    "talentacquisition",
    "talent.acquisition",
    "talents",
    
    // HR personnel titles
    "hr-manager",
    "hrmanager",
    "hr-team",
    "hrteam",
    "hrdepartment",
    
    // Recruitment personnel
    "recruiter",
    "recruiters",
    "recruitmentteam",
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
  ];

  // Generate emails by appending each prefix to the domain
  const emails = hrPrefixes.map((prefix) => `${prefix}@${domain}`);

  // Remove any potential duplicates and return the list
  return Array.from(new Set(emails));
};
