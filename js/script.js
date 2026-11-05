// if (window.innerWidth > 768) {
//   // Se a largura for maior que 768px (Desktop)
//   document.body.innerHTML = `
    
//   <h1>Acesso permitido apenas via Mobile 📱</h1>
// `;

// window.alert("Acesso permitido apenas via Mobile 📱");
// }



// codigo feito para mudar a tonalida ao aproximar com o scroll

document.addEventListener("scroll", function () {
  const imagens = document.querySelectorAll(
    "#specialists .solo-specialist img"
  ); // Seleciona todas as imagens

  imagens.forEach((imagem) => {
    const rect = imagem.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      imagem.classList.add("visible");
    } else {
      imagem.classList.remove("visible");
    }
  });
});

const menuBurger = document.querySelector("#menu-hamburg");
const menu = document.querySelector("#cabecalho nav");

menuBurger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Fecha o menu mobile ao tocar em um link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("active"));
});

document.getElementById("btnTopo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Rola suavemente para o topo
});

window.addEventListener("scroll", () => {
  const botao = document.getElementById("btnTopo");
  const botaoSide = document.getElementById("btnSide");

  if (window.scrollY > 100) {
    // Se o usuário tiver descido mais de 100px
    botao.classList.add("mostrar"); // Torna visível
    botaoSide.classList.add("mostrar"); // Torna visível
  } else {
    botao.classList.remove("mostrar"); // Esconde quando está no topo
    botaoSide.classList.remove("mostrar"); // Esconde quando está no topo
  }
});
