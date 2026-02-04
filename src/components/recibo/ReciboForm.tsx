import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { ReciboData } from "@/pages/Recibo";

interface ReciboFormProps { 
  data: ReciboData; 
  onChange: (data: ReciboData) => void; 
  onGenerate: () => void; 
  isGenerating?: boolean; 
}

export function ReciboForm({ data, onChange, onGenerate, isGenerating = false }: ReciboFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const formatCPFCNPJ = (value: string) => { 
    const numbers = value.replace(/\D/g, ""); 
    if (numbers.length <= 11) { 
      return numbers.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
    } 
    return numbers.substring(0, 14).replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2"); 
  };
  
  const formatCurrency = (value: string) => { 
    const numbers = value.replace(/\D/g, ""); 
    if (!numbers) return ""; 
    const num = parseInt(numbers, 10); 
    return (num / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
  };
  
  const formatPhone = (value: string) => { 
    const numbers = value.replace(/\D/g, ""); 
    if (numbers.length <= 10) { 
      return numbers.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2"); 
    } 
    return numbers.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").substring(0, 15); 
  };
  
  const updateField = (section: "emitente" | "cliente" | "servico", field: string, value: string) => { 
    onChange({ ...data, [section]: { ...data[section], [field]: value } }); 
    if (errors[`${section}.${field}`]) { 
      setErrors((prev) => ({ ...prev, [`${section}.${field}`]: "" })); 
    } 
  };
  
  const validateForm = () => { 
    const newErrors: Record<string, string> = {}; 
    if (!data.emitente.nome.trim()) newErrors["emitente.nome"] = "Nome é obrigatório"; 
    if (!data.emitente.documento.trim()) newErrors["emitente.documento"] = "CPF/CNPJ é obrigatório"; 
    if (!data.cliente.nome.trim()) newErrors["cliente.nome"] = "Nome do cliente é obrigatório"; 
    if (!data.servico.descricao.trim()) newErrors["servico.descricao"] = "Descrição é obrigatória"; 
    if (!data.servico.valor.trim()) newErrors["servico.valor"] = "Valor é obrigatório"; 
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  };
  
  const handleSubmit = async () => { 
    if (!validateForm()) { 
      toast.error("Por favor, preencha todos os campos obrigatórios"); 
      return; 
    } 
    await onGenerate(); 
  };
  
  const handleClear = () => { 
    onChange({ 
      ...data, 
      cliente: { nome: "", documento: "", tipo: "" }, 
      servico: { descricao: "", valor: "", data: new Date().toISOString().split("T")[0], pagamento: "", status: "Pago", observacao: "" } 
    }); 
    setErrors({}); 
    toast.info("Formulário limpo"); 
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📝</span>
        <h2 className="text-xl font-bold text-foreground">Dados do Recibo</h2>
      </div>
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Quem Emite</h3>
            <p className="text-sm text-muted-foreground">Seus dados como prestador de serviços</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="emitenteNome" className="flex items-center gap-1">
                <span>👤</span> Nome ou Razão Social *
              </Label>
              <Input 
                id="emitenteNome" 
                placeholder="Ex: João da Silva MEI" 
                value={data.emitente.nome} 
                onChange={(e) => updateField("emitente", "nome", e.target.value)} 
                className={errors["emitente.nome"] ? "border-destructive" : ""} 
              />
              {errors["emitente.nome"] && <p className="text-sm text-destructive mt-1">{errors["emitente.nome"]}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emitenteDoc" className="flex items-center gap-1">
                  <span>🆔</span> CPF ou CNPJ *
                </Label>
                <Input 
                  id="emitenteDoc" 
                  placeholder="000.000.000-00" 
                  value={data.emitente.documento} 
                  onChange={(e) => updateField("emitente", "documento", formatCPFCNPJ(e.target.value))} 
                  className={errors["emitente.documento"] ? "border-destructive" : ""} 
                />
              </div>
              <div>
                <Label htmlFor="emitenteTipo" className="flex items-center gap-1">
                  <span>🏢</span> Tipo
                </Label>
                <Select value={data.emitente.tipo} onValueChange={(value) => updateField("emitente", "tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEI">MEI</SelectItem>
                    <SelectItem value="Autônomo">Autônomo</SelectItem>
                    <SelectItem value="Empresa">Empresa</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="emitenteEndereco" className="flex items-center gap-1">
                <span>📍</span> Endereço Completo
              </Label>
              <Input 
                id="emitenteEndereco" 
                placeholder="Rua, número, bairro, cidade - Estado" 
                value={data.emitente.endereco} 
                onChange={(e) => updateField("emitente", "endereco", e.target.value)} 
              />
            </div>
            <div>
              <Label htmlFor="emitenteContato" className="flex items-center gap-1">
                <span>📞</span> Telefone ou Email
              </Label>
              <Input 
                id="emitenteContato" 
                placeholder="(11) 99999-9999 ou email@exemplo.com" 
                value={data.emitente.contato} 
                onChange={(e) => updateField("emitente", "contato", e.target.value.includes("@") ? e.target.value : formatPhone(e.target.value))} 
              />
            </div>
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-border">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Cliente</h3>
            <p className="text-sm text-muted-foreground">Dados de quem está pagando</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="clienteNome" className="flex items-center gap-1">
                <span>👥</span> Nome do Cliente *
              </Label>
              <Input 
                id="clienteNome" 
                placeholder="Nome completo ou empresa" 
                value={data.cliente.nome} 
                onChange={(e) => updateField("cliente", "nome", e.target.value)} 
                className={errors["cliente.nome"] ? "border-destructive" : ""} 
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clienteDoc" className="flex items-center gap-1">
                  <span>🆔</span> CPF/CNPJ (Opcional)
                </Label>
                <Input 
                  id="clienteDoc" 
                  placeholder="000.000.000-00" 
                  value={data.cliente.documento} 
                  onChange={(e) => updateField("cliente", "documento", formatCPFCNPJ(e.target.value))} 
                />
              </div>
              <div>
                <Label htmlFor="clienteTipo" className="flex items-center gap-1">
                  <span>🏢</span> Tipo do Cliente
                </Label>
                <Select value={data.cliente.tipo} onValueChange={(value) => updateField("cliente", "tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pessoa Física">Pessoa Física</SelectItem>
                    <SelectItem value="Pessoa Jurídica">Pessoa Jurídica</SelectItem>
                    <SelectItem value="Órgão Público">Órgão Público</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-border">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Serviço Prestado</h3>
            <p className="text-sm text-muted-foreground">Detalhes do serviço e valores</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="servicoDescricao" className="flex items-center gap-1">
                <span>📋</span> Descrição do Serviço *
              </Label>
              <Textarea 
                id="servicoDescricao" 
                placeholder="Descreva detalhadamente o serviço prestado..." 
                value={data.servico.descricao} 
                onChange={(e) => updateField("servico", "descricao", e.target.value)} 
                className={errors["servico.descricao"] ? "border-destructive" : ""} 
                rows={4} 
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="servicoValor" className="flex items-center gap-1">
                  <span>💰</span> Valor (R$) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input 
                    id="servicoValor" 
                    placeholder="0,00" 
                    value={data.servico.valor} 
                    onChange={(e) => updateField("servico", "valor", formatCurrency(e.target.value))} 
                    className={`pl-10 ${errors["servico.valor"] ? "border-destructive" : ""}`} 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="servicoData" className="flex items-center gap-1">
                  <span>📅</span> Data *
                </Label>
                <Input 
                  id="servicoData" 
                  type="date" 
                  value={data.servico.data} 
                  onChange={(e) => updateField("servico", "data", e.target.value)} 
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="servicoPagamento" className="flex items-center gap-1">
                  <span>💳</span> Forma de Pagamento
                </Label>
                <Select value={data.servico.pagamento} onValueChange={(value) => updateField("servico", "pagamento", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                    <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                    <SelectItem value="Transferência Bancária">Transferência Bancária</SelectItem>
                    <SelectItem value="Boleto">Boleto</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="servicoStatus" className="flex items-center gap-1">
                  <span>✅</span> Status do Pagamento
                </Label>
                <Select value={data.servico.status} onValueChange={(value) => updateField("servico", "status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pago">Pago</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Parcial">Parcial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="servicoObservacao" className="flex items-center gap-1">
                <span>📝</span> Observações Adicionais
              </Label>
              <Textarea 
                id="servicoObservacao" 
                placeholder="Informações adicionais, prazos, garantias..." 
                value={data.servico.observacao} 
                onChange={(e) => updateField("servico", "observacao", e.target.value)} 
                rows={3} 
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClear} 
            className="sm:flex-1"
          >
            <span>🗑️</span>
            <span>Limpar Tudo</span>
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isGenerating} 
            className="sm:flex-1 bg-primary hover:bg-primary-dark"
          >
            <span>{isGenerating ? "⏳" : "📄"}</span>
            <span>{isGenerating ? "Gerando..." : "Gerar PDF"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
