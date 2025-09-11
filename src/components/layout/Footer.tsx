import ShareButton from "@/components/ui/ShareButton";
import { getFooterButtons } from "@/data/config";

export default function Footer() {
  const footerButtons = getFooterButtons();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Rodapé"
      className="bg-gradient-to-t from-background/95 via-background to-background/90 border-t border-border/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
          {/* Company Information */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/20 mr-3">
                <span className="text-white font-bold text-lg">GV</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins text-foreground">Gregory Vallim</h3>
                <p className="text-sm text-muted-foreground">Desenvolvedor Full Stack</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Criando soluções digitais inovadoras com paixão e excelência técnica.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold font-poppins mb-6 text-foreground">Links Rápidos</h4>
            <nav className="space-y-3" role="navigation" aria-label="Links rápidos">
              <a
                href="#home"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Início
              </a>
              <a
                href="#about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Sobre
              </a>
              <a
                href="#projects"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Projetos
              </a>
              <a
                href="#contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contato
              </a>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-left space-y-6">
            <div>
              <h4 className="text-lg font-semibold font-poppins mb-4 text-foreground">Entre em Contato</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 contato@gregoryvallim.com</p>
                <p>📱 +55 (11) 99999-9999</p>
                <p>📍 São Paulo, SP - Brasil</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-3">Siga-me</h5>
              <div className="flex justify-center md:justify-start space-x-4">
                {[
                  { icon: 'twitter', href: 'https://twitter.com/gregoryvallim', label: 'Twitter' },
                  { icon: 'instagram', href: 'https://instagram.com/gregoryvallim', label: 'Instagram' },
                  { icon: 'linkedin', href: 'https://linkedin.com/in/gregoryvallim', label: 'LinkedIn' },
                  { icon: 'github', href: 'https://github.com/gregoryvallim', label: 'GitHub' }
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Seguir no ${social.label}`}
                  >
                    <span className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors`}>
                      {social.icon === 'twitter' && '🐦'}
                      {social.icon === 'instagram' && '📷'}
                      {social.icon === 'linkedin' && '💼'}
                      {social.icon === 'github' && '🐙'}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <div className="text-sm text-muted-foreground">
              <p>&copy; {currentYear} Gregory Vallim. Todos os direitos reservados.</p>
              <p className="mt-1">
                <a href="/privacy" className="hover:text-foreground transition-colors">Política de Privacidade</a> |
                <a href="/terms" className="hover:text-foreground transition-colors ml-2">Termos de Uso</a>
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <ShareButton />
              <span className="text-xs text-muted-foreground hidden sm:inline">Feito com ❤️ em São Paulo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}