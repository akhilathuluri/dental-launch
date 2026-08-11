export interface Doctor {
  id: string;
  indexStr: string;
  rating: string;
  name: string;
  experience: string;
  bio: string;
  image: string;
}

export const doctorsData: Doctor[] = [
  {
    id: "tony-ware",
    indexStr: "2/5",
    rating: "5.0",
    name: "Tony Ware",
    experience: "Work experience of 6 years",
    bio: "A qualified and experienced dentist who specialises in providing high-quality and effective dental services. Over the years of his practice, the doctor has successfully helped many patients to improve their oral health, cope with various diseases and dental problems.",
    image: "/images/doctor-tony.jpg",
  },
  {
    id: "elena-rossi",
    indexStr: "3/5",
    rating: "4.9",
    name: "Dr. Elena Rossi",
    experience: "Work experience of 9 years",
    bio: "Expert orthodontist and cosmetic dental surgeon dedicated to creating natural, beautiful smiles with modern clear aligner systems and porcelain restorations.",
    image: "/images/hero-patient.jpg",
  },
];
