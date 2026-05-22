//=========================
// 1️⃣ PROTEÇÃO COM SESSION
//=========================

let email = "";

fetch("http://127.0.0.1:3000/verificar-sessao", {
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
const RITUAL_PROGRESS_KEY = `ritual_linha_branca_progress_${email}`;

// checklist do dia atual do usuário neste ritual
const RITUAL_CHECKLIST_KEY = `ritual_linha_branca_checklist_${email}`;

// horário da última conclusão do dia neste ritual
const RITUAL_LAST_COMPLETED_KEY = `ritual_linha_branca_last_completed_${email}`;


//=========================
// 6️⃣ ARRAY DOS 7 DIAS
//=========================

const ritualDays = [
  {
    dia: 1,
    titulo: "Abertura da Luz",
    mensagem: "Hoje você inicia este trabalho na linha branca com serenidade e respeito. A maçã partida ao meio representa a abertura da intenção, e a vela branca posicionada entre as duas partes fortalece a luz espiritual do pedido oferecido aos guias da Umbanda.",
    passos: [
      "Parta a maçã ao meio com cuidado e intenção.",
      "Posicione a vela branca entre as duas partes da maçã.",
      "Ofereça seu pedido aos guias da Umbanda com paz, fé e verdade.",
      "Permaneça por 2 minutos em oração e presença espiritual."
    ],
    intencao: "Peço aos guias da Umbanda que recebam esta oferenda e conduzam minha intenção com paz, luz, verdade e direção espiritual. Que este trabalho siga com serenidade, abertura e amparo no caminho do amor.",
    orientacao: "Ao concluir, mantenha sua paz interior e preserve sua energia com serenidade.",
    checklist: [
      "Parti a maçã ao meio com cuidado",
      "Posicionei a vela branca entre as duas partes",
      "Ofereci meu pedido aos guias da Umbanda",
      "Mantive os 2 minutos de oração com paz"
    ]
  },

  {
    dia: 2,
    titulo: "Chamado de Paz",
    mensagem: "Hoje o foco é reforçar o chamado espiritual na linha branca. A continuidade do ritual fortalece a presença da luz, da serenidade e da condução dos guias da Umbanda.",
    passos: [
      "Prepare novamente a maçã partida ao meio.",
      "Posicione a vela branca entre as duas partes.",
      "Direcione seu pedido aos guias da Umbanda com clareza e paz.",
      "Permaneça por 2 minutos em oração serena."
    ],
    intencao: "Peço aos guias da Umbanda que ouçam meu chamado e sustentem este trabalho com paz, verdade e presença espiritual. Que minha intenção seja conduzida com luz e amparo.",
    orientacao: "Depois do ritual, preserve seu silêncio interior e evite agitação emocional.",
    checklist: [
      "Preparei novamente a maçã partida ao meio",
      "Posicionei a vela branca entre as partes",
      "Direcionei meu pedido aos guias com clareza e paz",
      "Mantive os 2 minutos de oração com serenidade"
    ]
  },

  {
    dia: 3,
    titulo: "Fortalecimento da Intenção",
    mensagem: "Hoje o ritual fortalece a intenção oferecida. A repetição com constância sustenta a luz do pedido e a firmeza espiritual da jornada.",
    passos: [
      "Parta a maçã ao meio com presença e respeito.",
      "Posicione a vela branca entre as duas partes da maçã.",
      "Mentalize a intenção principal com clareza e suavidade.",
      "Ore por 2 minutos pedindo fortalecimento espiritual."
    ],
    intencao: "Peço aos guias da Umbanda que fortaleçam minha intenção com paz, verdade e luz. Que este trabalho siga sustentado com amparo espiritual e direção serena.",
    orientacao: "Conclua o dia com calma e evite agir por impulso ou ansiedade.",
    checklist: [
      "Parti a maçã ao meio com presença",
      "Posicionei a vela branca entre as partes",
      "Mentalizei a intenção principal com clareza",
      "Ore por 2 minutos pedindo fortalecimento espiritual"
    ]
  },

  {
    dia: 4,
    titulo: "Ativação da Luz",
    mensagem: "Hoje o foco é ativar com mais firmeza a luz do ritual. A maçã aberta sustenta a intenção, e a vela branca entre as duas partes simboliza a iluminação do pedido.",
    passos: [
      "Prepare a maçã ao meio com atenção e intenção.",
      "Coloque a vela branca entre as duas partes.",
      "Direcione sua fé aos guias da Umbanda com serenidade.",
      "Faça a oração do dia por 2 minutos com paz interior."
    ],
    intencao: "Peço aos guias da Umbanda que ativem a luz deste trabalho e conduzam minha intenção com paz, firmeza e verdade espiritual. Que este pedido siga iluminado e amparado.",
    orientacao: "Após o ritual, mantenha uma postura interna de confiança e equilíbrio.",
    checklist: [
      "Preparei a maçã ao meio com atenção",
      "Coloquei a vela branca entre as partes",
      "Direcionei minha fé aos guias com serenidade",
      "Fiz os 2 minutos de oração com paz interior"
    ]
  },

  {
    dia: 5,
    titulo: "Sustentação do Pedido",
    mensagem: "Hoje você sustenta o pedido com continuidade e paz. Este é o momento de manter firme aquilo que já foi aberto e fortalecido nos dias anteriores.",
    passos: [
      "Parta a maçã ao meio com intenção renovada.",
      "Posicione a vela branca entre as duas partes.",
      "Reforce mentalmente o pedido aos guias da Umbanda.",
      "Permaneça 2 minutos em oração com constância e foco."
    ],
    intencao: "Peço aos guias da Umbanda que sustentem este pedido com paz, luz e continuidade espiritual. Que minha intenção permaneça firme, protegida e conduzida com serenidade.",
    orientacao: "Conclua o ritual sem pressa e mantenha sua energia leve e recolhida.",
    checklist: [
      "Parti a maçã ao meio com intenção renovada",
      "Posicionei a vela branca entre as partes",
      "Reforcei mentalmente meu pedido aos guias",
      "Permanecei 2 minutos em oração com constância"
    ]
  },

  {
    dia: 6,
    titulo: "Conexão com a Luz",
    mensagem: "Hoje o ritual trabalha conexão, amparo e continuidade espiritual. A intenção é manter a força da luz sobre o caminho que está sendo trabalhado.",
    passos: [
      "Prepare a maçã ao meio com cuidado.",
      "Posicione a vela branca entre as duas partes da maçã.",
      "Direcione o pedido aos guias da Umbanda buscando luz e conexão.",
      "Ore por 2 minutos com foco no amparo espiritual da intenção."
    ],
    intencao: "Peço aos guias da Umbanda que tragam luz, conexão e amparo a este trabalho espiritual. Que minha intenção siga com paz, direção e firmeza no caminho certo.",
    orientacao: "Ao concluir, preserve sua serenidade e evite atitudes que desorganizem sua paz interior.",
    checklist: [
      "Preparei a maçã ao meio com cuidado",
      "Posicionei a vela branca entre as partes da maçã",
      "Direcionei meu pedido buscando luz e conexão",
      "Ore por 2 minutos com foco no amparo espiritual"
    ]
  },

  {
    dia: 7,
    titulo: "Consagração da Paz",
    mensagem: "Hoje você conclui a jornada de 7 dias, consagrando este trabalho aos guias da Umbanda com respeito, serenidade e firmeza espiritual.",
    passos: [
      "Parta a maçã ao meio pela última vez nesta jornada.",
      "Posicione a vela branca entre as duas partes como fechamento do ritual.",
      "Entregue sua intenção final aos guias da Umbanda com gratidão.",
      "Permaneça 2 minutos na oração final de consagração."
    ],
    intencao: "Consagro este trabalho aos guias da Umbanda e peço que sustentem minha intenção com paz, proteção e direção espiritual. Que esta jornada de 7 dias seja recebida com luz, serenidade e verdade.",
    orientacao: "Finalize este ciclo com paz, gratidão e consciência do processo realizado.",
    checklist: [
      "Parti a maçã ao meio para o fechamento da jornada",
      "Posicionei a vela branca entre as partes como encerramento",
      "Entreguei minha intenção final aos guias da Umbanda",
      "Fiz os 2 minutos da oração final com paz e gratidão"
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
  "Este ritual é oferecido aos guias da Umbanda. A maçã partida ao meio representa a abertura da intenção, e a vela branca posicionada entre as duas partes sustenta a luz, a paz e a condução espiritual do trabalho.";


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


