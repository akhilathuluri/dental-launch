export interface SpecializedService {
  id: string;
  title: string;
  category: 'Orthodontics' | 'Restorative' | 'Surgical & Endodontics' | 'Preventive & Gum Care';
  description: string;
  iconName: string;
  tag: string;
}

export interface PrimaryServiceCard {
  id: string;
  number: string;
  title: string;
  image?: string;
  description?: string;
  isTextCard?: boolean;
}

export const primaryServices: PrimaryServiceCard[] = [
  {
    id: "xray",
    number: "[1]",
    title: "x-rays",
    image: "/images/service-xray.jpg",
    description: "High-precision digital 3D tomography and low-radiation panoramic scans for exact treatment planning.",
  },
  {
    id: "surgery",
    number: "[2]",
    title: "Surgery",
    image: "/images/clinic-operating.jpg",
    description: "Painless surgical interventions, wisdom tooth extractions, and advanced implantology procedures.",
  },
  {
    id: "cleaning",
    number: "[3]",
    title: "Dental cleaning",
    image: "/images/service-cleaning.jpg",
    description: "Professional ultrasonic hygiene, enamel polishing, and deep preventive stain removal.",
  },
  {
    id: "care-card",
    number: "",
    title: "Your smile is our priority",
    description: "We care about you. Every procedure is customized to ensure maximum comfort and gentle care.",
    isTextCard: true,
  },
  {
    id: "pediatric",
    number: "[4]",
    title: "Paediatric general practitioner",
    image: "/images/service-pediatric.jpg",
    description: "Gentle dental care tailored specifically for children in a calm, stress-free environment.",
  },
];

export const allSpecializedServices: SpecializedService[] = [
  {
    id: "braces",
    title: "Teeth Braces",
    category: "Orthodontics",
    description: "Traditional ceramic and metallic braces for precise dental alignment.",
    iconName: "Sparkles",
    tag: "Popular",
  },
  {
    id: "ulcers",
    title: "Mouth Ulcers Treatment",
    category: "Preventive & Gum Care",
    description: "Fast-acting laser and topical therapeutic care for painful mouth sores.",
    iconName: "ShieldAlert",
    tag: "Therapeutic",
  },
  {
    id: "implant",
    title: "Dental Implant",
    category: "Restorative",
    description: "Titanium root replacements topped with realistic porcelain crowns.",
    iconName: "Layers",
    tag: "Permanent",
  },
  {
    id: "aligners",
    title: "Aligners",
    category: "Orthodontics",
    description: "Near-invisible removable aligner trays for discrete smile correction.",
    iconName: "Zap",
    tag: "Invisible",
  },
  {
    id: "kids",
    title: "Kids Dentistry",
    category: "Preventive & Gum Care",
    description: "Child-friendly preventive checkups, sealants, and cavity treatments.",
    iconName: "Smile",
    tag: "Gentle",
  },
  {
    id: "laser",
    title: "Laser Dentistry",
    category: "Surgical & Endodontics",
    description: "Painless water-laser gum contouring and cavity preparation.",
    iconName: "Flame",
    tag: "Advanced",
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    category: "Surgical & Endodontics",
    description: "Single-sitting rotary endodontics preserving your natural tooth structure.",
    iconName: "Activity",
    tag: "Painless",
  },
  {
    id: "crowns",
    title: "Dental Crowns",
    category: "Restorative",
    description: "Durable Zirconia and E-max porcelain caps restoring damaged teeth.",
    iconName: "ShieldCheck",
    tag: "Restorative",
  },
  {
    id: "fillings",
    title: "Dental Fillings",
    category: "Restorative",
    description: "Tooth-colored composite resins seamless with natural enamel.",
    iconName: "CheckCircle2",
    tag: "Aesthetic",
  },
  {
    id: "wisdom",
    title: "Wisdom Teeth Extraction",
    category: "Surgical & Endodontics",
    description: "Precision surgical removal of impacted third molars under sedation.",
    iconName: "Scissors",
    tag: "Surgical",
  },
  {
    id: "dentures",
    title: "Dentures",
    category: "Restorative",
    description: "Custom-fitted complete and partial removable prosthetics.",
    iconName: "HeartPulse",
    tag: "Comfort",
  },
  {
    id: "gum-treatment",
    title: "Advanced Gum Treatment",
    category: "Preventive & Gum Care",
    description: "Periodontal deep scaling, root planing, and laser gum therapy.",
    iconName: "Stethoscope",
    tag: "Periodontal",
  },
];
