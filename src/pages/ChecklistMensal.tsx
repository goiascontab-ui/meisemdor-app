import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const tarefasIniciais = [
  { id: 1, texto: "Pagar DAS do mês", categoria: "Financeiro" },
  { id: 2, texto: "Emitir nota fiscal", categoria: "Fiscal" },
  { id: 3, texto: "Registrar faturamento", categoria: "Financeiro" },
  { id: 4, texto: "Organizar recibos", categoria: "Documentos" },
  { id: 5, texto: "Verificar limite anual", categoria: "Financeiro" },
  { id: 6, texto: "Fazer backup de documentos", categoria: "Documentos" },
  { id: 7, texto: "Atualizar cadastro se necessário", categoria: "Cadastral" },
];

const ChecklistMensal = () => {
  const [tarefas, setTarefas] = useState<Array<{id: number, texto: string, categoria: string, feito: boolean}>>([]);
  const mesAtual = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  useEffect(() => {
    const saved = localStorage.getItem("checklistMEI");
    if (saved) {
      setTarefas(JSON.parse(saved));
    } else {
      setTarefas(tarefasIniciais.map(t => ({ ...t, feito: false })));
    }
  }, []);

  const toggleTarefa = (id: number) => {
    const novas = tarefas.map(t => t.id === id ? { ...t, feito: !t.feito } : t);
    setTarefas(novas);
    localStorage.setItem("checklistMEI", JSON.stringify(novas));
  };

  const resetar = () => {
    const novas = tarefas.map(t => ({ ...t, feito: false }));
    setTarefas(novas);
    localStorage.setItem("checklistMEI", JSON.stringify(novas));
  };

  const concluidas = tarefas.filter(t => t.feito).length;
  const percentual = (concluidas / tarefas.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <main className="flex-1 py-6">
        <div className="container max-w-3xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              <span>/</span>
              <span className="text-foreground">Checklist Mensal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Checklist Mensal do MEI</h1>
            <p className="text-muted-foreground mt-1 capitalize">{mesAtual}</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-primary">{concluidas}/{tarefas.length}</div>
                <div className="text-sm text-muted-foreground">tarefas concluídas</div>
              </div>
              <Button variant="outline" onClick={resetar}>Resetar Mês</Button>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="bg-secondary h-3 rounded-full transition-all" style={{ width: `${percentual}%` }}></div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <div className="space-y-3">
              {tarefas.map((tarefa) => (
                <div key={tarefa.id} className={`flex items-center gap-3 p-4 rounded-lg border transition-all cursor-pointer hover:bg-muted ${tarefa.feito ? "bg-muted border-secondary" : "bg-background border-border"}`} onClick={() => toggleTarefa(tarefa.id)}>
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${tarefa.feito ? "bg-secondary border-secondary" : "border-muted-foreground"}`}>
                    {tarefa.feito && <span className="text-white text-sm">✓</span>}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${tarefa.feito ? "line-through text-muted-foreground" : "text-foreground"}`}>{tarefa.texto}</div>
                    <div className="text-xs text-muted-foreground">{tarefa.categoria}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {percentual === 100 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-xl font-bold text-green-900">Parabéns!</div>
              <div className="text-green-700">Você completou todas as tarefas do mês!</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChecklistMensal;
