# 💰 Guia de Implementação - Google AdSense

## 📋 Pré-requisitos

1. **Domínio próprio** (gratuito no Vercel)
2. **Conta Google AdSense** (criar em [adsense.google.com](https://www.google.com/adsense))
3. **Conteúdo original** (já temos! ✅)
4. **Política de Privacidade** (adicionar ao site)

---

## 🚀 Passo a Passo

### 1. Criar Conta no Google AdSense

1. Acesse [adsense.google.com](https://www.google.com/adsense)
2. Clique em "Começar"
3. Faça login com sua conta Google
4. Informe a URL do seu site (ex: `meisemdor.vercel.app`)
5. Preencha seus dados de pagamento

### 2. Adicionar Código do AdSense

Quando sua conta for aprovada, você receberá um código assim:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
```

**Onde adicionar:**

Edite o arquivo `index.html` e adicione o código dentro da tag `<head>`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
         crossorigin="anonymous"></script>
    
    <title>MEI Sem Dor - Ferramentas Grátis para MEI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3. Adicionar Anúncios nas Páginas

#### Opção A: Anúncios Automáticos (Recomendado)
O código acima já ativa anúncios automáticos. O Google decide onde colocar os anúncios.

#### Opção B: Anúncios Manuais
Crie um componente React para os anúncios:

**Crie o arquivo:** `src/components/AdSense.tsx`

```tsx
import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: string;
  responsive?: boolean;
}

export function AdSense({ slot, format = 'auto', responsive = true }: AdSenseProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="adsense-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
```

**Use nas páginas:**

```tsx
import { AdSense } from '@/components/AdSense';

// Dentro do componente da página:
<AdSense slot="1234567890" />
```

### 4. Locais Recomendados para Anúncios

#### Página Inicial (`Index.tsx`)
- **Topo:** Banner horizontal após o hero
- **Meio:** Entre seções de ferramentas
- **Rodapé:** Antes do footer

#### Páginas de Ferramentas
- **Sidebar:** Anúncio vertical na lateral (desktop)
- **Entre conteúdo:** Após formulários ou resultados

**Exemplo de posicionamento:**

```tsx
// Após a seção hero
<section className="py-4 bg-muted/50">
  <div className="container">
    <AdSense slot="1234567890" format="horizontal" />
  </div>
</section>

// Entre ferramentas
<div className="grid md:grid-cols-2 gap-6">
  <ToolCard {...tool1} />
  <ToolCard {...tool2} />
  
  <div className="md:col-span-2 py-4">
    <AdSense slot="0987654321" />
  </div>
  
  <ToolCard {...tool3} />
  <ToolCard {...tool4} />
</div>
```

---

## 📊 Tipos de Anúncios

### 1. Display (Banner)
- Tamanhos: 728x90, 300x250, 336x280
- Bom para: Header, sidebar

### 2. In-feed
- Aparece entre conteúdo
- Bom para: Listas de ferramentas

### 3. In-article
- Dentro do texto
- Bom para: Páginas de ajuda/blog

### 4. Multiplex
- Grade de anúncios
- Bom para: Rodapé

---

## ⚖️ Política de Privacidade

**OBRIGATÓRIO:** Adicionar política de privacidade informando sobre cookies do Google.

**Crie o arquivo:** `src/pages/Privacidade.tsx`

```tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacidade = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
          
          <div className="prose prose-lg">
            <h2>Coleta de Dados</h2>
            <p>
              Nosso site não coleta dados pessoais diretamente. Todos os dados das
              ferramentas (recibos, cálculos, etc.) são salvos localmente no seu
              dispositivo usando localStorage.
            </p>

            <h2>Google AdSense</h2>
            <p>
              Este site usa Google AdSense para exibir anúncios. O Google pode usar
              cookies para personalizar anúncios baseados em visitas anteriores.
            </p>
            <p>
              Você pode desativar anúncios personalizados em:
              <a href="https://adssettings.google.com" target="_blank" rel="noopener">
                Configurações de Anúncios do Google
              </a>
            </p>

            <h2>Cookies</h2>
            <p>
              Usamos cookies para melhorar sua experiência. Ao continuar navegando,
              você concorda com o uso de cookies.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
```

**Adicione a rota em `App.tsx`:**

```tsx
import Privacidade from "./pages/Privacidade";

// Dentro de <Routes>:
<Route path="/privacidade" element={<Privacidade />} />
```

**Adicione link no Footer:**

```tsx
<li>
  <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-primary">
    Política de Privacidade
  </Link>
</li>
```

---

## 🎯 Melhores Práticas

### DO's ✅
- Mantenha anúncios discretos
- Use anúncios responsivos
- Teste em mobile
- Monitore performance no painel do AdSense
- Respeite o tempo de aprovação (7-14 dias)

### DON'Ts ❌
- Não clique nos próprios anúncios
- Não peça para outros clicarem
- Não coloque muitos anúncios (máx. 3 por página)
- Não oculte conteúdo importante com anúncios
- Não viole as políticas do Google

---

## 📈 Otimização

### Aumentar Receita
1. **Posicionamento:** Acima da dobra (visível sem scroll)
2. **Tamanho:** Maiores pagam mais (300x600, 728x90)
3. **Conteúdo:** Mais tráfego = mais receita
4. **Nicho:** Finanças e negócios têm CPM alto

### Monitoramento
Acesse o painel do AdSense diariamente:
- Receita estimada
- Cliques e impressões
- RPM (receita por mil impressões)
- CTR (taxa de cliques)

---

## 🚨 Troubleshooting

### Anúncios não aparecem?
1. Aguarde aprovação da conta (7-14 dias)
2. Verifique se o código está no `<head>`
3. Desative bloqueadores de anúncios
4. Aguarde 24-48h após adicionar código
5. Verifique erros no console do navegador

### Conta suspensa?
- Leia o email do Google
- Corrija violações de política
- Peça revisão

---

## 💡 Dicas Extras

### 1. Aviso de Cookies (LGPD)
Adicione um banner informando sobre cookies:

```tsx
// src/components/CookieConsent.tsx
export function CookieConsent() {
  const [show, setShow] = useState(true);
  
  if (!show) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 z-50">
      <div className="container flex items-center justify-between gap-4">
        <p className="text-sm">
          Usamos cookies para melhorar sua experiência. 
          <a href="/privacidade" className="underline ml-1">Saiba mais</a>
        </p>
        <button onClick={() => setShow(false)} className="btn-secondary">
          Aceitar
        </button>
      </div>
    </div>
  );
}
```

### 2. Analytics
Combine AdSense com Google Analytics para insights mais profundos.

### 3. Teste A/B
Experimente diferentes posições de anúncios para otimizar receita.

---

## 📞 Suporte Google AdSense

- **Central de Ajuda:** [support.google.com/adsense](https://support.google.com/adsense)
- **Fórum:** [support.google.com/adsense/community](https://support.google.com/adsense/community)
- **Políticas:** [support.google.com/adsense/answer/48182](https://support.google.com/adsense/answer/48182)

---

## ✅ Checklist Final

- [ ] Conta AdSense criada e aprovada
- [ ] Código AdSense adicionado no `index.html`
- [ ] Componente `AdSense.tsx` criado
- [ ] Anúncios posicionados nas páginas
- [ ] Política de privacidade publicada
- [ ] Link para privacidade no footer
- [ ] Aviso de cookies implementado (opcional)
- [ ] Site testado em mobile e desktop
- [ ] Anúncios aparecendo corretamente

---

**Boa sorte com sua monetização! 💰**
