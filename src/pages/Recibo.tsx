import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReciboForm } from "@/components/recibo/ReciboForm";
import { ReciboPreview, ReciboPreviewRef } from "@/components/recibo/ReciboPreview";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface ReciboData {
  numero: string;
  emitente: {
    nome: string;
    documento: string;
    tipo: string;
    endereco: string;
    contato: string;
  };
  cliente: {
    nome: string;
    documento: string;
    tipo: string;
  };
  servico: {
    descricao: string;
    valor: string;
    data: string;
    pagamento: string;
    status: string;
    observacao: string;
  };
}

const getNextReciboNumber = (): string => {
  const stored = localStorage.getItem("lastReciboNumber");
  const lastNumber = stored ? parseInt(stored, 10) : 0;
  const nextNumber = lastNumber + 1;
  localStorage.setItem("lastReciboNumber", nextNumber.toString());
  return nextNumber.toString().padStart(6, "0");
};

const saveReciboToHistory = (data: ReciboData) => {
  const history = JSON.parse(localStorage.getItem("recibosHistory") || "[]");
  history.unshift({
    ...data,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("recibosHistory", JSON.stringify(history.slice(0, 50)));
};

const getReciboStats = () => {
  const history = JSON.parse(localStorage.getItem("recibosHistory") || "[]");
  const totalRecibos = history.length;
  const totalValor = history.reduce((sum: number, r: any) => {
    const valor = parseFloat(r.servico.valor.replace(/\./g, "").replace(",", ".") || "0");
    return sum + valor;
  }, 0);
  const ultimoRecibo = history.length > 0 ? new Date(history[0].createdAt).toLocaleDateString("pt-BR") : "Nenhum";
  
  return {
    totalRecibos,
    totalValor: totalValor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    ultimoRecibo,
  };
};

const Recibo = () => {
  const previewRef = useRef<ReciboPreviewRef>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stats, setStats] = useState(getReciboStats());
  
  const [data, setData] = useState<ReciboData>({
    numero: getNextReciboNumber(),
    emitente: {
      nome: localStorage.getItem("emitenteNome") || "",
      documento: localStorage.getItem("emitenteDocumento") || "",
      tipo: localStorage.getItem("emitenteTipo") || "",
      endereco: localStorage.getItem("emitenteEndereco") || "",
      contato: localStorage.getItem("emitenteContato") || "",
    },
    cliente: { nome: "", documento: "", tipo: "" },
    servico: {
      descricao: "",
      valor: "",
      data: new Date().toISOString().split("T")[0],
      pagamento: "",
      status: "Pago",
      observacao: "",
    },
  });

  useEffect(() => {
    localStorage.setItem("emitenteNome", data.emitente.nome);
    localStorage.setItem("emitenteDocumento", data.emitente.documento);
    localStorage.setItem("emitenteTipo", data.emitente.tipo);
    localStorage.setItem("emitenteEndereco", data.emitente.endereco);
    localStorage.setItem("emitenteContato", data.emitente.contato);
  }, [data.emitente]);

  const handleDataChange = (newData: ReciboData) => {
    setData(newData);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast.loading("Gerando PDF...", { id: "pdf-generation" });
    
    try {
      const element = previewRef.current?.getElement();
      if (!element) {
        throw new Error("Elemento não encontrado");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      
      const fileName = `recibo-${data.numero}-${data.cliente.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      pdf.save(fileName);

      saveReciboToHistory(data);
      setStats(getReciboStats());

      toast.success("PDF gerado com sucesso! 🎉", {
        id: "pdf-generation",
        description: `Arquivo ${fileName} foi baixado.`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.", { id: "pdf-generation" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <main className="flex-1 py-6">
        <div className="container">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition-colors">
                Início
              </Link>
              <span>/</span>
              <span className="text-foreground">Gerador de Recibos</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Gerador de Recibos Premium
            </h1>
            <p className="text-muted-foreground mt-1">
              Preencha os dados abaixo e crie recibos profissionais em segundos
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalRecibos}</div>
              <div className="text-xs text-muted-foreground">Recibos gerados</div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <div className="text-2xl font-bold text-secondary">{stats.totalValor}</div>
              <div className="text-xs text-muted-foreground">Valor total</div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <div className="text-lg font-bold text-foreground">{stats.ultimoRecibo}</div>
              <div className="text-xs text-muted-foreground">Último recibo</div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ReciboForm 
              data={data} 
              onChange={handleDataChange} 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
            />
            <div className="lg:sticky lg:top-24 h-fit">
              <ReciboPreview ref={previewRef} data={data} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recibo;
