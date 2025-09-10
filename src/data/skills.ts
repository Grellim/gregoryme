export interface Skill {
  name: string;
  icon: string; // SVG path or component reference
  description: string;
  proficiency: number; // 0-100
}

export const skillsData: Skill[] = [
  {
    name: "React",
    icon: "M0 0v8h8V0H0zm8 8v8h8V8H8z", // Placeholder SVG path for React logo
    description: "JavaScript library for building user interfaces",
    proficiency: 95
  },
  {
    name: "Next.js",
    icon: "M0 0v8h8V0H0zm8 8v8h8V8H8z", // Placeholder
    description: "React framework for production apps",
    proficiency: 90
  },
  {
    name: "TypeScript",
    icon: "M0 0v8h8V0H0zm8 8v8h8V8H8z", // Placeholder
    description: "Typed superset of JavaScript",
    proficiency: 85
  },
  {
    name: "Tailwind CSS",
    icon: "M0 0v8h8V0H0zm8 8v8h8V8H8z", // Placeholder
    description: "Utility-first CSS framework",
    proficiency: 80
  },
  {
    name: "Node.js",
    icon: "M0 0v8h8V0H0zm8 8v8h8V8H8z", // Placeholder
    description: "JavaScript runtime built on Chrome's V8",
    proficiency: 75
  },
  {
    name: "Prisma",
    icon: "M0 0v8h8V0H0zm8 8v8h8V8H8z", // Placeholder
    description: "Next-generation ORM for Node.js & TypeScript",
    proficiency: 70
  }
];