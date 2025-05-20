if (window.innerWidth > 768) {
  // Se a largura for maior que 768px (Desktop)
  document.body.innerHTML = `
    <a class='onlyMobile' target="_blank" href="https://www.instagram.com/guedes_tatoo/">
         
    </a>
`;

window.alert("Acesso permitido apenas via Mobile 📱");
}

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

let menuBurger = document.querySelector("#menu-hamburg");

menuBurger.addEventListener("click", () => {
  const menu = document.querySelector("#cabecalho nav");
  menu.classList.toggle("active");
  console.log(menu.style.display);
});

document.getElementById("btnTopo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Rola suavemente para o topo
});

window.addEventListener("scroll", () => {
  const botao = document.getElementById("btnTopo");

  if (window.scrollY > 100) {
    // Se o usuário tiver descido mais de 100px
    botao.classList.add("mostrar"); // Torna visível
  } else {
    botao.classList.remove("mostrar"); // Esconde quando está no topo
  }
});
