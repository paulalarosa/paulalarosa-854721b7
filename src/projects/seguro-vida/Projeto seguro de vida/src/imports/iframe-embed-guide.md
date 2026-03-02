# Padronizar app para embedding em iframe mobile

## Contexto
Este app será exibido dentro de um **phone frame de 260px × 508px** em um portfólio web.
O iframe tem esse tamanho exato e precisa que o app renderize como uma tela mobile nativa,
sem nenhum wrapper ou cenário decorativo ao redor.

## O que verificar e corrigir

### 1. Remover qualquer PhoneFrame ou wrapper decorativo do App.tsx

Abra `src/app/App.tsx` e verifique se o JSX raiz envolve o conteúdo em algum componente
de apresentação como `<PhoneFrame>`, `<MobileShell>`, `<DeviceWrapper>`, `<AppContainer>`
ou qualquer `div` com fundo decorativo, sombra ou cenário (ex: `bg-gray-900`, `bg-slate-800`,
`min-h-screen flex items-center justify-center` com padding externo).

**Se encontrar**, substitua pela estrutura direta:

```tsx
// ❌ ANTES — app dentro de wrapper decorativo
return (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <PhoneFrame>
      <Router>...</Router>
    </PhoneFrame>
  </div>
);

// ✅ DEPOIS — app direto, sem wrapper externo
return (
  <div className="w-full h-full overflow-hidden">
    <Router>...</Router>
  </div>
);
```

### 2. Garantir que o root ocupa 100% do viewport

O componente raiz deve usar:
```tsx
<div className="w-full h-full overflow-hidden">
  {/* conteúdo do app */}
</div>
```

**Não usar** `min-h-screen`, `100vh` ou dimensões fixas em px no root —
isso quebra o comportamento dentro do iframe.

### 3. Verificar o arquivo `src/styles/index.css` ou equivalente

Certifique-se que html e body não têm background color decorativo que vaze para fora do app:
```css
html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
```

### 4. Verificar o `index.html`

O viewport meta tag deve estar configurado para mobile:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
```

### 5. NÃO alterar

- A navegação interna (BottomNav, TabBar, etc.) — manter igual
- As telas e componentes do app — manter igual
- Qualquer lógica de estado ou roteamento — manter igual
- O design visual das telas — manter igual

O objetivo é **apenas** garantir que o app renderize diretamente como conteúdo mobile,
sem envoltório decorativo, para funcionar corretamente quando embedado em iframe.

## Resultado esperado
Ao abrir o `.figma.site` no browser com a janela em 390px de largura,
o app deve ocupar 100% da tela sem bordas, sombras ou fundos externos.
O conteúdo do app começa no topo e vai até o final da viewport.