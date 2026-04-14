// troca de página só com hover nos botões 1–4 (pedido da atividade)
var botoes = document.querySelectorAll(".pag-btn");
var folhas = document.querySelectorAll(".folha");

function mostrar(num) {
  for (var i = 0; i < folhas.length; i++) {
    folhas[i].hidden = folhas[i].id !== "pag-" + num;
  }
}

for (var b = 0; b < botoes.length; b++) {
  botoes[b].addEventListener("mouseenter", function () {
    var n = this.getAttribute("data-pag");
    mostrar(n);
  });
}

// primeira página visível ao carregar
mostrar("1");
