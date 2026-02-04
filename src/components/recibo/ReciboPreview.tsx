import { forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import type { ReciboData } from "@/pages/Recibo";

interface ReciboPreviewProps { 
  data: ReciboData; 
}

export interface ReciboPreviewRef { 
  getElement: () => HTMLDivElement | null; 
}

export const ReciboPreview = forwardRef<ReciboPreviewRef, ReciboPreviewProps>(({ data }, ref) => {
  const documentRef = useRef<HTMLDivElement>(null);
  const verificationCode = useMemo(() => Math.random().toString(36).substring(2, 10).toUpperCase(), []);
  
  useImperativeHandle(ref, () => ({ 
    getElement: () => documentRef.current 
  }));
  
  const formatDate = (dateStr: string) => { 
    if (!dateStr) return "__/__/____"; 
    const date = new Date(dateStr + "T00:00:00"); 
    return date.toLocaleDateString("pt-BR"); 
  };
  
  const hasData = data.emitente.nome || data.cliente.nome || data.servico.valor || data.servico.descricao;

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">👁️</span>
        <h2 className="text-xl font-bold text-foreground">Pré-visualização</h2>
      </div>
      <div ref={documentRef} className="recibo-document relative overflow-hidden bg-white" style={{ fontFamily: "'Source Serif Pro', Georgia, serif" }}>
        {!hasData && <div className="recibo-watermark">VISUALIZAÇÃO</div>}
        <div className="text-center mb-6 pb-4" style={{ borderBottom: "2px solid #0066CC" }}>
          <h1 className="text-2xl font-bold tracking-wide" style={{ color: "#0066CC" }}>RECIBO</h1>
          <p className="text-sm" style={{ color: "#666666" }}>Recibo de Pagamento</p>
          <div className="flex justify-center gap-6 mt-2 text-xs">
            <div>
              <span style={{ color: "#666666" }}>NÚMERO: </span>
              <span className="font-semibold" style={{ color: "#1a1a1a" }}>{data.numero}</span>
            </div>
            <div>
              <span style={{ color: "#666666" }}>SÉRIE: </span>
              <span className="font-semibold" style={{ color: "#1a1a1a" }}>MEI</span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0066CC" }}>EMITENTE</h2>
          <div className="space-y-1 text-sm">
            <div className="flex">
              <span className="w-28" style={{ color: "#666666" }}>Nome/Razão:</span>
              <span className="font-medium flex-1" style={{ color: "#1a1a1a" }}>{data.emitente.nome || "________________________________"}</span>
            </div>
            <div className="flex">
              <span className="w-28" style={{ color: "#666666" }}>CPF/CNPJ:</span>
              <span style={{ color: "#1a1a1a" }}>{data.emitente.documento || "__________________________"}</span>
            </div>
            {data.emitente.endereco && <div className="flex">
              <span className="w-28" style={{ color: "#666666" }}>Endereço:</span>
              <span style={{ color: "#1a1a1a" }}>{data.emitente.endereco}</span>
            </div>}
            {data.emitente.contato && <div className="flex">
              <span className="w-28" style={{ color: "#666666" }}>Contato:</span>
              <span style={{ color: "#1a1a1a" }}>{data.emitente.contato}</span>
            </div>}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0066CC" }}>CLIENTE</h2>
          <div className="space-y-1 text-sm">
            <div className="flex">
              <span className="w-28" style={{ color: "#666666" }}>Nome:</span>
              <span className="font-medium flex-1" style={{ color: "#1a1a1a" }}>{data.cliente.nome || "________________________________"}</span>
            </div>
            {data.cliente.documento && <div className="flex">
              <span className="w-28" style={{ color: "#666666" }}>CPF/CNPJ:</span>
              <span style={{ color: "#1a1a1a" }}>{data.cliente.documento}</span>
            </div>}
            {data.cliente.tipo && <div className="flex">
              <span className="w-28" style={{ color: "#666666" }}>Tipo:</span>
              <span style={{ color: "#1a1a1a" }}>{data.cliente.tipo}</span>
            </div>}
          </div>
        </div>
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#0066CC" }}>DADOS DO SERVIÇO</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span style={{ color: "#666666" }}>Descrição:</span>
              <p className="mt-1" style={{ color: "#1a1a1a" }}>{data.servico.descricao || "__________________________"}</p>
            </div>
            <div className="flex items-center justify-between py-3 mt-4" style={{ borderTop: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6" }}>
              <span className="font-bold" style={{ color: "#1a1a1a" }}>VALOR:</span>
              <span className="text-2xl font-bold" style={{ color: "#0066CC" }}>R$ {data.servico.valor || "0,00"}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <span className="text-xs" style={{ color: "#666666" }}>Data</span>
                <p className="text-sm font-medium" style={{ color: "#1a1a1a" }}>{formatDate(data.servico.data)}</p>
              </div>
              <div>
                <span className="text-xs" style={{ color: "#666666" }}>Pagamento</span>
                <p className="text-sm font-medium" style={{ color: "#1a1a1a" }}>{data.servico.pagamento || "___________"}</p>
              </div>
              <div>
                <span className="text-xs" style={{ color: "#666666" }}>Status</span>
                <p className="text-sm font-medium" style={{ color: "#1a1a1a" }}>{data.servico.status || "___________"}</p>
              </div>
            </div>
          </div>
        </div>
        {data.servico.observacao && <div className="mb-6 text-sm">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#0066CC" }}>OBSERVAÇÕES</span>
          <p className="mt-1" style={{ color: "#666666" }}>{data.servico.observacao}</p>
        </div>}
        <div className="mt-8 pt-4" style={{ borderTop: "1px solid #dee2e6" }}>
          <div className="flex justify-between items-end">
            <div className="text-center flex-1">
              <div className="mb-1 mx-4" style={{ borderBottom: "1px solid #1a1a1a" }} />
              <p className="text-xs" style={{ color: "#666666" }}>Local e Data</p>
            </div>
            <div className="text-center flex-1">
              <div className="mb-1 mx-4" style={{ borderBottom: "1px solid #1a1a1a" }} />
              <p className="text-xs" style={{ color: "#666666" }}>Assinatura do Emitente</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 text-center" style={{ borderTop: "1px solid #dee2e6" }}>
          <p style={{ fontSize: "10px", color: "#666666" }}>Recibo gerado por MEI Sem Dor • meisemdor.com.br</p>
          <p style={{ fontSize: "10px", color: "#666666", marginTop: "4px" }}>Código de verificação: {verificationCode}</p>
        </div>
      </div>
    </div>
  );
});

ReciboPreview.displayName = "ReciboPreview";
