import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { PhoneMockup } from "@/components/PhoneMockup";
import { Button } from "@/components/ui/button";

const tools = [
  { 
    title: "Gerador de Recibos", 
    description: "Crie recibos profissionais em PDF com design premium. Envie direto pelo WhatsApp, salve histórico, exporte para Excel.", 
    icon: "📄", 
    features: ["Design profissional", "Envio por WhatsApp", "Histórico local", "Funciona offline"], 
    href: "/recibo", 
    badge: "Mais Popular", 
    variant: "primary" as const 
  },
  { 
    title: "Calculadora DAS", 
    description: "Calcule o DAS com precisão, incluindo multas por atraso e juros. Valores atualizados para 2025.", 
    icon: "💰", 
    features: ["Cálculo automático", "Multa e juros", "Valores 2025", "Categorias MEI"], 
    href: "/calculadora-das", 
    badge: "Novo", 
    variant: "secondary" as const 
  },
  { 
    title: "Simulador de Limite", 
    description: "Controle seu faturamento anual e não perca o MEI. Acompanhe mês a mês com alertas inteligentes.", 
    icon: "📈", 
    features: ["Controle mensal", "Alertas visuais", "Progresso em %", "Dados salvos"], 
    href: "/simulador", 
    badge: "Novo", 
    variant: "secondary" as const 
  },
  { 
    title: "Checklist Mensal", 
    description: "Organize todas as tarefas do MEI em um só lugar. Nunca mais esqueça prazos importantes!", 
    icon: "📅", 
    features: ["7 tarefas essenciais", "Progresso visual", "Reset mensal", "Notificações"], 
    href: "/checklist", 
    badge: "Novo", 
    variant: "secondary" as const 
  },
];

const features = [
  { icon: "🎯", title: "Focado no MEI", description: "Desenvolvido especificamente para as necessidades do microempreendedor individual brasileiro." },
  { icon: "📱", title: "Mobile First", description: "Interface 100% otimizada para celular. Funciona perfeitamente no seu smartphone." },
  { icon: "🔒", title: "Privacidade", description: "Seus dados ficam no seu dispositivo. Não coletamos informações pessoais." },
  { icon: "⚡", title: "Rápido", description: "Recibo em menos de 1 minuto. Sem cadastro, sem login, sem complicação." },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="premium-header py-12 md:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  <span className="text-secondary-light">Acabe com a dor</span>
                  <br />
                  da burocracia do MEI
                </h1>
                <p className="text-lg text-white/90 max-w-xl leading-relaxed">
                  Ferramentas profissionais e grátis. Otimizado para celular, funciona offline e sem cadastro.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["📱 Mobile First", "⚡ Rápido", "🔒 Privado"].map((badge) => (
                    <span key={badge} className="badge-premium text-white">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="space-y-3 pt-4">
                  <Link to="/recibo">
                    <Button className="btn-hero">
                      <span>🚀</span>
                      <span>Começar Agora</span>
                    </Button>
                  </Link>
                  <p className="text-sm text-white/70">
                    Totalmente grátis • Sem cadastro • Seus dados são privados
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        <section id="ferramentas" className="py-16 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                4 Ferramentas Poderosas para seu MEI
              </h2>
              <p className="text-muted-foreground text-lg">
                Tudo que você precisa no dia a dia, de graça e no seu celular
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {tools.map((tool) => (
                <ToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Por que escolher o MEI Sem Dor?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div 
                  key={feature.title} 
                  className="text-center p-6 rounded-2xl hover:bg-muted transition-colors"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container max-w-3xl">
            <div className="text-center p-8 md:p-12 rounded-3xl bg-card border border-border shadow-soft">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Pronto para simplificar seu MEI?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Comece agora com nosso gerador de recibos premium. Grátis, rápido e profissional.
              </p>
              <Link to="/recibo">
                <Button className="btn-hero">
                  <span>📄</span>
                  <span>Criar Meu Primeiro Recibo</span>
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-6">
                Sem cadastro necessário • Funciona offline • Privacidade garantida
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
