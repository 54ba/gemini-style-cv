export interface CVData {
  basics: {
    name: string
    label: string
    email: string
    phone: string
    url: string
    summary: string
    location: {
      address: string
      postalCode: string
      city: string
      region: string
      countryCode: string
    }
    profiles: Array<{
      network: string
      username: string
      url: string
    }>
  }
  work: Array<{
    company: string
    position: string
    website: string
    startDate: string
    endDate?: string
    highlights: string[]
    keywords?: string[]
  }>
  education: Array<{
    institution: string
    area: string
    studyType: string
    startDate: string
    endDate: string
    gpa?: string
    description?: string
  }>
  skills: Array<{
    name: string
    level: string
    keywords: string[]
  }>
  projects?: Array<{
    name: string
    description: string
    highlights?: string[]
    keywords?: string[]
    url?: string
  }>
  certificates?: Array<{
    name: string
    date: string
    issuer: string
    url?: string
  }>
}
