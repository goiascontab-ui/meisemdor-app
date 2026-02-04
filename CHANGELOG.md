# Changelog - MEI Sem Dor

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [2.0.0] - 2025-02-04

### ✨ Adicionado
- 💰 **Calculadora DAS** - Calcula DAS por categoria com multas e juros
- 📈 **Simulador de Limite Anual** - Controle mensal de faturamento
- 📅 **Checklist Mensal** - 7 tarefas essenciais do MEI
- 📄 **Página de Política de Privacidade** - Conforme LGPD
- 💵 **Componente AdSense** - Pronto para monetização
- 📖 **Guia Google AdSense** - Instruções completas de implementação
- 🔗 **Novas rotas** - /calculadora-das, /simulador, /checklist, /privacidade

### 🔄 Modificado
- ✏️ Removido "Sem Propagandas" de todos os textos
- 🎨 Grid de ferramentas agora é 2 colunas (mais destaque)
- 📝 Título da seção de ferramentas mais impactante
- 🔗 Footer atualizado com links para todas as ferramentas
- 📱 Meta description atualizada com as 4 ferramentas
- 📚 README.md atualizado com features completas
- 🎯 Badges das ferramentas alterados de "Em Breve" para "Novo"

### 🛠️ Técnico
- ➕ 3 novas páginas React/TypeScript
- 🔀 Sistema de rotas expandido
- 💾 LocalStorage implementado nas novas ferramentas
- 🎨 Estilos consistentes com design system existente
- ♿ Acessibilidade mantida em todas as páginas

### 📦 Arquivos Novos
```
src/pages/CalculadoraDAS.tsx
src/pages/SimuladorLimite.tsx
src/pages/ChecklistMensal.tsx
src/pages/Privacidade.tsx
src/components/AdSense.tsx
GOOGLE-ADSENSE.md
INSTRUÇÕES-ATUALIZADAS.txt
CHANGELOG.md
```

---

## [1.0.0] - 2025-01-XX

### ✨ Lançamento Inicial
- 📄 **Gerador de Recibos Premium** - Primeira ferramenta do projeto
- 🎨 Design profissional e responsivo
- 📱 Otimização mobile-first
- 💾 Sistema de histórico local
- 📊 Estatísticas de recibos
- 🔒 Privacidade total (localStorage)
- ⚡ Funciona offline
- 🎯 Interface limpa e intuitiva

### 🛠️ Tecnologias Base
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- jsPDF
- html2canvas

### 📦 Estrutura Inicial
```
src/
  components/
    ui/
    recibo/
    Header.tsx
    Footer.tsx
    ToolCard.tsx
    PhoneMockup.tsx
  pages/
    Index.tsx
    Recibo.tsx
    NotFound.tsx
  App.tsx
  main.tsx
  index.css
```

---

## Legenda

- ✨ Adicionado - Novas features
- 🔄 Modificado - Mudanças em features existentes
- ❌ Removido - Features ou arquivos removidos
- 🐛 Corrigido - Correção de bugs
- 🔒 Segurança - Melhorias de segurança
- 📚 Documentação - Melhorias na documentação
- 🎨 Estilo - Mudanças que não afetam funcionalidade
- ♿ Acessibilidade - Melhorias de acessibilidade
- ⚡ Performance - Otimizações de performance
- 🛠️ Técnico - Mudanças técnicas/infraestrutura
