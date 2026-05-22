//=========================
// 1️⃣ PROTEÇÃO COM SESSION
//=========================

const API_URL = "https://comunidade-do-amor-production.up.railway.app";
let email = "";

fetch(`${API_URL}/verificar-sessao`, {
  method: "GET",
  credentials: "include"
})
.then(response => response.json())
.then(data => {

  if(data.logado === false){
    window.location.href = "login.html";
    return;
  }

  email = data.email;

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});


//=========================
// 5️⃣ PEGAR OS CARDS DA TELA
//=========================

const btnPrimeirosPassos = document.getElementById("btnPrimeirosPassos");
const btnFerramentasJornada = document.getElementById("btnFerramentasJornada");
const btnEstrategiaDivulgacao = document.getElementById("btnEstrategiaDivulgacao");
const btnIaCurso = document.getElementById("btnIaCurso");


//=========================
// 6️⃣ ABRIR AS TELAS
//=========================

// card 1
btnPrimeirosPassos.addEventListener("click", () => {
  window.location.href = "primeiros-passos.html";
});

// card 2
btnFerramentasJornada.addEventListener("click", () => {
  window.location.href = "ferramentas-jornada.html";
});

// card 3
btnEstrategiaDivulgacao.addEventListener("click", () => {
  window.location.href = "estrategia-divulgacao.html";
});

// card 4
btnIaCurso.addEventListener("click", () => {
  window.location.href = "ia-curso.html";
});