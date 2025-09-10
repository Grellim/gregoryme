export interface ProfileSection {
  title: string;
  description: string;
}

export interface ProfileData {
  name: string;
  subtitle: string;
  badges: string[];
  experience: ProfileSection;
  techStack: {
    title: string;
    skills: string[];
  };
  mission: ProfileSection;
}

export const profileData: ProfileData = {
  name: "Gregory Vallim",
  subtitle: "Desenvolvedor full-stack apaixonado por criar soluções inovadoras e impactantes. Especializado em tecnologias modernas com foco em performance, segurança e experiência do usuário excepcional.",
  badges: [
    "🚀 Full-Stack Developer",
    "💻 React & Next.js Expert",
    "🎨 UI/UX Design",
    "☁️ Cloud & DevOps",
    "🧠 Problem Solver"
  ],
  experience: {
    title: "Experiência",
    description: "Mais de 5 anos desenvolvendo aplicações web e mobile modernas. Especializado em criar interfaces intuitivas, sistemas escaláveis e soluções que realmente fazem a diferença para empresas e usuários."
  },
  techStack: {
    title: "Stack Tecnológica",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"]
  },
  mission: {
    title: "Minha Missão",
    description: "Criar experiências digitais que transformam vidas e negócios através da tecnologia. Acredito que cada projeto deve ser uma oportunidade de inovar e impactar positivamente o mundo ao nosso redor."
  }
};