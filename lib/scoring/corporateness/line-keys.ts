/**
 * Kararlı satır kimlikleri — öneri metinleri ve UI eşlemesi için.
 * Değerler persisted JSON içinde saklanabilir; yeniden adlandırırken migration düşünün.
 */
export const LINE_KEYS = {
  legal: {
    taxDocument: "legal.tax_document",
    companyType: "legal.company_type",
    permit: "legal.permit",
    physicalOffice: "legal.physical_office",
    corporateEmail: "legal.corporate_email",
  },
  operations: {
    employees: "ops.employees",
    workingHours: "ops.working_hours",
    phone: "ops.phone",
    whatsapp: "ops.whatsapp",
    mapsUrl: "ops.maps_url",
    completeContact: "ops.complete_contact_set",
  },
  digital: {
    websiteQuality: "digital.website_quality",
    socialPresence: "digital.social_presence",
    followers: "digital.followers",
    posts: "digital.posts",
  },
  content: {
    logo: "content.logo",
    logoAlt: "content.logo_alt",
    shortDesc: "content.short_description",
    longDesc: "content.long_description",
    pageHeading: "content.page_heading",
    pageSubheading: "content.page_subheading",
    seoTitle: "content.seo_title",
    metaDescription: "content.meta_description",
    tags: "content.tags",
    ogFields: "content.og_fields",
  },
  services: {
    countries: "svc.countries",
    mainCategories: "svc.main_categories",
    subServices: "svc.sub_services",
    customTags: "svc.custom_tags",
  },
} as const;
