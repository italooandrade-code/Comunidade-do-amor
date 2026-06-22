const btnStartJourney =
document.getElementById("btnStartJourney");

btnStartJourney.addEventListener("click", () => {

    alert("Aqui amanhã vamos abrir a Carta 1 - O Mago");

});

const btnOuvirTexto = document.getElementById("btnOuvirTexto");
const btnPararAudio = document.getElementById("btnPararAudio");

btnOuvirTexto.addEventListener("click", () => {

  speechSynthesis.cancel();

  const texto = document.getElementById("textoApresentacao").innerText;

  const fala = new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR";
  fala.rate = 1.1;
  fala.pitch = 1;

  speechSynthesis.speak(fala);

});

btnPararAudio.addEventListener("click", () => {

  speechSynthesis.cancel();

});