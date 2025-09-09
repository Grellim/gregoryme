"use client";

interface Recommendation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  type: "person" | "channel";
}

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecommendationsModal({ isOpen, onClose }: RecommendationsModalProps) {
  if (!isOpen) return null;

  const recommendations: Recommendation[] = [
    {
      id: "1",
      name: "Fernanda Silva",
      description: "Desenvolvedora Full Stack especializada em React e Node.js. Cria soluções inovadoras para problemas complexos.",
      imageUrl: "/person1.jpg",
      link: "https://github.com/fernandasilva",
      type: "person"
    },
    {
      id: "2",
      name: "Tech Insights",
      description: "Canal sobre as últimas tendências em tecnologia e desenvolvimento de software.",
      imageUrl: "/channel1.jpg",
      link: "https://youtube.com/techinsights",
      type: "channel"
    },
    {
      id: "3",
      name: "Carlos Santos",
      description: "Especialista em UX/UI Design com foco em acessibilidade e design inclusivo.",
      imageUrl: "/person2.jpg",
      link: "https://linkedin.com/in/carlossantos",
      type: "person"
    },
    {
      id: "4",
      name: "Code Masters",
      description: "Canal educativo com tutoriais de programação e boas práticas de desenvolvimento.",
      imageUrl: "/channel2.jpg",
      link: "https://youtube.com/codemasters",
      type: "channel"
    },
    {
      id: "5",
      name: "Ana Costa",
      description: "Engenheira de Cloud com expertise em AWS e arquitetura de sistemas escaláveis.",
      imageUrl: "/person3.jpg",
      link: "https://twitter.com/anacosta",
      type: "person"
    },
    {
      id: "6",
      name: "Dev Brasil",
      description: "Comunidade de desenvolvedores brasileiros compartilhando conhecimento e experiências.",
      imageUrl: "/channel3.jpg",
      link: "https://discord.gg/devbrasil",
      type: "channel"
    },
  ];

  const handleVisit = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="relative bg-card border border-border rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold font-poppins">Pessoas e Canais Recomendados</h2>
            <p className="text-muted-foreground mt-1">Conheça profissionais e canais que inspiram e ensinam</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="bg-background border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {/* Image */}
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = item.type === "person" ? "/profile.jpg" : "/project1.jpg";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.type === "person" 
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" 
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}>
                      {item.type === "person" ? "👤 Pessoa" : "📺 Canal"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold font-poppins">{item.name}</h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <button
                    onClick={() => handleVisit(item.link)}
                    className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    Visitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}