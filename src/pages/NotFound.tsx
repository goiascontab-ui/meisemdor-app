import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-2xl text-center py-16">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Página não encontrada
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90">
                <span>🏠</span>
                <span>Voltar para Home</span>
              </Button>
            </Link>
            <Link to="/recibo">
              <Button variant="outline">
                <span>📄</span>
                <span>Criar Recibo</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
