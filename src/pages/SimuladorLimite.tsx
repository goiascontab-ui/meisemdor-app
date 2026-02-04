import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LIMITE_ANUAL = 81000;
const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const SimuladorLimite = () => {
  const [faturamentos, setFaturamentos] = useState<number[]>(Array(12).fill(0));
  const total = faturamentos.reduce((a, b) => a + b, 0);
  const percentual = (total / LIMITE_ANUAL) * 100;
  const faltam = LIMITE_ANUAL - total;

  useEffect(() => {
    const saved = localStorage.getItem("faturamentosMEI");
    if (saved) setFaturamentos(JSON.parse(saved));
  }, []);

  const updateMes = (index: number, valor: string) => {
    const num = parseFloat(valor.replace(/\D/g, "")) / 100 || 0;
    const novo = [...faturamentos];
    novo[index] = num;
    setFaturamentos(novo);
    localStorage.setItem("faturamentosMEI", JSON.stringify(novo));
  };

  const formatCurrency = (val: number) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <main className="flex-1 py-6">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span>/</span>
              <span className="text-foreground">Simulador de Faturamento</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Simulador de Limite Anual</h1>
            <p className="text-muted-foreground mt-1">Controle seu faturamento e não perca o MEI</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary mb-2">{formatCurrency(total)}</div>
              <div className="text-sm text-muted-foreground">de {formatCurrency(LIMITE_ANUAL)}</div>
              <div className="w-full bg-muted rounded-full h-4 mt-4">
                <div className={`h-4 rounded-full transition-all ${percentual > 100 ? "bg-destructive" : percentual > 80 ? "bg-accent" : "bg-secondary"}`} style={{ width: `${Math.min(percentual, 100)}%` }}></div>
              </div>
              <div className="text-lg font-semibold mt-2 text-foreground">{percentual.toFixed(1)}% utilizado</div>
              {faltam > 0 ? (
                <div className="text-sm text-muted-foreground">Faltam {formatCurrency(faltam)} para o limite</div>
              ) : (
                <div className="text-sm text-destructive font-semibold">⚠️ LIMITE ULTRAPASSADO!</div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h2 className="text-xl font-bold text-foreground mb-4">Faturamento Mensal</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {meses.map((mes, i) => (
                <div key={i}>
                  <Label htmlFor={`mes${i}`}>{mes}/{new Date().getFullYear()}</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input id={`mes${i}`} type="text" placeholder="0,00" value={faturamentos[i] > 0 ? faturamentos[i].toFixed(2).replace(".", ",") : ""} onChange={(e) => updateMes(i, e.target.value)} className="pl-10" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={() => { setFaturamentos(Array(12).fill(0)); localStorage.removeItem("faturamentosMEI"); }} className="flex-1">Limpar Tudo</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorLimite;
