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

  if(data.logado === false){
    window.location.href = "login.html";
    return;
  }

  email = data.email;

  iniciarRitual();

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});


//=========================
// 5️⃣ CHAVES DO RITUAL
//=========================

// progresso individual do usuário neste ritual
const RITUAL_PROGRESS_KEY = `ritual_linha_africana_progress_${email}`;

// checklist do dia atual do usuário neste ritual
const RITUAL_CHECKLIST_KEY = `ritual_linha_africana_checklist_${email}`;

// horário da última conclusão do dia neste ritual
const RITUAL_LAST_COMPLETED_KEY = `ritual_linha_africana_last_completed_${email}`;


/// =========================
// 6️⃣ ARRAY DOS 7 DIAS
//=========================

const ritualDays = [
  {
    dia: 1,
    titulo: "Abertura da Intenção",
    mensagem: "Hoje você inicia este trabalho na linha africana com firmeza e respeito. A maçã representa a intenção central do ritual, e as 4 velas ao redor sustentam a força espiritual do pedido direcionado aos guias da linha africana.",
    passos: [
      "Coloque 1 maçã no centro da preparação do ritual.",
      "Posicione as 4 velas ao redor da maçã com equilíbrio.",
      "Direcione seu pedido aos guias da linha africana com presença e verdade.",
      "Permaneça por 2 minutos em oração e concentração espiritual."
    ],
    intencao: "Peço aos guias da linha africana que recebam esta oferenda e fortaleçam minha intenção com presença, verdade e direção espiritual. Que este trabalho siga com firmeza, abertura e atuação no caminho do amor.",
    orientacao: "Ao concluir, mantenha sua mente firme e evite pensamentos contrários à intenção trabalhada.",
    checklist: [
      "Coloquei a maçã no centro do ritual",
      "Posicionei as 4 velas ao redor",
      "Direcionei meu pedido aos guias da linha africana",
      "Mantive os 2 minutos de oração com presença"
    ]
  },

  {
    dia: 2,
    titulo: "Chamado Espiritual",
    mensagem: "Hoje o foco é fortalecer o chamado aos guias da linha africana. A repetição com constância reforça a intenção e dá continuidade à força do trabalho espiritual.",
    passos: [
      "Prepare novamente a maçã no centro do ritual.",
      "Reorganize as 4 velas ao redor da maçã.",
      "Faça seu chamado com clareza aos guias da linha africana.",
      "Permaneça por 2 minutos em oração firme e silenciosa."
    ],
    intencao: "Peço aos guias da linha africana que ouçam meu chamado e fortaleçam este trabalho com verdade, presença e movimento espiritual. Que minha intenção seja sustentada e encaminhada com clareza.",
    orientacao: "Depois do ritual, preserve sua energia e não compartilhe sua prática com pessoas que possam enfraquecer sua fé.",
    checklist: [
      "Preparei novamente a maçã no centro",
      "Organizei as 4 velas ao redor",
      "Fiz meu chamado com clareza aos guias",
      "Mantive os 2 minutos de oração com firmeza"
    ]
  },

  {
    dia: 3,
    titulo: "Fortalecimento da Direção",
    mensagem: "Hoje o ritual fortalece a direção espiritual da intenção. A constância deste terceiro dia reforça o caminho que está sendo trabalhado na linha africana.",
    passos: [
      "Posicione a maçã no centro com atenção e respeito.",
      "Deixe as 4 velas ao redor de forma estável.",
      "Mentalize a intenção principal com clareza espiritual.",
      "Ore por 2 minutos pedindo fortalecimento da direção do ritual."
    ],
    intencao: "Peço aos guias da linha africana que fortaleçam a direção deste trabalho e sustentem minha intenção com presença, clareza e atuação espiritual. Que os caminhos se organizem conforme a força deste pedido.",
    orientacao: "Conclua o dia com serenidade e evite agir por impulso ou ansiedade.",
    checklist: [
      "Posicionei a maçã com atenção",
      "Deixei as 4 velas estáveis ao redor",
      "Mentalizei a intenção principal com clareza",
      "Ore por 2 minutos pedindo fortalecimento"
    ]
  },

  {
    dia: 4,
    titulo: "Ativação da Força",
    mensagem: "Hoje o foco é ativar com mais firmeza a energia do ritual. A maçã continua representando a intenção oferecida, e as velas ao redor sustentam a atuação espiritual do pedido.",
    passos: [
      "Prepare a maçã novamente no centro do ritual.",
      "Acenda e posicione as 4 velas ao redor.",
      "Direcione seu pensamento aos guias da linha africana com confiança.",
      "Faça a oração do dia por 2 minutos com firmeza interior."
    ],
    intencao: "Peço aos guias da linha africana que ativem a força deste trabalho e sustentem minha intenção com presença, verdade e atuação espiritual. Que este pedido siga com firmeza no caminho certo.",
    orientacao: "Após o ritual, mantenha uma postura interna de confiança e evite alimentar dúvidas repetitivas.",
    checklist: [
      "Preparei novamente a maçã no centro do ritual",
      "Acendi e posicionei as 4 velas ao redor",
      "Direcionei meu pensamento aos guias com confiança",
      "Fiz os 2 minutos de oração com firmeza"
    ]
  },

  {
    dia: 5,
    titulo: "Sustentação do Pedido",
    mensagem: "Hoje você sustenta o pedido com continuidade e presença. Este é o momento de manter firme aquilo que já foi aberto e fortalecido nos dias anteriores.",
    passos: [
      "Coloque a maçã no centro com intenção renovada.",
      "Mantenha as 4 velas ao redor como sustentação do ritual.",
      "Reforce mentalmente o pedido aos guias da linha africana.",
      "Permaneça 2 minutos em oração com constância e foco."
    ],
    intencao: "Peço aos guias da linha africana que sustentem este pedido com verdade, presença e continuidade espiritual. Que minha intenção permaneça firme, protegida e conduzida no caminho certo.",
    orientacao: "Conclua o ritual do dia sem pressa e mantenha sua energia recolhida e firme.",
    checklist: [
      "Coloquei a maçã com intenção renovada",
      "Mantive as 4 velas como sustentação do ritual",
      "Reforcei mentalmente meu pedido aos guias",
      "Permanecei 2 minutos em oração com constância"
    ]
  },

  {
    dia: 6,
    titulo: "Conexão e Movimento",
    mensagem: "Hoje o ritual trabalha conexão e movimento espiritual. A intenção é fazer com que a força já ativada siga encontrando caminho e continuidade.",
    passos: [
      "Prepare a maçã no centro da prática.",
      "Posicione as 4 velas ao redor com equilíbrio.",
      "Direcione o pedido aos guias da linha africana buscando conexão e movimento.",
      "Ore por 2 minutos com foco no andamento da intenção."
    ],
    intencao: "Peço aos guias da linha africana que tragam conexão e movimento a este trabalho espiritual. Que minha intenção siga encontrando caminho, presença e direção conforme a força desta oferenda.",
    orientacao: "Ao concluir, preserve seu silêncio interior e evite atitudes que contrariem a seriedade da jornada.",
    checklist: [
      "Preparei a maçã no centro da prática",
      "Posicionei as 4 velas com equilíbrio",
      "Direcionei meu pedido buscando conexão e movimento",
      "Ore por 2 minutos com foco no andamento da intenção"
    ]
  },

  {
    dia: 7,
    titulo: "Consagração do Ritual",
    mensagem: "Hoje você conclui a jornada de 7 dias, consagrando este trabalho aos guias da linha africana com respeito, constância e firmeza espiritual.",
    passos: [
      "Posicione a maçã no centro pela última vez nesta jornada.",
      "Mantenha as 4 velas ao redor como fechamento do ritual.",
      "Entregue sua intenção final aos guias da linha africana.",
      "Permaneça 2 minutos na oração final de consagração."
    ],
    intencao: "Consagro este trabalho aos guias da linha africana e peço que sustentem minha intenção com verdade, proteção e direção espiritual. Que esta jornada de 7 dias seja recebida com firmeza e presença no caminho certo.",
    orientacao: "Finalize este ciclo com respeito, gratidão e consciência do processo realizado.",
    checklist: [
      "Posicionei a maçã para o fechamento da jornada",
      "Mantive as 4 velas ao redor como encerramento",
      "Entreguei minha intenção final aos guias",
      "Fiz os 2 minutos da oração final com firmeza"
    ]
  }
];

