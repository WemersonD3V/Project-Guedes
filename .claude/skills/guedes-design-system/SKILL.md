---
name: guedes-design-system
description: Guia de design do site Guedes Tattoo (estúdio de tatuagem e piercing em Januária-MG). Use em qualquer mudança de HTML, CSS ou JS da página — nova seção, ajuste visual, botão, galeria ou responsividade. Mantém a identidade preto + dourado, o foco nas fotos dos trabalhos e o layout mobile-first.
metadata:
  author: WemersonDEV
  version: "1.0.0"
  based-on: justaspetrauskas/ink-forge tatto-design-system (adaptado)
---

# Guedes Tattoo — Design System

Site institucional de uma página (one-page) em HTML, CSS e JS puros, sem framework e sem build.
Arquivos: `index.html`, `css/style.css`, `js/script.js`, imagens em `image/`.

Objetivo do site: contar a história do estúdio, mostrar a galeria e levar o visitante ao **WhatsApp** (principal conversão) e ao **mapa**.

## Princípios

- **A arte vem primeiro.** Fotos de tatuagens e piercings têm prioridade visual; nunca cortar, esticar ou cobrir o trabalho.
- **Visual calmo e premium.** Espaço em branco, pouca decoração, nada de gradientes chamativos.
- **Dourado é destaque, não decoração.** Usar só em CTAs, palavras-chave e ícones de ação.
- **Tudo leva ao WhatsApp.** Toda seção de venda termina num CTA claro.
- **Mobile-first.** A maioria das visitas vem do celular (Instagram → site).
- Animações suaves e com propósito (150–300 ms em interações).

## Tokens (definidos em `:root` no `css/style.css`)

Sempre usar as variáveis; não criar cores soltas.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `--dourado` | `#FFC947` | destaque: h2, CTAs, ícones, links do rodapé |
| `--texto` | `#555` | parágrafos em fundo claro |
| `--escuro` | `#222324` | rodapé, superfícies escuras |
| branco | `#FFF` | fundo das seções claras; texto sobre foto |
| preto | `#000` | texto forte em fundo claro |
| WhatsApp | `#25D366` | **somente** ícone/botão do WhatsApp |
| overlay | `rgba(0,0,0,.5)` | escurecer fotos de fundo para o texto ficar legível |

### Tipografia

- **Títulos:** `Oswald`, sans-serif — em CAIXA ALTA.
  - `h1` bold, `clamp(1.75rem, 1.3rem + 2.2vw, 3rem)`
  - `h2` peso 300, dourado, `clamp(1.2rem, 1rem + 1vw, 1.75rem)` — funciona como "sobretítulo"
  - `h3` 1.25–2rem, peso 400
- **Texto:** `Roboto`, sans-serif, 1rem, `line-height: 1.6`.
- Usar `clamp()` para tamanhos fluidos; evitar tamanhos fixos diferentes por breakpoint.
- Apenas **um `h1` por página** (o do topo); as demais seções começam em `h2`.

### Espaçamento e layout

- Margem lateral: `--gutter` = `clamp(1rem, 4vw, 3rem)`.
- Largura máxima de texto corrido: `--largura-texto` = 720px.
- Largura máxima de conteúdo (galeria, cabeçalho): 1200px.
- Respiro vertical das seções: `2rem` no celular, `4rem` a partir de 900px.
- Escala de espaços: 4, 8, 12, 16, 24, 32, 48, 64 px.

### Breakpoints

- Base (sem media query): celular, a partir de 320px.
- `min-width: 600px`: tablet — cards lado a lado, galeria em 2 colunas.
- `min-width: 900px`: desktop — menu horizontal, galeria em 3 colunas.
- Nunca usar `100vw` para largura (causa rolagem lateral); usar `100%`.
- Topo usa `min-height: 100svh`, não `height: 100vh`.

### Bordas, sombras e movimento

- Botões de CTA: formato pílula, `border-radius: 30px`.
- Fotos: `border-radius` 5–10px, sombra leve `3px 3px 9px #00000045`.
- Botão flutuante e menu: `0 4px 12px rgba(0,0,0,.3)`.
- Transições: 150–300 ms em hover e menu; efeitos decorativos podem ser mais lentos (o tom de cinza das fotos da equipe usa 3s).

## Componentes

### Botões (CTA)

- Estrutura: `<div class="button"><a ...>TEXTO</a></div>` — estilizar o `<a>` (é ele que recebe o toque).
- Área de toque mínima: **48px de altura**.
- Sobre foto escura: borda branca ou dourada, texto branco, Oswald.
- Sobre fundo claro: borda dourada, texto preto.
- Links externos com `target="_blank"`.

### Link de WhatsApp

- Número: `5538999646929`, formato `https://api.whatsapp.com/send?phone=5538999646929&text=...`
- A mensagem pré-preenchida deve ser natural (ex.: "Olá! Vim pelo site e gostaria de um orçamento").
- Botão flutuante: círculo verde `#25D366`, ícone branco, canto inferior direito; aparece após rolar 100px.

### Seções com foto de fundo (topo, promoção, orçamento)

- `background-size: cover` + `div` interna com o overlay escuro.
- Texto branco/dourado, centralizado.

### Cards da equipe

- Foto em `aspect-ratio: 3/4` com `object-fit: cover`, começa em cinza e ganha cor ao entrar na tela.
- Nome sobre a mancha de tinta (`tinta-borrada.webp`), posicionada com `position: absolute` em relação ao card — nunca com margens fixas por tamanho de tela.
- Card inteiro é link para o Instagram do artista.

### Galeria

- Layout em mural (`columns`): 1 / 2 / 3 colunas.
- Fotos mantêm a proporção original — **não cortar tatuagens**.
- `alt` descrevendo o trabalho (ex.: "Tatuagem realista de Medusa no braço").

## Imagens

- Formato **WebP**, redimensionado ao maior tamanho em que aparece (galeria ≤ 900px de largura; fundos ≤ 1024px).
- Sempre com `width` e `height` no HTML; `loading="lazy" decoding="async"` em tudo que não aparece na primeira tela.
- A imagem do topo tem `<link rel="preload">`.
- Exceção: `logo.jpg` fica em JPG porque é a `og:image` (WhatsApp/Instagram lidam mal com WebP).
- Não versionar arquivos-fonte (PSD, originais grandes).

## Acessibilidade

- Não bloquear zoom (`user-scalable=no` proibido).
- Elementos clicáveis devem ser `<a>` ou `<button>`, nunca `<div>`.
- Contraste legível: texto sobre foto sempre com overlay.
- Ícones sem texto precisam de `aria-label`.

## Checklist antes de entregar

1. As fotos dos trabalhos continuam sendo o destaque e sem distorção?
2. O dourado aparece só em destaques e CTAs?
3. Cores, fontes e espaços vêm dos tokens acima?
4. Funciona em 320px, 375px, 768px e 1280px sem rolagem lateral?
5. Todo CTA tem pelo menos 48px de altura e leva ao lugar certo (WhatsApp/Instagram/mapa)?
6. Imagens novas estão em WebP, com `width`/`height` e lazy loading?
7. Animações são suaves (sem efeito "pulando" ou piscando)?
8. Só existe um `h1` e a ordem dos títulos faz sentido?

Se alguma resposta for "não", corrigir antes de finalizar.
