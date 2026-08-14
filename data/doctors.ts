export interface Doctor {
  id: string;
  indexStr: string;
  rating: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  bio: string;
  image: string;
}

export const doctorsData: Doctor[] = [
  {
    id: "dr-manishpala",
    indexStr: "1/1",
    rating: "5.0",
    name: "Dr. Manishpala",
    qualification: "MDS - Paedodontics And Preventive Dentistry, BDS",
    specialization: "Preventive Dentistry, Pediatric Dentist",
    experience: "13 Years Experience Overall (12 years as specialist)",
    bio: "Dr. Manishpala, Pediatric Dentist, completed her Masters at Army College of Dental Sciences. Having practiced across leading multi-speciality clinics, she possesses deep clinical expertise in comprehensive dental care including Root Canals, Pulpectomy, and advanced Laser Treatment procedures for infants, kids, and adults.",
    image: "/images/doctor.png",
  },
];
