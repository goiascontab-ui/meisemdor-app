import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacidade = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span>/</span>
              <span className="text-foreground">Política de Privacidade</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Política de Privacidade</h1>
            <p className="text-muted-foreground mt-2">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 space-y-8 shadow-soft">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bem-vindo ao MEI Sem Dor. Esta política de privacidade explica como coletamos, 
                usamos e protegemos suas informações quando você utiliza nosso site e ferramentas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Dados Coletados</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1 Dados Salvos Localmente</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Todas as ferramentas do MEI Sem Dor (Gerador de Recibos, Calculadora DAS, 
                Simulador de Limite e Checklist Mensal) armazenam dados <strong>exclusivamente 
                no seu dispositivo</strong> através do localStorage do navegador.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Estes dados incluem:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                <li>Informações de recibos criados</li>
                <li>Dados do emitente salvos para reutilização</li>
                <li>Faturamentos mensais no simulador</li>
                <li>Estado do checklist mensal</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <strong>Importante:</strong> Nós não temos acesso a estes dados. Eles nunca são 
                enviados para nossos servidores e permanecem 100% privados no seu dispositivo.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 Cookies e Publicidade</h3>
              <p className="text-muted-foreground leading-relaxed">
                Este site utiliza Google AdSense para exibir anúncios. O Google pode usar cookies 
                para personalizar os anúncios com base em suas visitas anteriores a este ou outros sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Como Usamos os Dados</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Dados locais:</strong> Usados apenas para melhorar sua experiência 
                  nas ferramentas (preencher formulários automaticamente, manter histórico, etc.)
                </li>
                <li>
                  <strong>Cookies do Google:</strong> Usados pelo Google AdSense para exibir 
                  anúncios relevantes
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Google AdSense</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                O Google AdSense é um serviço de publicidade fornecido pelo Google LLC. 
                Ele usa cookies e outras tecnologias de rastreamento para coletar informações 
                sobre suas visitas a este e outros sites.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Você pode optar por não receber anúncios personalizados visitando as 
                <a 
                  href="https://adssettings.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Configurações de Anúncios do Google
                </a>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Para mais informações sobre as práticas de privacidade do Google, consulte a 
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Política de Privacidade do Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Seus Direitos</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Você tem o direito de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Limpar todos os dados salvos localmente a qualquer momento (usando as configurações do navegador)</li>
                <li>Desativar cookies através das configurações do seu navegador</li>
                <li>Optar por não receber anúncios personalizados do Google</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Segurança</h2>
              <p className="text-muted-foreground leading-relaxed">
                Como não coletamos ou armazenamos dados em nossos servidores, não há risco 
                de vazamento de dados do nosso lado. Seus dados estão seguros no seu dispositivo 
                e você tem controle total sobre eles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Menores de Idade</h2>
              <p className="text-muted-foreground leading-relaxed">
                Este site não coleta intencionalmente informações de menores de 18 anos. 
                Se você é menor de idade, por favor, utilize o site apenas com a supervisão 
                de um responsável.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar esta política de privacidade ocasionalmente. A data da última 
                atualização será sempre exibida no topo desta página. Recomendamos que você 
                revise esta página periodicamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se você tiver dúvidas sobre esta política de privacidade, entre em contato 
                através do nosso site.
              </p>
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">ℹ️</span>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Resumo Rápido</h3>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>✅ Seus dados ficam no SEU dispositivo</li>
                    <li>✅ Não coletamos informações pessoais</li>
                    <li>✅ Não vendemos dados</li>
                    <li>✅ Google AdSense usa cookies para anúncios</li>
                    <li>✅ Você pode desativar cookies no navegador</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
