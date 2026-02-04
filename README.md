# MEI Sem Dor 💼

Ferramentas gratuitas para simplificar a vida do microempreendedor individual brasileiro.

## 🚀 Funcionalidades

### Gerador de Recibos Premium ✅
- ✨ Design profissional e moderno
- 📱 100% otimizado para mobile
- 📄 Geração de PDF de alta qualidade
- 💾 Histórico de recibos salvos localmente
- 🔒 Privacidade total (dados no seu dispositivo)
- ⚡ Funciona offline
- 📊 Estatísticas de recibos gerados

### Calculadora DAS ✅
- 💰 Cálculo automático do DAS por categoria MEI
- 📈 Multas e juros por atraso
- 💡 Valores atualizados para 2025
- 🎯 Interface simples e intuitiva

### Simulador de Limite Anual ✅
- 📊 Controle de faturamento mês a mês
- ⚠️ Alertas quando atingir 80% do limite
- 📈 Barra de progresso visual
- 💾 Dados salvos localmente

### Checklist Mensal ✅
- ✅ 7 tarefas essenciais do MEI
- 📅 Organização mensal
- 🎯 Progresso visual
- 🔄 Reset mensal automático

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes UI premium
- **React Router** - Navegação
- **jsPDF** - Geração de PDFs
- **html2canvas** - Conversão HTML para imagem
- **Sonner** - Notificações toast
- **Lucide React** - Ícones

## 📦 Instalação Local

```bash
# Clone o repositório
git clone <seu-repositorio>
cd meisemdor

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:8080`

## 🏗️ Build de Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 🚀 Deploy no Vercel

### Método 1: Via Interface Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Clique em "Deploy"

### Método 2: Via CLI Vercel

```bash
# Instale a CLI do Vercel
npm install -g vercel

# Faça login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

### Variáveis de Ambiente (Opcional)

Não há variáveis de ambiente necessárias. Tudo funciona client-side!

## 📱 PWA (Progressive Web App)

O projeto está pronto para ser um PWA. Para habilitar:

1. Adicione um `manifest.json` na pasta `public`
2. Adicione um service worker
3. Configure ícones e splash screens

## 🗂️ Estrutura de Pastas

```
meisemdor/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── ui/         # Componentes shadcn/ui
│   │   └── recibo/     # Componentes específicos do recibo
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilitários
│   ├── pages/          # Páginas da aplicação
│   │   ├── Index.tsx           # Página inicial
│   │   ├── Recibo.tsx          # Gerador de recibos
│   │   ├── SimuladorLimite.tsx # Simulador de faturamento
│   │   ├── CalculadoraDAS.tsx  # Calculadora DAS
│   │   ├── ChecklistMensal.tsx # Checklist mensal
│   │   └── NotFound.tsx        # Página 404
│   ├── App.tsx         # Componente raiz
│   ├── main.tsx        # Entry point
│   └── index.css       # Estilos globais
├── index.html          # HTML template
├── package.json        # Dependências
├── tsconfig.json       # Config TypeScript
├── tailwind.config.ts  # Config Tailwind
└── vite.config.ts      # Config Vite
```

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `src/index.css`:

```css
:root {
  --primary: 209 100% 40%;        /* Azul principal */
  --secondary: 151 100% 43%;      /* Verde secundário */
  --accent: 20 100% 60%;          /* Laranja destaque */
}
```

### Fontes

O projeto usa:
- **Inter** - Textos gerais
- **Source Serif Pro** - Documentos (recibos)

## 💾 Armazenamento Local

Os dados são salvos no `localStorage` do navegador:
- Dados do emitente (reutilizados entre recibos)
- Histórico de recibos (últimos 50)
- Número do último recibo
- Estatísticas

**Nota**: Os dados nunca saem do dispositivo do usuário.

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Linter ESLint
```

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma issue descrevendo:
- O que aconteceu
- O que você esperava que acontecesse
- Passos para reproduzir
- Screenshots (se aplicável)

## 📧 Contato

Feito com ❤️ para MEIs brasileiros

---

**100% Gratuito • Sem Cadastro • Sem Propagandas**
