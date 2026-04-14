(function () {
  var tela = document.getElementById("tela");
  var acumulador = null;
  var operador = null;
  var esperandoNumero = true;
  var display = "0";

  function atualizar() {
    if (display === "Erro") {
      tela.textContent = display;
      return;
    }
    tela.textContent = display.replace(".", ",");
  }

  function limpar() {
    acumulador = null;
    operador = null;
    esperandoNumero = true;
    display = "0";
    atualizar();
  }

  function apagar() {
    if (display.length <= 1) {
      display = "0";
    } else {
      display = display.slice(0, -1);
    }
    atualizar();
  }

  function numero(dig) {
    if (esperandoNumero) {
      display = dig === "." ? "0." : dig;
      esperandoNumero = false;
    } else {
      if (dig === "." && display.indexOf(".") !== -1) return;
      if (display === "0" && dig !== ".") display = dig;
      else display += dig;
    }
    atualizar();
  }

  function aplicarOp(op) {
    var valor = parseFloat(display);
    if (isNaN(valor)) return;

    if (acumulador === null) {
      acumulador = valor;
    } else if (operador && !esperandoNumero) {
      acumulador = calcular(acumulador, valor, operador);
      display = formatar(acumulador);
      atualizar();
    }
    operador = op;
    esperandoNumero = true;
  }

  function calcular(a, b, op) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b === 0 ? NaN : a / b;
    return b;
  }

  function porcento() {
    var v = parseFloat(display);
    if (isNaN(v)) return;
    display = formatar(v / 100);
    atualizar();
  }

  function formatar(n) {
    if (typeof n !== "number" || !isFinite(n)) return "Erro";
    var s = String(n);
    if (s.length > 12) s = n.toPrecision(8);
    return s;
  }

  function igual() {
    if (operador === null || acumulador === null) return;
    var valor = parseFloat(display);
    if (isNaN(valor)) return;
    var r = calcular(acumulador, valor, operador);
    display = formatar(r);
    acumulador = null;
    operador = null;
    esperandoNumero = true;
    atualizar();
  }

  document.querySelector(".teclas").addEventListener("click", function (e) {
    var alvo = e.target;
    if (alvo.tagName !== "BUTTON") return;

    var n = alvo.getAttribute("data-num");
    var op = alvo.getAttribute("data-op");
    var ac = alvo.getAttribute("data-ac");

    if (n !== null) {
      if (n === ".") numero(".");
      else numero(n);
    } else if (op !== null) {
      aplicarOp(op);
    } else if (ac === "clear") limpar();
    else if (ac === "back") apagar();
    else if (ac === "percent") porcento();
    else if (ac === "eq") igual();
  });

  atualizar();
})();
