// src/utils/emailGenerator.ts

/**
 * Validates if the provided domain follows a standard format.
 * @param domain - The domain string to validate.
 * @returns Boolean indicating whether the domain is valid.
 */
export const isValidDomain = (domain: string): boolean =>
  /^[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(domain);

/**
 * Generates a list of common company-specific email addresses based on the provided domain.
 * @param domain - The company domain (e.g., example.com).
 * @returns An array of company-related email addresses.
 */
export const generateCorporateEmails = (domain: string): string[] => {
  const commonPrefixes = [
    "contact",
    "info",
    "support",
    "careers",
    "hr",
    "jobs",
    "recruitment",
    "admin",
    "marketing",
    "sales",
    "billing",
    "finance",
    "services",
    "inquiries",
    "webmaster",
    "feedback",
    "press",
    "media",
    "legal",
    "security",
    "it",
    "operations",
    "customerservice",
    "product",
    "partnerships",
    "media",
    "techsupport",
    "privacy",
    "compliance",
    "office",
    "officehours",
    "team",
    "management",
    "info",
  ];

  // Generate emails by appending each prefix to the domain
  const emails = commonPrefixes.map((prefix) => `${prefix}@${domain}`);

  // Remove any potential duplicates and return the list
  return Array.from(new Set(emails));
};
