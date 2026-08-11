export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home", isActive: true },
  { label: "Doctors", href: "#clinic" },
  { label: "Price list", href: "#services" },
  { label: "Contact", href: "#appointment" },
  { label: "Team", href: "#team" },
];

export const footerNavigation = {
  solutions: [
    { label: "Social Ads", href: "#" },
    { label: "SaaS marketing", href: "#" },
    { label: "Marketing", href: "#" },
    { label: "SEO", href: "#" },
  ],
  company: [
    { label: "About", href: "#clinic" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
  ],
  support: [
    { label: "Pricing", href: "#services" },
    { label: "Documentation", href: "#" },
  ],
  legal: [
    { label: "Claim", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};
