import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Termos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span>/</span>
              <span className="text-foreground">Termos de Uso</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Termos de Uso</h1>
            <p className="text-muted-foreground mt-2">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 space-y-6 shadow-soft">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">1. Aceitação</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao utilizar o MEI Sem Dor, você concorda com estes Termos de Uso. Se não concordar,
                por favor, não utilize nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">2. Descrição do Serviço</h2>
              <p className="text-muted-foreground leading-relaxed">
                O MEI Sem Dor oferece ferramentas gratuitas para microempreendedores individuais,
                como gerador de recibos, calculadora do DAS, simulador de limite e checklist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">3. Gratuidade e Licença</h2>
              <p className="text-muted-foreground leading-relaxed">
                As ferramentas são disponibilizadas gratuitamente e podem ser usadas livremente.
                O código pode ser open-source (ver repositório). Não é permitida a remoção
                de créditos ou uso comercial que viole a licença do projeto, quando aplicável.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">4. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed">
                As ferramentas fornecem cálculos e modelos como auxílio. Não nos responsabilizamos
                por decisões tomadas com base nos resultados. Sempre verifique com um contador
                ou profissional quando necessário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">5. Anúncios e Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                O site utiliza Google AdSense para exibir anúncios. O Google e parceiros podem
                usar cookies e tecnologias similares para personalizar anúncios.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Para mais detalhes sobre cookies e como o Google utiliza dados, consulte nossa
                <Link to="/privacidade" className="text-primary hover:underline ml-1"> Política de Privacidade</Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">6. Conformidade com a LGPD</h2>
              <p className="text-muted-foreground leading-relaxed">
                Respeitamos a Lei Geral de Proteção de Dados (LGPD). Não coletamos dados pessoais
                em nossos servidores; a maioria dos dados é armazenada localmente no seu dispositivo.
                Consulte a página de privacidade para saber mais sobre seus direitos e como exercer
                solicitações relacionadas a dados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">7. Alterações</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos alterar estes termos periodicamente. A data de última atualização será
                exibida no topo desta página. Recomendamos revisar os termos antes de usar o site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">8. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para dúvidas ou solicitações relacionadas a estes Termos, entre em contato através
                do site.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Termos;

