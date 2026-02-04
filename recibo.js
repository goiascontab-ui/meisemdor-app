// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const form = document.getElementById('reciboForm');
    const btnGerar = document.getElementById('btnGerar');
    const btnLimpar = document.getElementById('btnLimpar');
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const btnImprimir = document.getElementById('btnImprimir');
    const btnSalvarRascunho = document.getElementById('btnSalvarRascunho');
    const tabs = document.querySelectorAll('.form-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Elementos de preview
    const previewElements = {
        numero: document.getElementById('previewNumero'),
        emitente: document.getElementById('previewEmitente'),
        emitenteDoc: document.getElementById('previewEmitenteDoc'),
        cliente: document.getElementById('previewCliente'),
        clienteDoc: document.getElementById('previewClienteDoc'),
        valor: document.getElementById('previewValor'),
        servico: document.getElementById('previewServico'),
        data: document.getElementById('previewData'),
        observacao: document.getElementById('previewObservacao')
    };
    
    // Dados do recibo
    let reciboData = {
        numero: '001',
        emitente: {
            nome: '',
            cpfCnpj: '',
            endereco: ''
        },
        cliente: {
            nome: '',
            cpfCnpj: ''
        },
        servico: {
            descricao: '',
            valor: '',
            data: new Date().toISOString().split('T')[0],
            observacao: ''
        }
    };
    
    // Inicialização
    init();
    
    function init() {
        // Configurar data atual
        document.getElementById('servicoData').value = reciboData.servico.data;
        
        // Carregar rascunho salvo
        loadDraft();
        
        // Atualizar preview inicial
        updatePreview();
        
        // Configurar eventos
        setupEventListeners();
        
        // Configurar abas
        setupTabs();
    }
    
    function setupEventListeners() {
        // Atualizar preview em tempo real
        form.addEventListener('input', updatePreviewFromForm);
        
        // Gerar PDF
        btnGerar.addEventListener('click', generatePDF);
        
        // Limpar formulário
        btnLimpar.addEventListener('click', clearForm);
        
        // Enviar para WhatsApp
        btnWhatsApp.addEventListener('click', sendToWhatsApp);
        
        // Imprimir
        btnImprimir.addEventListener('click', printRecibo);
        
        // Salvar rascunho
        btnSalvarRascunho.addEventListener('click', saveDraft);
        
        // Máscaras de input
        document.getElementById('emitenteCpfCnpj').addEventListener('input', formatCpfCnpj);
        document.getElementById('clienteCpfCnpj').addEventListener('input', formatCpfCnpj);
        document.getElementById('servicoValor').addEventListener('input', formatValor);
    }
    
    function setupTabs() {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Remover active de todas as abas e conteúdos
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Adicionar active na aba clicada
                tab.classList.add('active');
                document.getElementById('tab-' + targetTab).classList.add('active');
            });
        });
    }
    
    function updatePreviewFromForm() {
        // Coletar dados do formulário
        reciboData.emitente.nome = document.getElementById('emitenteNome').value;
        reciboData.emitente.cpfCnpj = document.getElementById('emitenteCpfCnpj').value;
        reciboData.emitente.endereco = document.getElementById('emitenteEndereco').value;
        
        reciboData.cliente.nome = document.getElementById('clienteNome').value;
        reciboData.cliente.cpfCnpj = document.getElementById('clienteCpfCnpj').value;
        
        reciboData.servico.descricao = document.getElementById('servicoDescricao').value;
        reciboData.servico.valor = document.getElementById('servicoValor').value;
        reciboData.servico.data = document.getElementById('servicoData').value;
        reciboData.servico.observacao = document.getElementById('servicoObservacao').value;
        
        // Atualizar preview
        updatePreview();
    }
    
    function updatePreview() {
        // Emitente
        previewElements.emitente.textContent = reciboData.emitente.nome || '[Seu nome aparecerá aqui]';
        previewElements.emitenteDoc.textContent = reciboData.emitente.cpfCnpj || '[CPF/CNPJ]';
        if (reciboData.emitente.endereco) {
            previewElements.emitenteDoc.textContent += ' - ' + reciboData.emitente.endereco;
        }
        
        // Cliente
        previewElements.cliente.textContent = reciboData.cliente.nome || '[Nome do cliente]';
        previewElements.clienteDoc.textContent = reciboData.cliente.cpfCnpj || '[CPF/CNPJ do cliente]';
        
        // Valor
        const valorFormatado = reciboData.servico.valor 
            ? 'R$ ' + parseFloat(reciboData.servico.valor).toFixed(2).replace('.', ',')
            : 'R$ 0,00';
        previewElements.valor.textContent = valorFormatado;
        
        // Serviço
        previewElements.servico.textContent = reciboData.servico.descricao || '[Descrição do serviço]';
        
        // Data
        if (reciboData.servico.data) {
            const dataObj = new Date(reciboData.servico.data + 'T00:00:00');
            previewElements.data.textContent = dataObj.toLocaleDateString('pt-BR');
        } else {
            previewElements.data.textContent = '[Data atual]';
        }
        
        // Observação
        previewElements.observacao.textContent = reciboData.servico.observacao || '[Observações adicionais]';
    }
    
    function formatCpfCnpj(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            // CPF: 000.000.000-00
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            // CNPJ: 00.000.000/0000-00
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        
        e.target.value = value;
    }
    
    function formatValor(e) {
        let value = e.target.value;
        // Remove tudo que não é número ou ponto
        value = value.replace(/[^\d.]/g, '');
        // Garante apenas um ponto decimal
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        e.target.value = value;
    }
    
    function generatePDF() {
        // Validar formulário
        if (!validateForm()) {
            return;
        }
        
        // Verificar se jsPDF está disponível
        if (typeof window.jspdf === 'undefined') {
            alert('Erro ao carregar biblioteca PDF. Tente recarregar a página.');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações
        const margemEsq = 20;
        const margemDir = 190;
        let y = 20;
        
        // Título
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text('RECIBO', 105, y, { align: 'center' });
        
        y += 10;
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('Nº ' + reciboData.numero, 105, y, { align: 'center' });
        
        // Linha separadora
        y += 10;
        doc.line(margemEsq, y, margemDir, y);
        
        // Emitente
        y += 15;
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('EMITENTE:', margemEsq, y);
        
        y += 7;
        doc.setFont(undefined, 'normal');
        doc.text(reciboData.emitente.nome, margemEsq, y);
        
        y += 5;
        let emitenteInfo = reciboData.emitente.cpfCnpj;
        if (reciboData.emitente.endereco) {
            emitenteInfo += ' - ' + reciboData.emitente.endereco;
        }
        doc.setFontSize(9);
        doc.text(emitenteInfo, margemEsq, y);
        
        // Cliente
        y += 15;
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('RECEBI DE:', margemEsq, y);
        
        y += 7;
        doc.setFont(undefined, 'normal');
        doc.text(reciboData.cliente.nome, margemEsq, y);
        
        if (reciboData.cliente.cpfCnpj) {
            y += 5;
            doc.setFontSize(9);
            doc.text(reciboData.cliente.cpfCnpj, margemEsq, y);
        }
        
        // Valor
        y += 15;
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('A IMPORTÂNCIA DE:', margemEsq, y);
        
        y += 7;
        doc.setFontSize(14);
        doc.setTextColor(0, 102, 204);
        const valorFormatado = 'R$ ' + parseFloat(reciboData.servico.valor).toFixed(2).replace('.', ',');
        doc.text(valorFormatado, margemEsq, y);
        doc.setTextColor(0, 0, 0);
        
        // Valor por extenso
        y += 7;
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        const valorExtenso = numeroParaExtenso(reciboData.servico.valor);
        doc.text('(' + valorExtenso + ')', margemEsq, y);
        
        // Serviço
        y += 15;
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('REFERENTE A:', margemEsq, y);
        
        y += 7;
        doc.setFont(undefined, 'normal');
        const linhasServico = doc.splitTextToSize(reciboData.servico.descricao, margemDir - margemEsq);
        doc.text(linhasServico, margemEsq, y);
        y += linhasServico.length * 5;
        
        // Observações
        if (reciboData.servico.observacao) {
            y += 10;
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.text('OBSERVAÇÕES:', margemEsq, y);
            
            y += 7;
            doc.setFont(undefined, 'normal');
            const linhasObs = doc.splitTextToSize(reciboData.servico.observacao, margemDir - margemEsq);
            doc.text(linhasObs, margemEsq, y);
            y += linhasObs.length * 5;
        }
        
        // Data
        y += 15;
        const dataObj = new Date(reciboData.servico.data + 'T00:00:00');
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });
        doc.text(dataFormatada, margemEsq, y);
        
        // Assinatura
        y += 30;
        doc.line(margemEsq, y, 100, y);
        y += 5;
        doc.setFontSize(9);
        doc.text('Assinatura do Emitente', margemEsq, y);
        
        // Rodapé
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Gerado por MEI Sem Dor - meisemdor.com.br', 105, 285, { align: 'center' });
        
        // Salvar PDF
        const nomeArquivo = 'Recibo_' + reciboData.numero + '_' + Date.now() + '.pdf';
        doc.save(nomeArquivo);
        
        // Feedback visual
        showMessage('Recibo gerado com sucesso! ✅', 'success');
    }
    
    function sendToWhatsApp() {
        // Validar formulário
        if (!validateForm()) {
            return;
        }
        
        // Montar mensagem
        const valorFormatado = 'R$ ' + parseFloat(reciboData.servico.valor).toFixed(2).replace('.', ',');
        const dataObj = new Date(reciboData.servico.data + 'T00:00:00');
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');
        
        let mensagem = `*RECIBO Nº ${reciboData.numero}*\n\n`;
        mensagem += `*EMITENTE:*\n${reciboData.emitente.nome}\n`;
        mensagem += `${reciboData.emitente.cpfCnpj}`;
        
        if (reciboData.emitente.endereco) {
            mensagem += `\n${reciboData.emitente.endereco}`;
        }
        
        mensagem += `\n\n*RECEBI DE:*\n${reciboData.cliente.nome}\n`;
        
        if (reciboData.cliente.cpfCnpj) {
            mensagem += `${reciboData.cliente.cpfCnpj}\n`;
        }
        
        mensagem += `\n*VALOR:* ${valorFormatado}\n`;
        mensagem += `\n*REFERENTE A:*\n${reciboData.servico.descricao}\n`;
        
        if (reciboData.servico.observacao) {
            mensagem += `\n*OBSERVAÇÕES:*\n${reciboData.servico.observacao}\n`;
        }
        
        mensagem += `\n*DATA:* ${dataFormatada}\n`;
        mensagem += `\n_Recibo gerado por MEI Sem Dor_`;
        
        // Codificar mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Abrir WhatsApp
        const urlWhatsApp = `https://wa.me/?text=${mensagemCodificada}`;
        window.open(urlWhatsApp, '_blank');
        
        showMessage('Abrindo WhatsApp... 💬', 'success');
    }
    
    function printRecibo() {
        // Criar uma nova janela com o recibo para impressão
        const printWindow = window.open('', '_blank');
        
        const reciboHTML = document.getElementById('reciboPreview').innerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Recibo ${reciboData.numero}</title>
                <style>
                    body {
                        font-family: Georgia, serif;
                        padding: 40px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .recibo-template { font-size: 14px; }
                    .recibo-header { 
                        text-align: center; 
                        border-bottom: 2px solid #000;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .recibo-header h3 { 
                        font-size: 32px; 
                        margin: 0;
                    }
                    .recibo-id { 
                        font-size: 14px; 
                        color: #666;
                        margin-top: 10px;
                    }
                    .recibo-section { 
                        margin-bottom: 25px; 
                    }
                    .recibo-section h4 {
                        font-size: 12px;
                        color: #666;
                        margin-bottom: 5px;
                        text-transform: uppercase;
                    }
                    .recibo-section p {
                        font-size: 16px;
                        line-height: 1.5;
                        margin: 0;
                    }
                    .recibo-valor {
                        font-size: 24px !important;
                        font-weight: bold;
                        color: #0066CC;
                    }
                    .recibo-footer {
                        margin-top: 60px;
                        padding-top: 30px;
                        border-top: 1px solid #ddd;
                    }
                    .recibo-assinatura {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .assinatura-line {
                        width: 250px;
                        height: 1px;
                        background: #000;
                        margin: 40px auto 10px;
                    }
                    .recibo-watermark {
                        text-align: center;
                        font-size: 12px;
                        color: #999;
                        font-style: italic;
                    }
                    @media print {
                        body { padding: 20px; }
                    }
                </style>
            </head>
            <body>
                ${reciboHTML}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Aguardar carregamento e imprimir
        setTimeout(() => {
            printWindow.print();
        }, 250);
        
        showMessage('Preparando para impressão... 🖨️', 'success');
    }
    
    function clearForm() {
        if (confirm('Tem certeza que deseja limpar todos os dados?')) {
            form.reset();
            document.getElementById('servicoData').value = new Date().toISOString().split('T')[0];
            localStorage.removeItem('reciboRascunho');
            updatePreviewFromForm();
            showMessage('Formulário limpo! 🗑️', 'success');
        }
    }
    
    function saveDraft() {
        updatePreviewFromForm();
        localStorage.setItem('reciboRascunho', JSON.stringify(reciboData));
        showMessage('Rascunho salvo! 💾', 'success');
    }
    
    function loadDraft() {
        const rascunho = localStorage.getItem('reciboRascunho');
        if (rascunho) {
            try {
                reciboData = JSON.parse(rascunho);
                
                // Preencher formulário
                document.getElementById('emitenteNome').value = reciboData.emitente.nome || '';
                document.getElementById('emitenteCpfCnpj').value = reciboData.emitente.cpfCnpj || '';
                document.getElementById('emitenteEndereco').value = reciboData.emitente.endereco || '';
                
                document.getElementById('clienteNome').value = reciboData.cliente.nome || '';
                document.getElementById('clienteCpfCnpj').value = reciboData.cliente.cpfCnpj || '';
                
                document.getElementById('servicoDescricao').value = reciboData.servico.descricao || '';
                document.getElementById('servicoValor').value = reciboData.servico.valor || '';
                document.getElementById('servicoData').value = reciboData.servico.data || '';
                document.getElementById('servicoObservacao').value = reciboData.servico.observacao || '';
                
                updatePreview();
            } catch (e) {
                console.error('Erro ao carregar rascunho:', e);
            }
        }
    }
    
    function validateForm() {
        const camposObrigatorios = [
            { id: 'emitenteNome', nome: 'Nome do Emitente' },
            { id: 'emitenteCpfCnpj', nome: 'CPF/CNPJ do Emitente' },
            { id: 'clienteNome', nome: 'Nome do Cliente' },
            { id: 'servicoDescricao', nome: 'Descrição do Serviço' },
            { id: 'servicoValor', nome: 'Valor' },
            { id: 'servicoData', nome: 'Data' }
        ];
        
        for (let campo of camposObrigatorios) {
            const elemento = document.getElementById(campo.id);
            if (!elemento.value.trim()) {
                showMessage(`Por favor, preencha: ${campo.nome}`, 'error');
                
                // Ir para a aba correta
                if (campo.id.startsWith('emitente')) {
                    document.querySelector('[data-tab="emitente"]').click();
                } else if (campo.id.startsWith('cliente')) {
                    document.querySelector('[data-tab="cliente"]').click();
                } else if (campo.id.startsWith('servico')) {
                    document.querySelector('[data-tab="servico"]').click();
                }
                
                elemento.focus();
                return false;
            }
        }
        
        // Validar valor
        const valor = parseFloat(document.getElementById('servicoValor').value);
        if (isNaN(valor) || valor <= 0) {
            showMessage('Por favor, insira um valor válido maior que zero', 'error');
            document.querySelector('[data-tab="servico"]').click();
            document.getElementById('servicoValor').focus();
            return false;
        }
        
        return true;
    }
    
    function showMessage(texto, tipo) {
        // Remover mensagens anteriores
        const mensagemAnterior = document.querySelector('.message');
        if (mensagemAnterior) {
            mensagemAnterior.remove();
        }
        
        // Criar nova mensagem
        const mensagem = document.createElement('div');
        mensagem.className = `message message-${tipo}`;
        mensagem.textContent = texto;
        
        // Inserir no topo do formulário
        const formCard = document.querySelector('.form-card');
        formCard.insertBefore(mensagem, formCard.firstChild);
        
        // Remover após 3 segundos
        setTimeout(() => {
            mensagem.remove();
        }, 3000);
    }
    
    function numeroParaExtenso(numero) {
        // Função simplificada - você pode usar uma biblioteca mais completa
        const valor = parseFloat(numero).toFixed(2);
        const partes = valor.split('.');
        const reais = parseInt(partes[0]);
        const centavos = parseInt(partes[1]);
        
        let extenso = '';
        
        if (reais === 0) {
            extenso = 'zero reais';
        } else if (reais === 1) {
            extenso = 'um real';
        } else {
            extenso = reais + ' reais';
        }
        
        if (centavos > 0) {
            if (centavos === 1) {
                extenso += ' e um centavo';
            } else {
                extenso += ' e ' + centavos + ' centavos';
            }
        }
        
        return extenso;
    }
});
