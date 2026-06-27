//=========================
// 1️⃣ PROTEÇÃO COM SESSION
//=========================

const API_URL = "";
let email = "";

fetch(`${API_URL}/verificar-sessao`, {
  method: "GET",
  credentials: "include"
})
.then(response => response.json())
.then(data => {

  if (data.logado === false) {
    window.location.href = "login.html";
    return;
  }

  email = data.email;

  console.log("Usuário logado:", email);

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});



const btnStartJourney =
document.getElementById("btnStartJourney");

btnStartJourney.addEventListener("click", () => {

  fetch(`${API_URL}/concluir-apresentacao-tarot`, {

    method: "POST",

    credentials: "include"

  })
  .then(response => response.json())
  .then(data => {

    if(!data.success){

      alert(data.message);
      return;

    }

    window.location.href = "carta-tarot.html?carta=1";

  })
  .catch(error => {

    console.log("Erro:", error);

    alert("Erro ao iniciar a jornada.");

  });

});

const btnOuvirTexto = document.getElementById("btnOuvirTexto");
const btnPararAudio = document.getElementById("btnPararAudio");

btnOuvirTexto.addEventListener("click", () => {

  speechSynthesis.cancel();

  const texto = document.getElementById("textoApresentacao").innerText;

  const fala = new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR";
  fala.rate = 1.17;
  fala.pitch = 1;

  speechSynthesis.speak(fala);

});

btnPararAudio.addEventListener("click", () => {

  speechSynthesis.cancel();

});