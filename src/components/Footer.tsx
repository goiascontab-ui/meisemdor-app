import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💼</span>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MEI Sem Dor
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ferramentas gratuitas para simplificar a vida do microempreendedor individual brasileiro.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Ferramentas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recibo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Gerador de Recibos
                </Link>
              </li>
              <li>
                <Link to="/calculadora-das" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Calculadora DAS
                </Link>
              </li>
              <li>
                <Link to="/simulador" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Simulador de Limite
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Checklist Mensal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Informações</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre o Projeto
                </a>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/60">100% Gratuito</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/60">Open Source</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MEI Sem Dor. Feito com ❤️ para MEIs brasileiros.
          </p>
        </div>
      </div>
    </footer>
  );
}
