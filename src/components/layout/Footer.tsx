import ShareButton from "@/components/ui/ShareButton";
import { getFooterButtons } from "@/data/config";

export default function Footer() {
  const footerButtons = getFooterButtons();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} by Gregory Vallim. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <ShareButton />
          </div>
        </div>
      </div>
    </footer>
  );
}