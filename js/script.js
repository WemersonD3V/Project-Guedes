// Ano atual no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== Menu mobile =====
const menuBurger = document.getElementById("menu-hamburg");
const menu = document.getElementById("menu-principal");

function definirMenu(aberto) {
  menu.classList.toggle("active", aberto);
  menuBurger.setAttribute("aria-expanded", String(aberto));
  menuBurger.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

menuBurger.addEventListener("click", () => {
  definirMenu(!menu.classList.contains("active"));
});

// Fecha o menu ao tocar em um link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => definirMenu(false));
});

// ===== Fotos da equipe: ganham cor ao entrar na tela =====
const fotosEquipe = document.querySelectorAll("#specialists .solo-specialist img");

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    entrada.target.classList.toggle("visible", entrada.isIntersecting);
  });
});
fotosEquipe.forEach((foto) => observador.observe(foto));

// ===== Botões flutuantes (topo e WhatsApp) =====
const botaoTopo = document.getElementById("btnTopo");
const botaoWhats = document.getElementById("btnSide");

botaoTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function atualizarBotoes() {
  const mostrar = window.scrollY > 100;
  botaoTopo.classList.toggle("mostrar", mostrar);
  botaoWhats.classList.toggle("mostrar", mostrar);
}
window.addEventListener("scroll", atualizarBotoes, { passive: true });
atualizarBotoes();

// ===== Medição de cliques (Google Analytics) =====
// Envia um evento quando alguém clica em WhatsApp, Instagram ou "Como chegar".
// No GA4, os eventos aparecem em Relatórios > Engajamento > Eventos.
function registrarEvento(nome, parametros) {
  if (typeof gtag === "function") gtag("event", nome, parametros);
}

document.querySelectorAll("a[href]").forEach((link) => {
  const url = link.href;
  let evento = null;

  if (url.includes("whatsapp.com") || url.includes("wa.me")) evento = "whatsapp_click";
  else if (url.includes("instagram.com")) evento = "instagram_click";
  else if (url.includes("google.com/maps")) evento = "como_chegar_click";

  if (!evento) return;

  link.addEventListener("click", () => {
    registrarEvento(evento, {
      origem: link.dataset.origem || link.closest("section, footer, header")?.id || "site",
      link_url: url,
    });
  });
});

// ===== Lightbox da galeria =====
const lightbox = document.getElementById("lightbox");
const lbImagem = lightbox.querySelector("img");
const lbLegenda = lightbox.querySelector("figcaption");
const fotosGaleria = [...document.querySelectorAll("#gallery-img .gallery-item img")];
let fotoAtual = 0;

function mostrarFoto(indice) {
  fotoAtual = (indice + fotosGaleria.length) % fotosGaleria.length;
  const foto = fotosGaleria[fotoAtual];
  lbImagem.src = foto.currentSrc || foto.src;
  lbImagem.alt = foto.alt;
  lbLegenda.textContent = `${foto.alt} · ${fotoAtual + 1} / ${fotosGaleria.length}`;
}

function abrirLightbox(indice) {
  mostrarFoto(indice);
  if (typeof lightbox.showModal === "function") lightbox.showModal();
  else lightbox.setAttribute("open", "");
  registrarEvento("galeria_foto_aberta", { foto: fotosGaleria[indice].alt });
}

function fecharLightbox() {
  if (typeof lightbox.close === "function") lightbox.close();
  else lightbox.removeAttribute("open");
}

fotosGaleria.forEach((foto, indice) => {
  const botao = foto.closest(".gallery-item");
  botao.setAttribute("aria-label", `Ampliar foto: ${foto.alt}`);
  botao.addEventListener("click", () => abrirLightbox(indice));
});

lightbox.querySelector(".lb-fechar").addEventListener("click", fecharLightbox);
lightbox.querySelector(".lb-anterior").addEventListener("click", () => mostrarFoto(fotoAtual - 1));
lightbox.querySelector(".lb-proxima").addEventListener("click", () => mostrarFoto(fotoAtual + 1));

// Fecha ao tocar fora da foto
lightbox.addEventListener("click", (evento) => {
  if (evento.target === lightbox || evento.target.tagName === "FIGURE") fecharLightbox();
});

// Setas do teclado (o Esc já fecha o <dialog> nativamente)
lightbox.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowLeft") mostrarFoto(fotoAtual - 1);
  if (evento.key === "ArrowRight") mostrarFoto(fotoAtual + 1);
});

// Deslizar o dedo para trocar de foto no celular
let toqueInicioX = null;
lightbox.addEventListener("touchstart", (evento) => {
  toqueInicioX = evento.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener("touchend", (evento) => {
  if (toqueInicioX === null) return;
  const distancia = evento.changedTouches[0].clientX - toqueInicioX;
  if (Math.abs(distancia) > 50) mostrarFoto(fotoAtual + (distancia < 0 ? 1 : -1));
  toqueInicioX = null;
});
