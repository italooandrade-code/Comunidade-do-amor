//=========================

const API_URL = "";

// 1️⃣ CHAVES
//=========================
const LOGGED_KEY = "comunidade_logged";
const SESSION_EMAIL_KEY = "comunidade_email";

//=========================
// 2️⃣ PROTEÇÃO COM SESSION
//=========================
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

  const email = data.email;
  const nome = email.split("@")[0];

  document.getElementById("userName").textContent = nome;
  document.getElementById("welcomeText").textContent = `Olá, ${nome} 💜`;

})
.catch(error => {
  console.log("Erro ao verificar sessão:", error);
  window.location.href = "login.html";
});



//=========================
// 7️⃣ LOGOUT
//=========================
document.getElementById("logoutBtn").addEventListener("click", function(){

  fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include"
  })
  .then(response => response.json())
  .then(data => {

    localStorage.removeItem(LOGGED_KEY);
    localStorage.removeItem(SESSION_EMAIL_KEY);

    window.location.href = "login.html";

  })
  .catch(error => {
    console.log("Erro ao sair:", error);

    localStorage.removeItem(LOGGED_KEY);
    localStorage.removeItem(SESSION_EMAIL_KEY);

    window.location.href = "login.html";
  });

});

//=========================
// 8️⃣ MENSAGEM DO DIA
//=========================
const mensagens = [
  "O que é seu está sendo preparado para voltar.",
  "Hoje é um dia de conexão espiritual.",
  "Confie no processo, mesmo que não veja ainda.",
  "A energia que você envia, retorna.",
  "O amor nunca se perde, ele se transforma."
];

const hoje = new Date().getDate();
const mensagem = mensagens[hoje % mensagens.length];

document.getElementById("messageText").textContent = mensagem;

//ABRE O BOTÃO DE INICIAÇÃO //
//==========================//

const btnIniciacao = document.getElementById("btnIniciacao");

btnIniciacao.addEventListener("click", () => {
  window.location.href = "iniciacao.html";
});

const btnRituals = document.getElementById("btnRituals");

btnRituals.addEventListener("click", () => {
  window.location.href = "rituals.html";
});

//ia-orientacao


const btnIaorientacao = document.getElementById("btnIaorientacao");

btnIaorientacao.addEventListener("click", () => {
  window.location.href = "ia-orientacao.html";
});

//btncurso

const btnCurso = document.getElementById("btnCurso");

btnCurso.addEventListener("click", () => {
  window.location.href = "curso.html";
});


