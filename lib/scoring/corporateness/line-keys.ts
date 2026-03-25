/**
 * Kararlı satır kimlikleri — öneri metinleri ve UI eşlemesi için.
 */
export const LINE_KEYS = {
  legal: {
    structure: "legal.company_structure",
    taxNumber: "legal.tax_number",
    license: "legal.license_number",
    physicalOffice: "legal.physical_office",
    corporateEmail: "legal.corporate_email",
    officeVerified: "legal.office_verified",
  },
  operations: {
    employees: "ops.employee_count",
    consultants: "ops.consultant_count",
    offices: "ops.office_count",
  },
  digital: {
    websiteQuality: "digital.website_quality",
    followers: "digital.total_followers",
    posts: "digital.total_posts",
  },
  content: {
    descriptions: "content.descriptions",
    seoBundle: "content.seo_fields",
    logo: "content.logo",
  },
  services: {
    countries: "svc.countries_served",
    subServices: "svc.sub_services",
    specialization: "svc.specialization_flags",
  },
} as const;
