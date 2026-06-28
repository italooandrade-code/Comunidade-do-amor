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

  iniciarTela();

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});


//=========================
// 2️⃣ DADOS DAS CARTAS
//=========================

const cartasTarot = [
  {
    id: 1,
    nome: "O Mago",
    subtitulo: "A carta da iniciativa, ação e poder pessoal.",
   imagem: "assets/cartas/o-mago.png",

    video: "assets/videos/o-mago.mp4",
    texto: `
      O Mago representa o início de uma jornada, a capacidade de agir e o uso consciente dos recursos que já existem ao seu redor.

      Em uma leitura, essa carta pode indicar que a pessoa possui mais força, habilidade e possibilidade do que imagina.

      Quando aparece em uma situação amorosa, O Mago pode falar sobre atitude, comunicação, intenção clara e movimento.

      Ele ensina que não basta desejar algo. É preciso alinhar vontade, presença e ação.
    `,
    quiz: [
      {
        pergunta: "O que O Mago representa principalmente?",
        opcoes: ["Iniciativa e ação", "Espera e silêncio", "Confusão emocional"],
        resposta: 0
      },
      {
        pergunta: "Em uma leitura amorosa, O Mago pode indicar:",
        opcoes: ["Comunicação e movimento", "Bloqueio definitivo", "Falta total de energia"],
        resposta: 0
      },
      {
        pergunta: "Qual é uma lição importante de O Mago?",
        opcoes: ["Agir com consciência", "Desistir rapidamente", "Evitar qualquer decisão"],
        resposta: 0
      }
    ]
  },

  {
    id: 2,
    nome: "A Papisa",
    subtitulo: "A carta da intuição, silêncio e sabedoria interior.",
    imagem: "assets/cartas/a-papisa.png",

    video: "assets/videos/a-papisa.mp4",
    texto: `
      A Papisa representa a escuta interior, a intuição e a sabedoria que nasce do silêncio.

      Em uma leitura, ela pode indicar que nem tudo precisa ser revelado ou decidido imediatamente.

      Em situações amorosas, A Papisa pode mostrar sentimentos guardados, observação, mistério ou a necessidade de ouvir mais a própria intuição.

      Ela ensina que algumas respostas não aparecem pela pressa, mas pela calma e pela percepção profunda.
    `,
    quiz: [
      {
        pergunta: "O que A Papisa representa?",
        opcoes: ["Intuição e silêncio", "Impulsividade", "Pressa"],
        resposta: 0
      },
      {
        pergunta: "Em uma leitura amorosa, A Papisa pode indicar:",
        opcoes: ["Sentimentos guardados", "Ação imediata", "Barulho e exposição"],
        resposta: 0
      },
      {
        pergunta: "Qual é a lição da Papisa?",
        opcoes: ["Ouvir a intuição", "Agir sem pensar", "Ignorar sinais internos"],
        resposta: 0
      }
    ]
  },
  
{
    id: 3,
    nome: "A Imperatriz",
    subtitulo: "A carta da criatividade, abundância e poder feminino.",
    imagem: "assets/cartas/a-imperatriz.png",
    video: "assets/videos/a-imperatriz.mp4",
    texto: `
      A Imperatriz representa a fertilidade, a criatividade e a capacidade de fazer projetos e relacionamentos crescerem.

      Em uma leitura, ela pode indicar prosperidade, desenvolvimento pessoal e equilíbrio entre razão e emoção.

      No amor, essa carta costuma simbolizar carinho, afeto, construção de vínculos saudáveis e crescimento da relação.

      Ela ensina que tudo aquilo que recebe dedicação, cuidado e paciência tende a florescer no momento certo.
    `,
    quiz: [
      {
        pergunta: "O que A Imperatriz representa principalmente?",
        opcoes: [
          "Criatividade e abundância",
          "Destruição e conflitos",
          "Solidão e isolamento"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, A Imperatriz simboliza:",
        opcoes: [
          "Afeto e crescimento da relação",
          "Fim definitivo do relacionamento",
          "Falta de sentimentos"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o principal ensinamento da Imperatriz?",
        opcoes: [
          "Cuidar para que as coisas floresçam",
          "Agir com impulsividade",
          "Desistir diante das dificuldades"
        ],
        resposta: 0
      }
    ]
},

{
    id: 4,
    nome: "O Imperador",
    subtitulo: "A carta da liderança, estrutura e estabilidade.",
    imagem: "assets/cartas/o-imperador.png",
    video: "assets/videos/o-imperador.mp4",
    texto: `
      O Imperador representa disciplina, responsabilidade e capacidade de construir uma base sólida para a vida.

      Em uma leitura, ele indica organização, autoridade e segurança para tomar decisões importantes.

      Nas questões amorosas, pode representar um relacionamento estável, proteção e compromisso quando existe maturidade entre as partes.

      Ele ensina que grandes conquistas são alcançadas através da disciplina, do planejamento e da responsabilidade.
    `,
    quiz: [
      {
        pergunta: "O que O Imperador representa?",
        opcoes: [
          "Liderança e estabilidade",
          "Confusão emocional",
          "Falta de direção"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, O Imperador pode indicar:",
        opcoes: [
          "Compromisso e estabilidade",
          "Desinteresse total",
          "Relacionamento sem responsabilidade"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o ensinamento do Imperador?",
        opcoes: [
          "Planejamento e disciplina",
          "Impulsividade",
          "Evitar responsabilidades"
        ],
        resposta: 0
      }
    ]
}
,
{
    id: 5,
    nome: "Os Enamorados",
    subtitulo: "A carta das escolhas, do amor e da união.",
    imagem: "assets/cartas/os-enamorados.png",
    video: "assets/videos/os-enamorados.mp4",
    texto: `
      Os Enamorados representam escolhas importantes, conexão entre pessoas e decisões que podem mudar o rumo da vida.

      Em uma leitura, essa carta mostra que o coração e a razão precisam caminhar juntos antes de qualquer decisão importante.

      No amor, simboliza união, cumplicidade, parceria e fortalecimento dos sentimentos quando existe sinceridade entre ambas as partes.

      Ela ensina que toda escolha possui consequências e que agir com consciência produz relações mais saudáveis e duradouras.
    `,
    quiz: [
      {
        pergunta: "O que Os Enamorados representam principalmente?",
        opcoes: [
          "Escolhas e união",
          "Solidão e isolamento",
          "Rigidez e autoridade"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, essa carta simboliza:",
        opcoes: [
          "Parceria e cumplicidade",
          "Falta de sentimentos",
          "Desinteresse"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o principal ensinamento da carta?",
        opcoes: [
          "Fazer escolhas conscientes",
          "Agir por impulso",
          "Evitar decisões"
        ],
        resposta: 0
      }
    ]
},

{
    id: 6,
    nome: "A Justiça",
    subtitulo: "A carta do equilíbrio, da verdade e da responsabilidade.",
    imagem: "assets/cartas/a-justica.png",
    video: "assets/videos/a-justica.mp4",
    texto: `
      A Justiça representa equilíbrio, honestidade e responsabilidade pelas próprias atitudes.

      Em uma leitura, indica que toda ação gera consequências e que a verdade tende a prevalecer.

      Nas questões amorosas, pode indicar conversas sinceras, necessidade de equilíbrio na relação e decisões tomadas com maturidade.

      Ela ensina que agir com justiça, ética e consciência é o caminho para construir uma vida mais equilibrada.
    `,
    quiz: [
      {
        pergunta: "O que A Justiça representa?",
        opcoes: [
          "Equilíbrio e verdade",
          "Impulsividade",
          "Confusão"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, A Justiça pode indicar:",
        opcoes: [
          "Diálogo e equilíbrio",
          "Mentiras constantes",
          "Falta de responsabilidade"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o ensinamento da Justiça?",
        opcoes: [
          "Assumir responsabilidade pelos próprios atos",
          "Culpar sempre os outros",
          "Evitar decisões"
        ],
        resposta: 0
      }
    ]
} 

,
{
    id: 7,
    nome: "A Estrela",
    subtitulo: "A carta da esperança, inspiração e renovação.",
    imagem: "assets/cartas/a-estrela.png",
    video: "assets/videos/a-estrela.mp4",
    texto: `
      A Estrela representa esperança, renovação e confiança no futuro. Ela surge como um sinal de que, mesmo após momentos difíceis, existe a possibilidade de recomeçar.

      Em uma leitura, essa carta indica paz interior, proteção espiritual e abertura para novas oportunidades.

      No amor, pode representar reconciliação, fortalecimento da relação ou a chegada de uma fase mais harmoniosa entre o casal.

      Ela ensina que manter a fé e acreditar no próprio caminho permite enxergar novas possibilidades e seguir em frente com mais confiança.
    `,
    quiz: [
      {
        pergunta: "O que A Estrela representa principalmente?",
        opcoes: [
          "Esperança e renovação",
          "Medo e insegurança",
          "Conflitos constantes"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, A Estrela pode indicar:",
        opcoes: [
          "Harmonia e reconciliação",
          "Separação definitiva",
          "Indiferença"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o ensinamento da Estrela?",
        opcoes: [
          "Manter a esperança e seguir em frente",
          "Desistir diante das dificuldades",
          "Ignorar novas oportunidades"
        ],
        resposta: 0
      }
    ]
},

{
    id: 8,
    nome: "A Lua",
    subtitulo: "A carta da intuição, dos mistérios e das emoções.",
    imagem: "assets/cartas/a-lua.png",
    video: "assets/videos/a-lua.mp4",
    texto: `
      A Lua representa o mundo das emoções, da intuição e das situações que ainda não estão totalmente claras.

      Em uma leitura, pode indicar dúvidas, inseguranças ou a necessidade de observar melhor antes de tomar decisões importantes.

      No amor, pode representar sentimentos profundos, medos, inseguranças ou questões que ainda precisam ser esclarecidas.

      Ela ensina que ouvir a própria intuição e agir com calma ajuda a encontrar respostas que nem sempre são visíveis à primeira vista.
    `,
    quiz: [
      {
        pergunta: "O que A Lua representa?",
        opcoes: [
          "Intuição e emoções",
          "Autoridade e disciplina",
          "Vitória e conquista"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, A Lua pode indicar:",
        opcoes: [
          "Sentimentos profundos e inseguranças",
          "Falta total de emoções",
          "Sucesso financeiro"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o ensinamento da Lua?",
        opcoes: [
          "Ouvir a intuição antes de agir",
          "Agir sempre por impulso",
          "Ignorar os próprios sentimentos"
        ],
        resposta: 0
      }
    ]
}
 ,
{
    id: 9,
    nome: "A Roda da Fortuna",
    subtitulo: "A carta dos ciclos, mudanças e novas oportunidades.",
    imagem: "assets/cartas/a-roda-da-fortuna.png",
    video: "assets/videos/a-roda-da-fortuna.mp4",
    texto: `
      A Roda da Fortuna representa os ciclos naturais da vida, mostrando que tudo está em constante transformação.

      Em uma leitura, indica mudanças importantes, oportunidades inesperadas e momentos em que o destino pode abrir novos caminhos.

      No amor, pode simbolizar uma nova fase no relacionamento, reencontros ou mudanças capazes de fortalecer a união.

      Ela ensina que aceitar as mudanças e adaptar-se aos novos momentos permite crescer e aproveitar as oportunidades que surgem.
    `,
    quiz: [
      {
        pergunta: "O que A Roda da Fortuna representa principalmente?",
        opcoes: [
          "Mudanças e novos ciclos",
          "Estagnação permanente",
          "Falta de oportunidades"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, essa carta pode indicar:",
        opcoes: [
          "Uma nova fase na relação",
          "Fim inevitável",
          "Ausência de sentimentos"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o principal ensinamento da Roda da Fortuna?",
        opcoes: [
          "Aceitar as mudanças da vida",
          "Resistir a toda mudança",
          "Ignorar novas oportunidades"
        ],
        resposta: 0
      }
    ]
},

{
    id: 10,
    nome: "O Julgamento",
    subtitulo: "A carta do despertar, da reflexão e da renovação.",
    imagem: "assets/cartas/o-julgamento.png",
    video: "assets/videos/o-julgamento.mp4",
    texto: `
      O Julgamento representa um momento de despertar, reflexão e transformação pessoal.

      Em uma leitura, indica que chegou a hora de avaliar o passado, aprender com as experiências e seguir um novo caminho.

      No amor, pode simbolizar reconciliações, conversas importantes ou decisões que trazem uma nova oportunidade para o relacionamento.

      Ele ensina que reconhecer os próprios erros e aprender com eles é essencial para evoluir e construir um futuro melhor.
    `,
    quiz: [
      {
        pergunta: "O que O Julgamento representa?",
        opcoes: [
          "Despertar e renovação",
          "Confusão e medo",
          "Rigidez e isolamento"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, O Julgamento pode indicar:",
        opcoes: [
          "Reconciliação e novas oportunidades",
          "Falta de diálogo",
          "Distanciamento definitivo"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o ensinamento do Julgamento?",
        opcoes: [
          "Aprender com o passado para evoluir",
          "Ignorar os próprios erros",
          "Evitar mudanças"
        ],
        resposta: 0
      }
    ]
}
,
{
    id: 11,
    nome: "O Sol",
    subtitulo: "A carta da felicidade, sucesso e realização.",
    imagem: "assets/cartas/o-sol.png",
    video: "assets/videos/o-sol.mp4",
    texto: `
      O Sol representa alegria, clareza, vitalidade e sucesso. É uma das cartas mais positivas do Tarot, indicando momentos de felicidade e conquistas.

      Em uma leitura, essa carta mostra que os obstáculos começam a desaparecer, trazendo mais confiança e segurança para seguir em frente.

      No amor, simboliza relacionamentos saudáveis, sinceridade, harmonia e fortalecimento dos sentimentos entre o casal.

      O Sol ensina que agir com transparência, entusiasmo e confiança permite aproveitar plenamente as oportunidades que a vida oferece.
    `,
    quiz: [
      {
        pergunta: "O que O Sol representa principalmente?",
        opcoes: [
          "Felicidade e sucesso",
          "Solidão e tristeza",
          "Incerteza e medo"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, O Sol simboliza:",
        opcoes: [
          "Harmonia e sinceridade",
          "Falta de sentimentos",
          "Conflitos constantes"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o ensinamento do Sol?",
        opcoes: [
          "Viver com confiança e transparência",
          "Esconder os sentimentos",
          "Evitar novos desafios"
        ],
        resposta: 0
      }
    ]
},

{
    id: 12,
    nome: "O Mundo",
    subtitulo: "A carta da realização, conclusão e plenitude.",
    imagem: "assets/cartas/o-mundo.png",
    video: "assets/videos/o-mundo.mp4",
    texto: `
      O Mundo representa a conclusão de um ciclo, a realização de objetivos e a sensação de plenitude após uma jornada de aprendizado.

      Em uma leitura, essa carta indica sucesso, reconhecimento e a conquista de metas importantes.

      No amor, pode simbolizar relacionamentos completos, união estável e um momento de grande felicidade compartilhada.

      O Mundo ensina que cada etapa vivida contribui para o crescimento pessoal e que concluir um ciclo é também o início de uma nova jornada.
    `,
    quiz: [
      {
        pergunta: "O que O Mundo representa principalmente?",
        opcoes: [
          "Realização e conclusão",
          "Medo e insegurança",
          "Falta de direção"
        ],
        resposta: 0
      },
      {
        pergunta: "No amor, O Mundo simboliza:",
        opcoes: [
          "União e felicidade",
          "Separação inevitável",
          "Desinteresse"
        ],
        resposta: 0
      },
      {
        pergunta: "Qual é o ensinamento do Mundo?",
        opcoes: [
          "Valorizar o aprendizado de cada ciclo",
          "Evitar mudanças",
          "Ignorar as conquistas"
        ],
        resposta: 0
      }
    ]
}

];


//=========================
// 3️⃣ ELEMENTOS DA TELA
//=========================

const cardStepBadge = document.getElementById("cardStepBadge");
const cardTitle = document.getElementById("cardTitle");
const cardSubtitle = document.getElementById("cardSubtitle");
const cardText = document.getElementById("cardText");
const quizContainer = document.getElementById("quizContainer");
const cardImage = document.getElementById("cardImage");
const cardVideo = document.getElementById("cardVideo");
const videoSource = document.getElementById("videoSource");
const videoPlaceholder = document.getElementById("videoPlaceholder");

const tabVideo = document.getElementById("tabVideo");
const tabText = document.getElementById("tabText");
const tabQuiz = document.getElementById("tabQuiz");

const sectionVideo = document.getElementById("sectionVideo");
const sectionText = document.getElementById("sectionText");
const sectionQuiz = document.getElementById("sectionQuiz");

const btnGoText = document.getElementById("btnGoText");
const btnGoQuiz = document.getElementById("btnGoQuiz");
const btnFinishCard = document.getElementById("btnFinishCard");

const btnOuvirCarta = document.getElementById("btnOuvirCarta");
const btnPararCarta = document.getElementById("btnPararCarta");

let cartaAtual = null;
let respostasUsuario = [];


//=========================
// 4️⃣ INICIAR TELA
//=========================

function iniciarTela(){

  const params = new URLSearchParams(window.location.search);
  const cartaId = Number(params.get("carta")) || 1;

  fetch(`${API_URL}/progresso-tarot`, {

    method: "GET",
    credentials: "include"

})
.then(response => response.json())
.then(data => {

    if(!data.success){

        alert(data.message);
        return;

    }

    const progresso = data.progresso;

    if(cartaId > progresso.cartasLiberadas){

    window.location.href = "jornada-tarot.html";

    return;

}

    carregarCarta(cartaId);

});

  

}

function carregarCarta(cartaId){

    cartaAtual = cartasTarot.find(item => item.id === cartaId);

    if(!cartaAtual){

        cardTitle.textContent = "Carta não encontrada";
        return;

    }
renderCarta();



showStep("video");
}


//=========================
// 5️⃣ RENDERIZAR CARTA
//=========================

function renderCarta(){

  cardStepBadge.textContent = `Carta ${cartaAtual.id} de ${cartasTarot.length}`;
  cardTitle.textContent = cartaAtual.nome;
  cardSubtitle.textContent = cartaAtual.subtitulo;
  cardText.innerText = cartaAtual.texto.trim();
cardImage.src = cartaAtual.imagem;

videoSource.src = cartaAtual.video;

cardVideo.load();

cardVideo.style.display = "none";
videoPlaceholder.style.display = "flex";

cardVideo.addEventListener("loadeddata", () => {

    cardVideo.style.display = "block";
    videoPlaceholder.style.display = "none";

});
  renderQuiz();

}


//=========================
// 6️⃣ RENDERIZAR QUIZ
//=========================

function renderQuiz(){

  quizContainer.innerHTML = "";
  respostasUsuario = [];

  cartaAtual.quiz.forEach((questao, index) => {

    const questionBox = document.createElement("div");
    questionBox.className = "quiz-question";

    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${questao.pergunta}`;

    questionBox.appendChild(title);

    questao.opcoes.forEach((opcao, opcaoIndex) => {

      const button = document.createElement("button");
      button.className = "quiz-option";
      button.textContent = opcao;

      button.addEventListener("click", () => {

        respostasUsuario[index] = opcaoIndex;

        const allOptions = questionBox.querySelectorAll(".quiz-option");
        allOptions.forEach(item => item.classList.remove("selected"));

        button.classList.add("selected");

      });

      questionBox.appendChild(button);

    });

    quizContainer.appendChild(questionBox);

  });

}


//=========================
// 7️⃣ TROCAR ETAPA
//=========================

function showStep(step){

  sectionVideo.classList.remove("active");
  sectionText.classList.remove("active");
  sectionQuiz.classList.remove("active");

  tabVideo.classList.remove("active");
  tabText.classList.remove("active");
  tabQuiz.classList.remove("active");

  if(step === "video"){
    sectionVideo.classList.add("active");
    tabVideo.classList.add("active");
  }

  if(step === "text"){
    sectionText.classList.add("active");
    tabText.classList.add("active");
  }

  if(step === "quiz"){
    sectionQuiz.classList.add("active");
    tabQuiz.classList.add("active");
  }

}


//=========================
// 8️⃣ BOTÕES DAS ETAPAS
//=========================

btnGoText.addEventListener("click", () => {
  showStep("text");
});

btnGoQuiz.addEventListener("click", () => {
  showStep("quiz");
});


//=========================
// 9️⃣ ÁUDIO DO TEXTO
//=========================

btnOuvirCarta.addEventListener("click", () => {

  speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(cardText.innerText);

  fala.lang = "pt-BR";
  fala.rate = 1.1;
  fala.pitch = 1;

  speechSynthesis.speak(fala);

});

btnPararCarta.addEventListener("click", () => {
  speechSynthesis.cancel();
});


//=========================
// 🔟 CONCLUIR CARTA
//=========================

btnFinishCard.addEventListener("click", () => {

  if(respostasUsuario.length < cartaAtual.quiz.length){
    alert("Responda todas as perguntas antes de concluir.");
    return;
  }

  const acertouTudo = cartaAtual.quiz.every((questao, index) => {
    return respostasUsuario[index] === questao.resposta;
  });

  if(!acertouTudo){
    alert("Você errou alguma resposta. Revise a carta e tente novamente.");
    return;
  }

fetch(`${API_URL}/concluir-carta-tarot`, {

  method: "POST",

  credentials: "include",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    cartaId: cartaAtual.id
  })

})
.then(response => response.json())
.then(data => {

    if(!data.success){

        alert(data.message);
        return;

    }

    alert("Parabéns! Você concluiu esta carta.");

    const progresso = data.progresso;

    // Ainda existe outra carta liberada?
    if(progresso.ultimaCarta < progresso.cartasLiberadas){

        window.location.href =
        `carta-tarot.html?carta=${progresso.ultimaCarta + 1}`;

        return;

    }

    // Terminou todas as cartas liberadas
    window.location.href = "jornada-tarot.html";

})
.catch(error => {

  console.log("Erro:", error);

  alert("Erro ao concluir carta.");

});

});

