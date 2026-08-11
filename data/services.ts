export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  image?: string;
  description?: string;
  isTextCard?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: "xray",
    number: "[1]",
    title: "3D scans and X-rays",
    image: "/images/service-xray.jpg",
    description: "High-precision digital 3D tomography and low-radiation panoramic scans for exact treatment planning.",
  },
  {
    id: "surgery",
    number: "[2]",
    title: "Surgery",
    image: "/images/service-surgery.jpg",
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
    title: "Pediatric general practitioner",
    image: "/images/service-pediatric.jpg",
    description: "Gentle dental care tailored specifically for children in a calm, stress-free environment.",
  },
];
