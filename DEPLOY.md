# 🚀 Guia de Deploy - MEI Sem Dor

## Deploy no Vercel (Recomendado)

### Pré-requisitos
- Conta no GitHub
- Conta no Vercel (gratuita)
- Código pushado para o GitHub

### Passo a Passo

#### 1. Prepare seu Repositório GitHub

```bash
# Inicialize o git (se ainda não fez)
git init

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "Initial commit - MEI Sem Dor"

# Crie um repositório no GitHub e adicione como remote
git remote add origin https://github.com/SEU-USUARIO/meisemdor.git

# Push para o GitHub
git push -u origin main
```

#### 2. Deploy via Vercel Dashboard

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New..." → "Project"
3. Importe seu repositório do GitHub
4. Configure:
   - **Project Name**: `meisemdor` (ou o nome que preferir)
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (deixe vazio ou raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

5. Clique em "Deploy"
6. Aguarde 1-3 minutos
7. Seu site estará online! 🎉

#### 3. Configurar Domínio Personalizado (Opcional)

1. No dashboard do Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções do Vercel

### Deploy via CLI

```bash
# Instale a CLI do Vercel
npm install -g vercel

# Faça login
vercel login

# Deploy para preview
vercel

# Deploy para produção
vercel --prod
```

---

## Deploy no Netlify

### Via Interface Web

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "Add new site" → "Import an existing project"
3. Conecte seu repositório GitHub
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Clique em "Deploy site"

### Via Netlify CLI

```bash
# Instale a CLI
npm install -g netlify-cli

# Faça login
netlify login

# Deploy
netlify deploy

# Deploy para produção
netlify deploy --prod
```

---

## Deploy no GitHub Pages

### 1. Instale o gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Adicione scripts no package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Configure o vite.config.ts

```typescript
export default defineConfig({
  base: '/meisemdor/', // Nome do seu repositório
  // ... resto da config
});
```

### 4. Deploy

```bash
npm run deploy
```

### 5. Configure GitHub Pages

1. Vá em Settings → Pages
2. Source: `gh-pages` branch
3. Salve

Seu site estará em: `https://SEU-USUARIO.github.io/meisemdor/`

---

## Deploy no Cloudflare Pages

### Via Dashboard

1. Acesse [pages.cloudflare.com](https://pages.cloudflare.com)
2. Conecte seu repositório GitHub
3. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
4. Deploy!

---

## Variáveis de Ambiente

Este projeto **não requer** variáveis de ambiente! Tudo funciona client-side.

---

## Troubleshooting

### Build falhando?

**Erro de memória:**
```json
// package.json - adicione no script de build
"build": "NODE_OPTIONS=--max_old_space_size=4096 vite build"
```

**Dependências faltando:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### 404 nas rotas?

Certifique-se que o `vercel.json` está configurado corretamente com rewrites.

### Imagens não carregam?

Verifique se as imagens estão na pasta `public/` e use caminhos absolutos: `/imagem.png`

---

## Monitoramento e Analytics (Opcional)

### Google Analytics

1. Crie uma propriedade no Google Analytics
2. Adicione o script no `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Vercel Analytics

No dashboard do Vercel:
1. Vá em "Analytics"
2. Habilite o recurso (gratuito até certo limite)

---

## Performance Tips

### 1. Lazy Loading de Rotas

```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const Recibo = lazy(() => import('./pages/Recibo'));

// No Routes:
<Route 
  path="/recibo" 
  element={
    <Suspense fallback={<div>Carregando...</div>}>
      <Recibo />
    </Suspense>
  } 
/>
```

### 2. Otimização de Imagens

Use formatos modernos (WebP) e compressão adequada.

### 3. Code Splitting

Já configurado automaticamente pelo Vite!

---

## Atualizações

### Deploy Automático

Com Vercel/Netlify conectados ao GitHub:
- Cada `git push` → deploy automático
- Pull Requests → preview deploy automático

### Deploy Manual

```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

O Vercel/Netlify detecta e faz deploy automaticamente!

---

## Suporte

Problemas com deploy? Abra uma issue no GitHub!

---

✅ **Projeto pronto para produção!**
