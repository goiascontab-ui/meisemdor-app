import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">💼</span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MEI Sem Dor
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="/#ferramentas" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Ferramentas
          </a>
          <a 
            href="/#sobre" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Sobre
          </a>
        </nav>

        <Link to="/recibo">
          <Button className="bg-secondary hover:bg-secondary/90">
            <span>📄</span>
            <span>Criar Recibo</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