//=========================
// 7️⃣ DADOS INICIAIS DO PROGRESSO
//=========================

// tenta ler o progresso já salvo
// se não existir nada ainda, começa no dia 1
let currentDay = Number(localStorage.getItem(RITUAL_PROGRESS_KEY)) || 1;

// tenta ler o checklist salvo
// se não existir, cria objeto padrão
let currentChecklist = JSON.parse(localStorage.getItem(RITUAL_CHECKLIST_KEY)) || {
  passo1: false,
  passo2: false,
  passo3: false,
  passo4: false
};

// tenta ler a última conclusão do dia
// se não existir, fica null
let lastCompletedAt = localStorage.getItem(RITUAL_LAST_COMPLETED_KEY) || null;


//=========================
// 8️⃣ ELEMENTOS DA TELA
//=========================

const dayBadge = document.getElementById("dayBadge");
const statusBadge = document.getElementById("statusBadge");
const warningText = document.getElementById("warningText");

const dayTitle = document.getElementById("dayTitle");
const messageText = document.getElementById("messageText");
const ritualStepsList = document.getElementById("ritualStepsList");
const ritualPrayer = document.getElementById("ritualPrayer");
const actionText = document.getElementById("actionText");

const progressCount = document.getElementById("progressCount");
const progressText = document.getElementById("progressText");
const journeyGrid = document.getElementById("journeyGrid");

