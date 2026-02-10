import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const valoresDAS = {
  comercio: 71.60,
  industria: 72.60,
  servicos: 76.60,
};

const CalculadoraDAS = () => {
  const [categoria, setCategoria] = useState<keyof typeof valoresDAS>("comercio");
  const [mesesAtraso, setMesesAtraso] = useState(0);
  
  const valorBase = valoresDAS[categoria];
  const multa = mesesAtraso > 0 ? valorBase * 0.20 : 0;
  const juros = mesesAtraso > 0 ? valorBase * 0.01 * mesesAtraso : 0;
  const total = valorBase + multa + juros;

  const formatCurrency = (val: number) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <main className="flex-1 py-6">
        <div className="container max-w-3xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span>/</span>
              <span className="text-foreground">Calculadora DAS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Calculadora DAS</h1>
            <p className="text-muted-foreground mt-1">Calcule o valor do seu DAS com multas e juros</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
            <div className="space-y-4 mb-6">
              <div>
                <Label>Categoria do MEI</Label>
                <Select value={categoria} onValueChange={(v) => setCategoria(v as keyof typeof valoresDAS)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comercio">💼 Comércio e Indústria (R$ 71,60)</SelectItem>
                    <SelectItem value="industria">🏭 Indústria + Comércio (R$ 72,60)</SelectItem>
                    <SelectItem value="servicos">🔧 Serviços (R$ 76,60)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="atraso">Meses de Atraso</Label>
                <Input id="atraso" type="number" min="0" value={mesesAtraso} onChange={(e) => setMesesAtraso(parseInt(e.target.value) || 0)} />
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor Base:</span>
                <span className="font-semibold">{formatCurrency(valorBase)}</span>
              </div>
              {mesesAtraso > 0 && (
                <>
                  <div className="flex justify-between text-accent">
                    <span>Multa (20%):</span>
                    <span className="font-semibold">{formatCurrency(multa)}</span>
                  </div>
                  <div className="flex justify-between text-accent">
                    <span>Juros (1% a.m.):</span>
                    <span className="font-semibold">{formatCurrency(juros)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-border">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
            <div className="font-semibold text-blue-900 mb-2">ℹ️ Informações Importantes:</div>
            <ul className="space-y-1 text-blue-800">
              <li>• Multa de 20% sobre o valor original</li>
              <li>• Juros de 1% ao mês de atraso</li>
              <li>• Valores referentes a 2025</li>
              <li>• Pague em dia para evitar multas!</li>
            </ul>
          </div>
          
          {/* Ad placeholder between tools */}
          <div className="my-6">
            <AdPlaceholder slot="1234567890" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalculadoraDAS;
