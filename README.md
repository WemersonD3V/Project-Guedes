# Guedes Tattoo

Site do **Guedes Tattoo Studio**, estúdio de tatuagem e piercing em Januária-MG.

🔗 https://guedestattoo.vercel.app

## O que tem no site

- História do estúdio e da equipe (Gean Guedes e Layana Benevides)
- Promoção de piercing
- Galeria de trabalhos com foto ampliada (lightbox, com setas e deslize no celular)
- Orçamento e agendamento pelo WhatsApp
- Endereço, horário, botão "Como chegar" e mapa

## Tecnologias

HTML, CSS e JavaScript puros, sem framework e sem build. Hospedado na Vercel.

```
index.html          página única
css/style.css       estilos (mobile-first, breakpoints em 600px e 900px)
js/script.js        menu, lightbox, botões flutuantes e medição de cliques
image/              imagens em WebP (exceto logo.jpg, usada no compartilhamento)
.claude/skills/     guia de design do projeto (guedes-design-system)
```

## Rodando localmente

Basta servir a pasta com qualquer servidor estático, por exemplo:

```sh
npx http-server -p 5500
```

e abrir http://localhost:5500.

## Medição (Google Analytics)

O site envia eventos para o GA4 ao clicar em:

| Evento | Quando |
|---|---|
| `whatsapp_click` | qualquer botão de WhatsApp (parâmetro `origem` indica qual) |
| `instagram_click` | links do Instagram |
| `como_chegar_click` | botão "Como chegar" |
| `galeria_foto_aberta` | foto ampliada na galeria |

## Imagens

Novas imagens devem ser convertidas para WebP e redimensionadas
(galeria até 900px de largura, fundos até 1024px), com `width`, `height`
e `loading="lazy"` no HTML.

---

Feito por [WemersonDEV](https://www.instagram.com/_.wemerson/)
