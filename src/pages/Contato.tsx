import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Contato = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted">
        <div className="container max-w-3xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span>/</span>
              <span className="text-foreground">Contato</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Contato</h1>
            <p className="text-muted-foreground mt-2">Entre em contato conosco caso tenha dúvidas ou sugestões.</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 space-y-6 shadow-soft">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Email</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para suporte e parcerias, envie um email para:
              </p>
              <p className="mt-4">
                <a href="mailto:contato@meisemdor.com.br" className="text-primary hover:underline">
                  contato@meisemdor.com.br
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Horário de Resposta</h2>
              <p className="text-muted-foreground leading-relaxed">
                Normalmente respondemos em até 3 dias úteis.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;

