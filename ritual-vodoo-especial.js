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
const RITUAL_PROGRESS_KEY = `ritual_vodoo_especial_progress_${email}`;

// checklist do dia atual do usuário neste ritual
const RITUAL_CHECKLIST_KEY = `ritual_vodoo_especial_checklist_${email}`;

// horário da última conclusão do dia neste ritual
const RITUAL_LAST_COMPLETED_KEY = `ritual_vodoo_especial_last_completed_${email}`;


//=========================
// 6️⃣ ARRAY DOS 7 DIAS
//=========================

const ritualDays = [
  {
    dia: 1,
    titulo: "Abertura da Intensidade",
    mensagem: "Hoje você inicia este trabalho especial com intenção forte e presença espiritual. Os 2 bonecos representam os dois caminhos, o laço do amor une essa ligação, e as 4 velas vermelhas ao redor sustentam a intensidade deste ritual na linha branca.",
    passos: [
      "Posicione os 2 bonecos representando você e seu amor.",
      "Una os 2 bonecos com o laço do amor, simbolizando a ligação entre os caminhos.",
      "Coloque as 4 velas vermelhas ao redor da representação.",
      "Permaneça por 3 minutos em oração com firmeza e intenção."
    ],
    intencao: "Peço aos guias da linha branca que recebam este trabalho e fortaleçam a união entre (nome da pessoa) e (nome do ser amado) com presença, intensidade e verdade. Que este laço do amor una seus caminhos com força e direção espiritual.",
    orientacao: "Ao concluir, mantenha sua energia firme e evite pensamentos contrários ao propósito do ritual.",
    checklist: [
      "Posicionei os 2 bonecos corretamente",
      "Uni os bonecos com o laço do amor",
      "Coloquei as 4 velas vermelhas ao redor",
      "Mantive os 3 minutos de oração com presença"
    ]
  },

  {
    dia: 2,
    titulo: "Aproximação Intensa",
    mensagem: "Hoje a força do ritual trabalha a aproximação entre os dois caminhos com mais intensidade. O laço do amor mantém a união simbólica, e as velas vermelhas reforçam a firmeza espiritual do pedido.",
    passos: [
      "Monte novamente os 2 bonecos representando os dois caminhos.",
      "Refaça o laço do amor unindo os bonecos com intenção forte de aproximação.",
      "Mantenha as 4 velas vermelhas ao redor da representação.",
      "Realize a oração do dia por 3 minutos com firmeza interior."
    ],
    intencao: "Peço aos guias da linha branca que aproximem com força e verdade os caminhos de (nome da pessoa) e (nome do ser amado). Que este laço do amor fortaleça a presença, a lembrança e a aproximação entre os dois.",
    orientacao: "Depois do ritual, evite alimentar dúvidas e preserve a intensidade do seu pedido com silêncio.",
    checklist: [
      "Montei novamente os 2 bonecos",
      "Refiz o laço do amor com intenção de aproximação",
      "Mantive as 4 velas vermelhas ao redor",
      "Fiz os 3 minutos de oração com firmeza"
    ]
  },

  {
    dia: 3,
    titulo: "Fortalecimento da Conexão",
    mensagem: "Hoje o ritual fortalece a conexão entre presença, desejo e lembrança. A intensidade da jornada é sustentada pela repetição e pela firmeza da intenção.",
    passos: [
      "Posicione os 2 bonecos com atenção e constância.",
      "Una novamente os bonecos com o laço do amor.",
      "Deixe as 4 velas vermelhas ao redor da representação.",
      "Ore por 3 minutos direcionando a força da conexão entre os dois."
    ],
    intencao: "Peço aos guias da linha branca que fortaleçam a conexão amorosa entre (nome da pessoa) e (nome do ser amado). Que este laço do amor una seus sentimentos, seus caminhos e sua lembrança com intensidade e verdade.",
    orientacao: "Mantenha sua postura interior estável e não enfraqueça o processo com ansiedade.",
    checklist: [
      "Posicionei os bonecos com atenção",
      "Uni novamente os bonecos com o laço do amor",
      "Mantive as 4 velas vermelhas no ritual",
      "Ore por 3 minutos com foco na conexão"
    ]
  },

  {
    dia: 4,
    titulo: "Movimento do Vínculo",
    mensagem: "Hoje a intenção é movimentar o vínculo trabalhado com mais força espiritual. O ritual continua na linha branca, sem agulhas e sem maldade, apenas com intenção de união e aproximação.",
    passos: [
      "Organize os 2 bonecos com calma e presença.",
      "Una os bonecos com o laço do amor reforçando o vínculo.",
      "Deixe as 4 velas vermelhas ao redor da representação.",
      "Faça a oração por 3 minutos buscando intensidade e movimento."
    ],
    intencao: "Peço aos guias da linha branca que movimentem com força e verdade o vínculo entre (nome da pessoa) e (nome do ser amado). Que este laço do amor fortaleça o reencontro, a presença e a ligação entre os dois.",
    orientacao: "Após o ritual, mantenha pensamentos de firmeza e não permita que dúvidas enfraqueçam sua intenção.",
    checklist: [
      "Organizei os 2 bonecos com calma",
      "Usei o laço do amor reforçando o vínculo",
      "Mantive as 4 velas vermelhas ao redor",
      "Fiz a oração de 3 minutos com intensidade"
    ]
  },

  {
    dia: 5,
    titulo: "Firmeza da União",
    mensagem: "Hoje o ritual reforça a firmeza da união amorosa. O foco está em sustentar a intensidade do vínculo com presença espiritual e constância emocional.",
    passos: [
      "Posicione os 2 bonecos como representação do casal.",
      "Una os bonecos com o laço do amor reforçando a ligação entre eles.",
      "Deixe as 4 velas vermelhas ao redor da representação.",
      "Permaneça 3 minutos na oração do dia fortalecendo essa união."
    ],
    intencao: "Peço aos guias da linha branca que fortaleçam com intensidade a união entre (nome da pessoa) e (nome do ser amado). Que este laço do amor sustente o vínculo, a ligação e a força desta aproximação.",
    orientacao: "Conclua o ritual sem pressa e mantenha sua mente firme na direção amorosa da jornada.",
    checklist: [
      "Representei o casal com os 2 bonecos",
      "Reforcei o laço do amor entre os dois",
      "Mantive as 4 velas vermelhas no ritual",
      "Fiz os 3 minutos de oração pelo fortalecimento da união"
    ]
  },

  {
    dia: 6,
    titulo: "Reconexão e Presença",
    mensagem: "Hoje a intenção é favorecer a reconexão emocional e fortalecer a presença do vínculo amoroso. A intensidade do ritual segue sendo sustentada pela constância dos dias anteriores.",
    passos: [
      "Monte os 2 bonecos representando você e seu amor.",
      "Una os dois com o laço do amor reforçando a reconexão.",
      "Deixe as 4 velas vermelhas ao redor da representação.",
      "Ore por 3 minutos pedindo presença, reencontro e aproximação."
    ],
    intencao: "Peço aos guias da linha branca que tragam presença, reencontro e reconexão entre (nome da pessoa) e (nome do ser amado). Que este laço do amor una com intensidade aquilo que deve caminhar junto no amor.",
    orientacao: "Após concluir, preserve seu silêncio interior e evite enfraquecer a intenção com medo ou desânimo.",
    checklist: [
      "Montei os 2 bonecos com intenção de reconexão",
      "Uni os dois com o laço do amor",
      "Mantive as 4 velas vermelhas ao redor",
      "Ore por 3 minutos pedindo presença e aproximação"
    ]
  },

  {
    dia: 7,
    titulo: "Consagração da Intensidade",
    mensagem: "Hoje você encerra a jornada de 7 dias consagrando este trabalho especial na força da linha branca. O ritual é concluído na intenção de união, presença e intensidade amorosa.",
    passos: [
      "Posicione os 2 bonecos pela última vez nesta jornada.",
      "Una os bonecos com o laço do amor consagrando a união.",
      "Deixe as 4 velas vermelhas ao redor como fechamento do ritual.",
      "Permaneça por 3 minutos na oração final de consagração."
    ],
    intencao: "Consagro este trabalho de amor entre (nome da pessoa) e (nome do ser amado) na força da linha branca. Peço aos guias que mantenham unidos seus caminhos, sua aproximação e sua presença amorosa com intensidade, verdade e direção espiritual.",
    orientacao: "Ao finalizar, reconheça o encerramento desta etapa com respeito, firmeza e gratidão pela jornada realizada.",
    checklist: [
      "Posicionei os 2 bonecos para o fechamento da jornada",
      "Consagrei a união com o laço do amor",
      "Mantive as 4 velas vermelhas no fechamento do ritual",
      "Fiz os 3 minutos da oração final com gratidão e firmeza"
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
  "Este ritual é realizado na linha branca, com intenção de união e aproximação amorosa. Os 2 bonecos representam os dois caminhos, o laço do amor simboliza a união entre eles, e as 4 velas vermelhas ao redor fortalecem a intensidade espiritual do trabalho.";


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