const checkPasso1 = document.getElementById("checkPasso1");
const checkPasso2 = document.getElementById("checkPasso2");
const checkPasso3 = document.getElementById("checkPasso3");
const checkPasso4 = document.getElementById("checkPasso4");
const finishBtn = document.getElementById("finishBtn");

const checkLabels = document.querySelectorAll(".check-item span");


//=========================
// 9️⃣ TEXTO FIXO DE ORIENTAÇÃO
//=========================

warningText.textContent =
  "Este ritual é direcionado aos guias da linha africana. A maçã representa a força da intenção central do trabalho, e as 4 velas ao redor sustentam a presença espiritual da jornada.";


//=========================
// 🔟 FUNÇÃO PARA MONTAR LISTA
//=========================

function renderList(listElement, items) {
  listElement.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}


//=========================
// 1️⃣1️⃣ VER SE O DIA ESTÁ BLOQUEADO
//=========================

function isDayLocked() {
  if (!lastCompletedAt) {
    return false;
  }

  const lastTime = new Date(lastCompletedAt).getTime();
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const diff = now - lastTime;

  return diff < twentyFourHours;
}


//=========================
// 1️⃣2️⃣ TEMPO RESTANTE DO BLOQUEIO
//=========================

function getRemainingLockTime() {
  if (!lastCompletedAt) {
    return "";
  }

  const lastTime = new Date(lastCompletedAt).getTime();
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const remaining = twentyFourHours - (now - lastTime);

  if (remaining <= 0) {
    return "";
  }

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}min`;
}


//=========================
// 1️⃣3️⃣ MONTAR GRADE DOS 7 DIAS
//=========================

function renderJourneyGrid() {
  journeyGrid.innerHTML = "";

  for (let i = 1; i <= 7; i++) {
    const dayBox = document.createElement("div");
    dayBox.className = "journey-day";

    if (i < currentDay) {
      dayBox.classList.add("active");
    }

    if (i === currentDay && currentDay <= ritualDays.length) {
      dayBox.classList.add("active");
    }

    if (i > currentDay) {
      dayBox.classList.add("locked");
    }

    dayBox.textContent = `Dia ${i}`;
    journeyGrid.appendChild(dayBox);
  }
}


//=========================
// 1️⃣4️⃣ APLICAR CHECKLIST NA TELA
//=========================

function applyChecklistToScreen() {
  checkPasso1.checked = currentChecklist.passo1;
  checkPasso2.checked = currentChecklist.passo2;
  checkPasso3.checked = currentChecklist.passo3;
  checkPasso4.checked = currentChecklist.passo4;
}


//=========================
// 1️⃣5️⃣ CHECKLIST COMPLETO?
//=========================

function isChecklistComplete() {
  return (
    currentChecklist.passo1 &&
    currentChecklist.passo2 &&
    currentChecklist.passo3 &&
    currentChecklist.passo4
  );
}


//=========================
// 1️⃣6️⃣ ATUALIZAR TEXTO DOS CHECKBOXES
//=========================

function updateChecklistTexts(dayData) {
  if (!dayData || !dayData.checklist) return;

  checkLabels[0].textContent = dayData.checklist[0];
  checkLabels[1].textContent = dayData.checklist[1];
  checkLabels[2].textContent = dayData.checklist[2];
  checkLabels[3].textContent = dayData.checklist[3];
}

//=========================
// 1️⃣7️⃣ ATUALIZAR ESTADO DO BOTÃO
//=========================

function updateFinishButton() {
  if (currentDay > ritualDays.length) {
    finishBtn.disabled = true;
    finishBtn.textContent = "Ritual concluído";
    return;
  }

  if (isDayLocked()) {
    finishBtn.disabled = true;
    finishBtn.textContent = "Aguardando liberação";
    return;
  }

  finishBtn.disabled = !isChecklistComplete();
  finishBtn.textContent = "Concluir dia";
}


//=========================
// 1️⃣8️⃣ FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO
//=========================

function renderCurrentDay() {
  let currentDayData = ritualDays.find(item => item.dia === currentDay);

  if (!currentDayData && currentDay > ritualDays.length) {
    currentDayData = ritualDays[ritualDays.length - 1];
  }

  if (!currentDayData) {
    dayTitle.textContent = "Dia não encontrado";
    return;
  }

  dayBadge.textContent = `Dia ${Math.min(currentDay, 7)} de 7`;

  if (currentDay > ritualDays.length) {
    statusBadge.textContent = "Ritual concluído";
  } else if (isDayLocked()) {
    statusBadge.textContent = `Liberado em ${getRemainingLockTime()}`;
  } else {
    statusBadge.textContent = "Disponível agora";
  }

  dayTitle.textContent = `Dia ${currentDayData.dia} — ${currentDayData.titulo}`;
  messageText.textContent = currentDayData.mensagem;
  ritualPrayer.textContent = currentDayData.intencao;
  actionText.textContent = currentDayData.orientacao;

  renderList(ritualStepsList, currentDayData.passos);
  updateChecklistTexts(currentDayData);

  if (currentDay > ritualDays.length) {
    progressCount.textContent = `${ritualDays.length} de 7 dias`;
    progressText.textContent = "Você concluiu toda a jornada deste ritual.";
  } else {
    progressCount.textContent = `${currentDay} de 7 dias`;

    if (isDayLocked()) {
      progressText.textContent = `O próximo dia será liberado em ${getRemainingLockTime()}.`;
    } else {
      progressText.textContent = "Conclua as etapas do dia para avançar para a próxima fase do ritual.";
    }
  }

  renderJourneyGrid();
  applyChecklistToScreen();
  updateFinishButton();
}


//=========================
// 1️⃣9️⃣ SALVAR CHECKLIST
//=========================

function saveChecklist() {
  localStorage.setItem(RITUAL_CHECKLIST_KEY, JSON.stringify(currentChecklist));
}


//=========================
// 2️⃣0️⃣ ATUALIZAR CHECKLIST AO CLICAR
//=========================

function handleChecklistChange() {
  currentChecklist = {
    passo1: checkPasso1.checked,
    passo2: checkPasso2.checked,
    passo3: checkPasso3.checked,
    passo4: checkPasso4.checked
  };

  saveChecklist();
  updateFinishButton();
}


//=========================
// 2️⃣1️⃣ CONCLUIR DIA
//=========================

function handleFinishDay() {
  if (!isChecklistComplete()) {
    return;
  }

  if (isDayLocked()) {
    return;
  }

  lastCompletedAt = new Date().toISOString();
  localStorage.setItem(RITUAL_LAST_COMPLETED_KEY, lastCompletedAt);

  currentDay = currentDay + 1;
  localStorage.setItem(RITUAL_PROGRESS_KEY, currentDay);

  currentChecklist = {
    passo1: false,
    passo2: false,
    passo3: false,
    passo4: false
  };

  localStorage.setItem(RITUAL_CHECKLIST_KEY, JSON.stringify(currentChecklist));

  renderCurrentDay();
}


//=========================
// 2️⃣2️⃣ EVENTOS
//=========================

checkPasso1.addEventListener("change", handleChecklistChange);
checkPasso2.addEventListener("change", handleChecklistChange);
checkPasso3.addEventListener("change", handleChecklistChange);
checkPasso4.addEventListener("change", handleChecklistChange);
finishBtn.addEventListener("click", handleFinishDay);


///=========================
// 2️⃣3️⃣ INICIAR TELA
//=========================

function iniciarRitual(){

  renderCurrentDay();

}


//=========================
// 2️⃣4️⃣ DEBUG
//=========================

console.log("Usuário logado:", user);
console.log("Email logado:", email);
console.log("Dia atual do ritual:", currentDay);
console.log("Checklist atual do ritual:", currentChecklist);
console.log("Última conclusão do ritual:", lastCompletedAt);