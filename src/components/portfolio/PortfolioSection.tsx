"use client";

import { useState, useMemo } from "react";
import { Input, Button } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    portfolioData.forEach(project => {
      project.technologies.forEach(tech => tags.add(tech));
    });
    return Array.from(tags).sort();
  }, [portfolioData]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return portfolioData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => project.technologies.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [portfolioData, searchTerm, selectedTags]);

  // Generate random span for masonry effect (1-3 rows)
  const getRandomSpan = () => Math.floor(Math.random() * 3) + 1;

  return (
    <section
      id="projects"
      className={cn(
        "py-16 md:py-24 px-4 bg-background/95",
        "grid-portfolio-masonry"
      )}
      role="region"
      aria-label="Portfolio Projects"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 section-fade">
          <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient-hero">
            {locale.ui.projectDetails.knowMore || "Projetos"}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {locale.ui.projectDetails.moreAbout || "Meus principais projetos e trabalhos desenvolvidos"}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-center">
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
            aria-label="Buscar projetos"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label={`Toggle filter ${tag}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTags([])}
              aria-label="Clear filters"
            >
              Limpar filtros
            </Button>
          )}
        </div>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
            "auto-rows-fr",
            "[grid-template-rows:masonry]"
          )}
          style={{
            // Fallback for non-masonry browsers
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gridAutoRows: 'minmax(200px, auto)'
          }}
        >
          {portfolioData.map((project, index) => {
            const span = getRandomSpan();
            return (
              <PortfolioCard
                key={project.id}
                project={project}
                locale={locale}
                onOpenProjectModal={() => {}}
                gridSpan={span}
                style={{ gridRowEnd: `span ${span}` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}