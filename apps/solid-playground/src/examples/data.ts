export const countries = [
  { label: "Canada", value: "CA" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
  { label: "Japan (unavailable in this demo)", value: "JP", disabled: true },
  { label: "New Zealand", value: "NZ" },
  { label: "Spain", value: "ES" },
  { label: "United Kingdom of Great Britain and Northern Ireland", value: "GB" },
  { label: "United States", value: "US" },
  { label: "Zambia", value: "ZM" },
];

export const timezones = [
  { label: "Central European Time (UTC+01:00)", value: "cet" },
  { label: "Eastern Time (UTC−05:00)", value: "et" },
  { label: "Greenwich Mean Time (UTC+00:00)", value: "gmt" },
  { label: "India Standard Time (UTC+05:30)", value: "ist" },
  { label: "Japan Standard Time (unavailable in this demo)", value: "jst", disabled: true },
  { label: "Pacific Time (UTC−08:00)", value: "pt" },
  { label: "Coordinated Universal Time", value: "utc" },
];

export type Document = {
  id: string;
  name: string;
  owner: string;
  status: "Published" | "In review" | "Draft";
  words: number;
};

export const documents: Document[] = [
  {
    id: "DOC-1041",
    name: "Onboarding checklist",
    owner: "A. Rivera",
    status: "Published",
    words: 1240,
  },
  { id: "DOC-1042", name: "Release notes", owner: "M. Chen", status: "In review", words: 860 },
  { id: "DOC-1043", name: "Support playbook", owner: "J. Patel", status: "Draft", words: 2130 },
  { id: "DOC-1044", name: "Security policy", owner: "L. Novak", status: "Published", words: 1975 },
];
