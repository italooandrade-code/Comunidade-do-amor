//=========================
// 1️⃣ PROTEÇÃO COM SESSION
//=========================

const API_URL = "";

let email = "";
let initProgress = 1;
let hasCompletedInitiation = false;

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

  //=========================
// BUSCAR STATUS DA INICIAÇÃO NO BANCO
//=========================

fetch(`${API_URL}/status-iniciacao`, {
  method: "GET",
  credentials: "include"
})
.then(response => response.json())
.then(data => {

  if (!data.success) {
    lockRituals();
    return;
  }

  hasCompletedInitiation = data.iniciacaoConcluida;

  if (hasCompletedInitiation) {
    unlockRituals();
  } else {
    lockRituals();
  }

  console.log("Iniciação concluída?", hasCompletedInitiation);

})
.catch(error => {

  console.log("Erro ao buscar status da iniciação:", error);

  lockRituals();

});

  console.log("Email logado:", email);
  console.log("Progresso da iniciação:", initProgress);
  console.log("Iniciação concluída?", hasCompletedInitiation);

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});

//=========================
// 5️⃣ ELEMENTOS DA TELA
//=========================

// aviso do topo
const accessNotice = document.getElementById("accessNotice");

// contador/badge do topo
const ritualsBadge = document.getElementById("ritualsBadge");

// todos os cards de ritual
const ritualCards = document.querySelectorAll(".ritual-card");

// todos os botões dos cards
const ritualButtons = document.querySelectorAll(".ritual-btn");


//=========================
// 6️⃣ FUNÇÃO PARA BLOQUEAR RITUAIS
//=========================

function lockRituals() {
  // adiciona classe no body para controle visual geral
  document.body.classList.add("rituals-locked");

  // muda a mensagem do topo
  if (accessNotice) {
    accessNotice.textContent =
      "Os rituais só podem ser acessados após a conclusão da iniciação. Isso garante uma preparação energética mais segura e consciente.";
  }

  // mantém contador visual
  if (ritualsBadge) {
    ritualsBadge.textContent = `${ritualCards.length} rituais disponíveis`;
  }

  // percorre cada card
  ritualCards.forEach(card => {
    card.classList.add("locked");
    card.setAttribute("aria-disabled", "true");
  });

  // percorre cada botão
  ritualButtons.forEach(button => {
    button.disabled = true;
    button.textContent = "Bloqueado até concluir a iniciação";
  });
}


//=========================
// 7️⃣ FUNÇÃO PARA LIBERAR RITUAIS
//=========================

function unlockRituals() {
  // remove classe geral de bloqueio
  document.body.classList.remove("rituals-locked");

  // muda a mensagem do topo
  if (accessNotice) {
    accessNotice.textContent =
      "Sua iniciação foi concluída. Agora você já pode acessar os rituais com intenção, presença e verdade.";
  }

  // mantém contador visual
  if (ritualsBadge) {
    ritualsBadge.textContent = `${ritualCards.length} rituais disponíveis`;
  }

  // percorre cada card
  ritualCards.forEach(card => {
    card.classList.remove("locked");
    card.removeAttribute("aria-disabled");
  });

  // percorre cada botão
  ritualButtons.forEach(button => {
    button.disabled = false;

    // se você quiser manter um texto padrão de acesso
    button.textContent = "Acessar ritual";
  });
}


