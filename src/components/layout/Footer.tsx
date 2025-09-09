import ShareButton from "@/components/ui/ShareButton";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} by Gregory Vallim. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center">
            <ShareButton />
          </div>
        </div>
      </div>
    </footer>
  );
}