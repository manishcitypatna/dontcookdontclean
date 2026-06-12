export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I hire a maid or domestic helper?",
    answer:
      "Simply submit your requirements through our website or contact our team. We'll help match you with a verified helper based on your household needs.",
  },
  {
    id: 2,
    question: "Are all helpers background verified?",
    answer:
      "Yes. We perform identity verification and background checks before recommending helpers to families.",
  },
  {
    id: 3,
    question: "What if the helper is not the right fit?",
    answer:
      "We offer replacement assistance and work closely with families to find a more suitable match whenever required.",
  },
  {
    id: 4,
    question: "Can I hire helpers for part-time work?",
    answer:
      "Yes. We provide both part-time and full-time domestic helper options depending on your requirements.",
  },
  {
    id: 5,
    question: "What services can domestic helpers provide?",
    answer:
      "Services may include house cleaning, cooking, laundry, childcare assistance, elder care support, and other household tasks.",
  },
  {
    id: 6,
    question: "How long does the hiring process take?",
    answer:
      "The timeline varies based on availability and requirements, but most families receive suitable matches within a few days.",
  },
];