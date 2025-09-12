"use client";

import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { PortfolioProject, Locale } from "@/data/types";

interface PortfolioSectionProps {
  portfolioData: PortfolioProject[];
  locale: Locale;
}

export default function PortfolioSection({ 
  portfolioData, 
  locale 
}: PortfolioSectionProps) {
  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-background/95">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 section-fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient-hero">
            Projetos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meus principais projetos e trabalhos desenvolvidos
          </p>
        </div>
        <div className="grid-portfolio">
          {portfolioData.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              locale={locale}
              onOpenProjectModal={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}