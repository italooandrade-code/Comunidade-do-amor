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

  INIT_PROGRESS_KEY = `init_progress_${email}`;
  INIT_CHECKLIST_KEY = `init_checklist_${email}`;
  INIT_LAST_COMPLETED_KEY = `init_last_completed_${email}`;

  currentDay = Number(localStorage.getItem(INIT_PROGRESS_KEY)) || 1;

  currentChecklist = JSON.parse(localStorage.getItem(INIT_CHECKLIST_KEY)) || {
    yoga: false,
    ritual: false,
    acao: false
  };

  lastCompletedAt = localStorage.getItem(INIT_LAST_COMPLETED_KEY) || null;

  console.log("Email logado:", email);
console.log("Dia atual:", currentDay);
console.log("Checklist atual:", currentChecklist);
console.log("Última conclusão:", lastCompletedAt);
console.log("Dia atual no array:", iniciacaoDays.find(item => item.dia === currentDay));

renderCurrentDay();

  

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});


//=========================
// 5️⃣ CHAVES DA INICIAÇÃO
//=========================

let INIT_PROGRESS_KEY = "";
let INIT_CHECKLIST_KEY = "";
let INIT_LAST_COMPLETED_KEY = "";


//
// Essas 3 chaves vão servir assim:
//
// INIT_PROGRESS_KEY
// -> guarda em qual dia a pessoa está
//
// INIT_CHECKLIST_KEY
// -> guarda os checks do dia atual
//
// INIT_LAST_COMPLETED_KEY
// -> guarda a data/hora em que ela concluiu o último dia
//=========================


//=========================
// 6️⃣ ARRAY DOS 30 DIAS
//=========================

// por enquanto vamos começar com poucos dias preenchidos
// depois, na próxima etapa do conteúdo, você completa até o dia 30
const iniciacaoDays = [
  {
    dia: 1,
    titulo: "Despertar",
    mensagem: "Hoje é o início da sua jornada. Permita-se respirar fundo, olhar para dentro e aceitar que recomeçar também é uma forma de amor.",
    yoga: {
      passos: [
        "Sente-se em um local calmo",
        "Mantenha a coluna ereta",
        "Respire profundamente 5 vezes",
        "Alongue pescoço e ombros devagar"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de recomeço",
        "Feche os olhos por alguns instantes",
        "Concentre-se no seu coração",
        "Faça a oração por 1 minuto"
      ],
      oracao: "Eu me permito recomeçar. Eu escolho me cuidar. Eu escolho me amar."
    },
    acao: "Escreva em um papel uma intenção sincera para esta nova fase da sua vida."
  },

  {
    dia: 2,
    titulo: "Reconexão",
    mensagem: "Hoje o convite é voltar para si mesma com mais presença. O amor começa quando você se escuta com verdade.",
    yoga: {
      passos: [
        "Sente-se confortavelmente",
        "Respire fundo por alguns ciclos",
        "Alongue braços e ombros com calma",
        "Permaneça presente no corpo"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de paz",
        "Coloque a mão sobre o peito",
        "Respire com calma",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu me reconecto com minha energia. Eu me abro para sentir paz, presença e clareza."
    },
    acao: "Separe alguns minutos para ficar em silêncio interior e perceber como você está se sentindo hoje."
  },

  {
    dia: 3,
    titulo: "Presença",
    mensagem: "A energia se fortalece quando você está inteira no agora. Hoje, sua prática é estar presente no corpo, na mente e no coração.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Respire lentamente",
        "Alongue o pescoço para os dois lados",
        "Relaxe os ombros conscientemente"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com tranquilidade",
        "Olhe para a chama por alguns instantes",
        "Traga sua atenção para o momento presente",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu escolho estar presente. Eu escolho sentir o agora. Eu escolho me fortalecer por dentro."
    },
    acao: "Durante o dia, faça uma pausa de 1 minuto e observe sua respiração com atenção."
  }

  ,
  {
    dia: 4,
    titulo: "Acolhimento",
    mensagem: "Hoje o convite é acolher tudo o que existe dentro de você sem julgamento. O amor começa quando você para de lutar contra si mesma.",
    yoga: {
      passos: [
        "Sente-se com conforto e estabilidade",
        "Respire profundamente por 1 minuto",
        "Leve as mãos ao peito",
        "Relaxe ombros e maxilar devagar"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de acolhimento",
        "Feche os olhos por alguns instantes",
        "Respire sentindo o peito expandir",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu me acolho por inteiro. Eu aceito minhas emoções. Eu escolho me tratar com amor e compaixão."
    },
    acao: "Escreva em um papel algo em você que precisa ser acolhido hoje, sem culpa e sem cobrança."
  },

  {
    dia: 5,
    titulo: "Entrega",
    mensagem: "Nem tudo precisa ser controlado. Hoje sua prática é soltar o excesso de tensão e confiar mais no fluxo da vida.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Inspire profundamente pelo nariz",
        "Expire lentamente pela boca",
        "Relaxe os ombros a cada expiração"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de entrega",
        "Olhe para a chama por alguns segundos",
        "Respire fundo e solte devagar",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu libero o peso do controle. Eu entrego minhas angústias. Eu permito que a vida me conduza com sabedoria."
    },
    acao: "Escolha algo pequeno que você vem tentando controlar demais e, hoje, permita-se soltar."
  },

  {
    dia: 6,
    titulo: "Silêncio Interior",
    mensagem: "Quando o barulho diminui, a alma consegue falar. Hoje você vai se aproximar mais da sua voz interior.",
    yoga: {
      passos: [
        "Sente-se com a coluna ereta",
        "Feche os olhos suavemente",
        "Respire de forma calma e profunda",
        "Permaneça em observação por alguns instantes"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de paz interior",
        "Leve a atenção para sua respiração",
        "Afaste-se do excesso de pensamentos",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu silenciou o que me confunde. Eu escuto minha verdade interior. Eu confio na sabedoria que vive em mim."
    },
    acao: "Fique alguns minutos sem distrações e observe o que seu coração tenta te mostrar."
  },

  {
    dia: 7,
    titulo: "Fortalecimento",
    mensagem: "Hoje você fortalece sua energia. Quanto mais firme estiver por dentro, menos será abalada pelo que vem de fora.",
    yoga: {
      passos: [
        "Sente-se de forma estável",
        "Respire profundamente por alguns ciclos",
        "Alongue pescoço e costas com calma",
        "Mantenha a postura firme e consciente"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de força",
        "Coloque a mão sobre o peito",
        "Respire imaginando luz ao seu redor",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu fortaleço minha mente, meu coração e minha energia. Eu me torno firme, presente e protegida."
    },
    acao: "Escreva três qualidades suas que mostram a força que já existe dentro de você."
  },

  {
    dia: 8,
    titulo: "Clareza",
    mensagem: "Hoje sua energia pede clareza. Ver com nitidez é um ato de amor, porque evita ilusões e aproxima você da verdade.",
    yoga: {
      passos: [
        "Sente-se confortavelmente",
        "Respire de forma lenta e profunda",
        "Relaxe a testa e os olhos",
        "Mantenha a atenção no momento presente"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de clareza",
        "Observe a chama com serenidade",
        "Respire sentindo a mente acalmar",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu escolho ver com clareza. Eu me afasto da confusão. Eu permito que a verdade se revele com paz."
    },
    acao: "Anote uma situação da sua vida que precisa ser vista com mais sinceridade e clareza."
  },

  {
    dia: 9,
    titulo: "Autovalor",
    mensagem: "Você não precisa provar seu valor. Hoje a prática é lembrar que sua existência já carrega dignidade, beleza e merecimento.",
    yoga: {
      passos: [
        "Sente-se com postura ereta",
        "Respire profundamente algumas vezes",
        "Leve as mãos ao coração",
        "Mantenha-se presente no corpo"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de reconhecimento",
        "Olhe para a chama com presença",
        "Sinta sua respiração se aprofundar",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu reconheço meu valor. Eu honro minha existência. Eu aceito que sou digna de amor, respeito e cuidado."
    },
    acao: "Escreva uma frase que lembre seu valor e leia em voz alta para si mesma."
  },

  {
    dia: 10,
    titulo: "Confiança",
    mensagem: "Hoje você fortalece a confiança no processo. Nem tudo acontece no seu tempo, mas tudo se organiza quando sua energia permanece firme.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Respire com profundidade e calma",
        "Alongue ombros e pescoço devagar",
        "Mantenha a coluna firme e relaxada"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de confiança",
        "Feche os olhos por alguns instantes",
        "Respire sentindo segurança no peito",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu confio no tempo da vida. Eu confio no que está sendo preparado. Eu permaneço firme, serena e confiante."
    },
    acao: "Pense em algo que está demorando a acontecer e escolha, hoje, confiar mais e controlar menos."
  } 

,
  {
    dia: 11,
    titulo: "Paciência",
    mensagem: "Nem toda transformação é visível de imediato. Hoje sua prática é cultivar paciência e continuar firme no processo.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Respire profundamente por alguns ciclos",
        "Relaxe ombros e mandíbula",
        "Permaneça presente sem pressa"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de paciência",
        "Observe a chama com serenidade",
        "Respire fundo e desacelere",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu respeito o tempo do processo. Eu aceito que tudo amadurece no momento certo. Eu escolho a paciência com paz."
    },
    acao: "Escolha algo que vem te gerando ansiedade e, hoje, responda a isso com mais calma e paciência."
  },

  {
    dia: 12,
    titulo: "Verdade Interior",
    mensagem: "Hoje o convite é olhar para dentro com sinceridade. A verdade interior fortalece sua energia e impede que você se perca de si mesma.",
    yoga: {
      passos: [
        "Sente-se de forma estável",
        "Respire lentamente pelo nariz",
        "Leve a atenção ao peito",
        "Permaneça por alguns instantes em silêncio"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de verdade",
        "Feche os olhos por alguns segundos",
        "Respire percebendo o que sente",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu escolho viver minha verdade. Eu escuto meu coração com honestidade. Eu me afasto do que não combina com minha alma."
    },
    acao: "Escreva uma verdade sobre você que talvez esteja evitando reconhecer."
  },

  {
    dia: 13,
    titulo: "Leveza",
    mensagem: "Hoje você é convidada a soltar o peso desnecessário. A leveza não é descuido, é sabedoria emocional.",
    yoga: {
      passos: [
        "Sente-se com conforto",
        "Respire fundo algumas vezes",
        "Solte os ombros lentamente",
        "Relaxe o rosto e o pescoço"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de leveza",
        "Visualize a chama dissolvendo tensões",
        "Respire fundo e solte devagar",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu libero o peso que não preciso carregar. Eu escolho a leveza, a paz e a serenidade em meu coração."
    },
    acao: "Identifique um pensamento pesado que se repete e escolha não alimentá-lo hoje."
  },

  {
    dia: 14,
    titulo: "Fé",
    mensagem: "Mesmo quando você não vê, muita coisa está sendo alinhada. Hoje sua prática é fortalecer a fé com presença e confiança.",
    yoga: {
      passos: [
        "Sente-se com a coluna ereta",
        "Respire profundamente",
        "Leve as mãos ao peito",
        "Permaneça em conexão com sua respiração"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de fé",
        "Observe a chama com tranquilidade",
        "Respire sentindo segurança interna",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu fortaleço minha fé. Eu confio no invisível que está sendo preparado. Eu sigo com serenidade e esperança."
    },
    acao: "Escreva algo em que você escolhe confiar mais a partir de hoje."
  },

  {
    dia: 15,
    titulo: "Centro",
    mensagem: "Hoje sua energia pede equilíbrio. Voltar para o centro é lembrar que sua paz não precisa depender do caos ao redor.",
    yoga: {
      passos: [
        "Sente-se de forma estável",
        "Respire profundamente por alguns ciclos",
        "Relaxe ombros e costas",
        "Perceba seu corpo firmemente apoiado"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de equilíbrio",
        "Feche os olhos por alguns instantes",
        "Respire buscando estabilidade interior",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu retorno ao meu centro. Eu fortaleço minha paz. Eu escolho equilíbrio em pensamentos, emoções e energia."
    },
    acao: "Ao longo do dia, faça uma pausa consciente para lembrar que você pode voltar ao seu centro."
  },

  {
    dia: 16,
    titulo: "Autoescuta",
    mensagem: "Hoje o convite é se ouvir com mais profundidade. Quando você se escuta de verdade, começa a se abandonar menos.",
    yoga: {
      passos: [
        "Sente-se confortavelmente",
        "Respire lenta e profundamente",
        "Feche os olhos com suavidade",
        "Observe as sensações do corpo"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de escuta interior",
        "Coloque a mão sobre o peito",
        "Respire em silêncio por alguns instantes",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu me escuto com carinho. Eu reconheço minhas necessidades. Eu escolho não ignorar mais a minha própria voz."
    },
    acao: "Pergunte a si mesma do que você realmente precisa hoje e anote a resposta."
  },

  {
    dia: 17,
    titulo: "Cura Emocional",
    mensagem: "Hoje sua prática é permitir que emoções antigas encontrem espaço para se dissolver com mais amor e consciência.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Respire profundamente algumas vezes",
        "Relaxe peito, pescoço e ombros",
        "Permaneça presente com suavidade"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de cura",
        "Observe a chama em silêncio",
        "Respire sentindo acolhimento interno",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu permito a cura do que me feriu. Eu acolho minhas emoções com compaixão. Eu me abro para aliviar meu coração."
    },
    acao: "Escreva uma emoção que precisa ser curada e permita-se reconhecê-la sem julgamento."
  },

  {
    dia: 18,
    titulo: "Limites",
    mensagem: "Amor também é limite. Hoje sua energia pede mais clareza sobre o que você aceita e o que não aceita mais.",
    yoga: {
      passos: [
        "Sente-se com firmeza",
        "Respire profundamente",
        "Alongue pescoço e costas com calma",
        "Mantenha a postura consciente"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de proteção",
        "Visualize sua energia sendo fortalecida",
        "Respire com firmeza e presença",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu honro meus limites. Eu protejo minha energia. Eu escolho me afastar do que enfraquece minha paz."
    },
    acao: "Identifique um limite emocional importante que você precisa respeitar mais."
  },

  {
    dia: 19,
    titulo: "Merecimento",
    mensagem: "Hoje sua prática é lembrar que você não precisa sofrer para merecer coisas boas. Merecimento também é cura.",
    yoga: {
      passos: [
        "Sente-se confortavelmente",
        "Respire fundo por alguns ciclos",
        "Leve as mãos ao coração",
        "Sinta seu corpo presente no agora"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de merecimento",
        "Observe a chama com suavidade",
        "Respire sentindo expansão no peito",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu me abro para receber o bem. Eu reconheço meu merecimento. Eu aceito que sou digna de amor, paz e bênçãos."
    },
    acao: "Escreva três coisas boas que você merece viver sem culpa."
  },

  {
    dia: 20,
    titulo: "Renovação",
    mensagem: "Hoje você entra em um ponto de renovação. Sua energia se fortalece quando você escolhe recomeçar com mais consciência.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Respire lenta e profundamente",
        "Alongue braços, pescoço e ombros",
        "Permaneça por alguns instantes em presença"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de renovação",
        "Feche os olhos por alguns instantes",
        "Respire visualizando um novo ciclo se abrindo",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu renovo minha energia. Eu me permito recomeçar com mais consciência, força e luz. Eu escolho um novo ciclo para mim."
    },
    acao: "Escolha um hábito, pensamento ou postura que você deseja renovar a partir de hoje."
  }

  ,
  {
    dia: 21,
    titulo: "Escolha",
    mensagem: "Hoje você fortalece o poder da escolha. Mesmo em meio às dificuldades, sua energia muda quando você escolhe a si mesma com mais consciência.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Respire profundamente por alguns ciclos",
        "Relaxe ombros e maxilar",
        "Permaneça presente no corpo"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de decisão consciente",
        "Olhe para a chama com serenidade",
        "Respire sentindo firmeza interna",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu escolho o que fortalece minha alma. Eu escolho minha paz. Eu escolho caminhar com mais consciência e amor por mim."
    },
    acao: "Identifique uma escolha importante que você precisa fazer com mais verdade e clareza."
  },

  {
    dia: 22,
    titulo: "Desapego",
    mensagem: "Hoje sua prática é soltar o que pesa, prende ou enfraquece sua energia. Desapegar também é abrir espaço para o novo.",
    yoga: {
      passos: [
        "Sente-se com conforto",
        "Respire profundamente algumas vezes",
        "Relaxe braços e ombros",
        "Solte o ar lentamente a cada expiração"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de desapego",
        "Feche os olhos por alguns instantes",
        "Respire soltando tensões internas",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu libero o que já não faz sentido. Eu me desapego do que enfraquece minha paz. Eu abro espaço para o novo com leveza."
    },
    acao: "Escreva algo que você precisa soltar e diga a si mesma que não precisa mais carregar isso."
  },

  {
    dia: 23,
    titulo: "Coragem",
    mensagem: "Hoje você ativa a coragem para seguir em frente, mesmo sem todas as garantias. A coragem cresce quando você continua.",
    yoga: {
      passos: [
        "Sente-se de forma firme",
        "Respire profundamente por alguns ciclos",
        "Alongue pescoço e costas",
        "Mantenha a coluna estável e consciente"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de coragem",
        "Leve a mão ao peito",
        "Respire sentindo força e presença",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu ativo minha coragem. Eu sigo mesmo diante do medo. Eu confio que sou capaz de continuar e me fortalecer."
    },
    acao: "Escolha uma atitude pequena, mas corajosa, que você pode tomar hoje em favor de si mesma."
  },

  {
    dia: 24,
    titulo: "Gratidão",
    mensagem: "Hoje você se conecta com a gratidão. Quando a energia agradece, o coração se expande e a vida se torna mais leve por dentro.",
    yoga: {
      passos: [
        "Sente-se com conforto e presença",
        "Respire lenta e profundamente",
        "Leve as mãos ao coração",
        "Permaneça alguns instantes em quietude"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de gratidão",
        "Observe a chama com calma",
        "Respire reconhecendo o que já existe de bom",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu agradeço pelo que já existe em minha vida. Eu reconheço as bênçãos do caminho. Eu fortaleço minha energia pela gratidão."
    },
    acao: "Escreva três coisas pelas quais você sente gratidão hoje, por menores que pareçam."
  },

  {
    dia: 25,
    titulo: "Proteção",
    mensagem: "Hoje sua prática é fortalecer sua proteção energética. Nem toda energia ao redor precisa entrar em você.",
    yoga: {
      passos: [
        "Sente-se com a coluna ereta",
        "Respire profundamente",
        "Relaxe ombros e peito",
        "Visualize seu corpo envolto em luz"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de proteção",
        "Feche os olhos por alguns instantes",
        "Imagine uma luz ao seu redor",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu fortaleço minha proteção. Eu resguardo minha energia. Eu permito que apenas o que é bom, limpo e verdadeiro permaneça em mim."
    },
    acao: "Ao longo do dia, observe quais ambientes ou pessoas drenam sua energia e reafirme seus limites internos."
  },

  {
    dia: 26,
    titulo: "Equilíbrio Emocional",
    mensagem: "Hoje você cuida da estabilidade das suas emoções. Sentir é natural, mas permanecer inteira também é possível.",
    yoga: {
      passos: [
        "Sente-se de forma estável",
        "Respire profundamente por alguns ciclos",
        "Relaxe o rosto e os ombros",
        "Permaneça presente na respiração"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de equilíbrio",
        "Observe a chama em silêncio",
        "Respire buscando serenidade interna",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu equilibro minhas emoções com consciência. Eu me acolho sem me perder. Eu escolho serenidade, presença e firmeza."
    },
    acao: "Perceba qual emoção mais apareceu hoje e tente acolhê-la com mais calma, sem se afundar nela."
  },

  {
    dia: 27,
    titulo: "Esperança",
    mensagem: "Hoje você reacende a esperança. Mesmo depois de dias difíceis, ainda há caminhos, cura e novas possibilidades diante de você.",
    yoga: {
      passos: [
        "Sente-se confortavelmente",
        "Respire profunda e lentamente",
        "Relaxe peito e ombros",
        "Permaneça por alguns instantes em presença"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de esperança",
        "Olhe para a chama com suavidade",
        "Respire sentindo o coração mais leve",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu reacendo minha esperança. Eu confio que a vida ainda pode florescer de formas bonitas. Eu me abro para novas possibilidades."
    },
    acao: "Escreva algo bom que você ainda deseja viver e permita-se acreditar um pouco mais nisso hoje."
  },

  {
    dia: 28,
    titulo: "Amor-Próprio",
    mensagem: "Hoje sua prática é aprofundar o amor-próprio. Cuidar de si com verdade transforma a forma como você vive e se posiciona no mundo.",
    yoga: {
      passos: [
        "Sente-se com conforto",
        "Respire profundamente algumas vezes",
        "Leve as mãos ao peito",
        "Permaneça conectada ao seu corpo"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de amor-próprio",
        "Feche os olhos por alguns instantes",
        "Respire sentindo acolhimento interno",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu escolho me amar com verdade. Eu cuido de mim com respeito e presença. Eu reconheço meu valor e minha dignidade."
    },
    acao: "Faça hoje um gesto concreto de cuidado consigo mesma, mesmo que simples."
  },

  {
    dia: 29,
    titulo: "Preparação",
    mensagem: "Você se aproxima do fechamento desta jornada. Hoje sua energia se prepara para consolidar tudo o que foi despertado dentro de você.",
    yoga: {
      passos: [
        "Sente-se em posição confortável",
        "Respire de forma profunda e estável",
        "Relaxe ombros, costas e pescoço",
        "Permaneça em observação silenciosa"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de preparação",
        "Observe a chama com atenção",
        "Respire reconhecendo sua caminhada até aqui",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu me preparo para consolidar meu processo. Eu honro tudo o que vivi nesta jornada. Eu sigo mais consciente, forte e presente."
    },
    acao: "Reflita sobre a principal mudança que esta jornada já começou a despertar em você."
  },

  {
    dia: 30,
    titulo: "Consagração",
    mensagem: "Hoje você conclui esta etapa da sua jornada. Este não é um fim, mas a consagração de um novo ciclo de mais consciência, força e amor por si mesma.",
    yoga: {
      passos: [
        "Sente-se com postura firme e confortável",
        "Respire profundamente por alguns ciclos",
        "Leve as mãos ao coração",
        "Permaneça em presença e gratidão"
      ]
    },
    ritual: {
      velas: "1 vela branca",
      passos: [
        "Acenda a vela com intenção de consagração",
        "Observe a chama com reverência",
        "Respire reconhecendo sua transformação",
        "Repita a oração por 1 minuto"
      ],
      oracao: "Eu consagro esta nova fase da minha vida. Eu honro minha jornada, minha força e meu amor-próprio. Eu sigo renovada, consciente e firme em minha luz."
    },
    acao: "Escreva uma mensagem para si mesma reconhecendo a mulher que você está se tornando após esta jornada."
  }

];


//=========================
// 7️⃣ DADOS INICIAIS DO PROGRESSO
//=========================
let currentDay = 1;

let currentChecklist = {
  yoga: false,
  ritual: false,
  acao: false
};

let lastCompletedAt = null;


//=========================
// 8️⃣ PEGAR O OBJETO DO DIA ATUAL
//=========================

// procura dentro do array qual é o objeto do dia atual
//const currentDayData = iniciacaoDays.find(item => item.dia === currentDay);


//=========================
// 9️⃣ TESTES INICIAIS NO CONSOLE
//=========================

// esses logs ajudam a verificar se a base carregou certo
//console.log("Usuário logado:", user);

//=========================
// 🔟 ELEMENTOS DA TELA
//=========================

const warningText = document.getElementById("warningText");
const dayBadge = document.getElementById("dayBadge");
const statusBadge = document.getElementById("statusBadge");
const dayTitle = document.getElementById("dayTitle");
const messageText = document.getElementById("messageText");

const yogaList = document.getElementById("yogaList");
const ritualVelas = document.getElementById("ritualVelas");
const ritualList = document.getElementById("ritualList");
const ritualPrayer = document.getElementById("ritualPrayer");
const actionText = document.getElementById("actionText");

const progressCount = document.getElementById("progressCount");
const progressText = document.getElementById("progressText");
const journeyGrid = document.getElementById("journeyGrid");


//=========================
// 1️⃣1️⃣ TEXTO FIXO DE ORIENTAÇÃO
//=========================

const warningMessage = "Seja honesta consigo mesma. Para viver os resultados desta jornada, é importante realizar cada atividade com presença, verdade e intenção.";

warningText.textContent = warningMessage;


//=========================
// 1️⃣2️⃣ FUNÇÃO PARA MONTAR LISTA
//=========================

// essa função recebe um elemento <ul> e um array de textos
// depois cria os <li> dinamicamente
function renderList(listElement, items) {
  // limpa a lista antes de montar novamente
  listElement.innerHTML = "";

  // percorre cada item do array
  items.forEach(item => {
    // cria um <li>
    const li = document.createElement("li");

    // coloca o texto do passo dentro do <li>
    li.textContent = item;

    // adiciona o <li> dentro da <ul>
    listElement.appendChild(li);
  });
}


//=========================
// 1️⃣3️⃣ FUNÇÃO PARA MONTAR A GRADE DA JORNADA
//=========================
function renderJourneyGrid() {
  journeyGrid.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    const dayBox = document.createElement("div");
    dayBox.className = "journey-day";

    // dias já concluídos
    if (i < currentDay) {
      dayBox.classList.add("active");
    }

    // dia atual
    if (i === currentDay && currentDay <= iniciacaoDays.length) {
      dayBox.classList.add("active");
    }

    // dias futuros
    if (i > currentDay) {
      dayBox.classList.add("locked");
    }

    dayBox.textContent = `Dia ${i}`;
    journeyGrid.appendChild(dayBox);
  }
}

//=========================
// 1️⃣4️⃣ FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO
//=========================

function renderCurrentDay() {
    let currentDayData = iniciacaoDays.find(item => item.dia === currentDay);

   // se passar do último dia, mostra o último conteúdo só como referência visual
   if (!currentDayData && currentDay > iniciacaoDays.length) {
  currentDayData = iniciacaoDays[iniciacaoDays.length - 1];
   }
   // segurança: se não encontrar o dia no array
   if (!currentDayData) {
    dayTitle.textContent = "Dia não encontrado";
    return;
  }

  // badge do topo
  dayBadge.textContent = `Dia ${currentDay} de 30`;

 // status visual
if (currentDay > iniciacaoDays.length) {
  statusBadge.textContent = "Jornada concluída";
} else if (isDayLocked()) {
  statusBadge.textContent = `Liberado em ${getRemainingLockTime()}`;
} else {
  statusBadge.textContent = "Disponível agora";
}

  // título do dia
  dayTitle.textContent = currentDayData.titulo;

  // mensagem do dia
  messageText.textContent = currentDayData.mensagem;

  // passos do yoga
  renderList(yogaList, currentDayData.yoga.passos);

  // velas do ritual
  ritualVelas.textContent = currentDayData.ritual.velas;

  // passos do ritual
  renderList(ritualList, currentDayData.ritual.passos);

  // oração
  ritualPrayer.textContent = currentDayData.ritual.oracao;

  // ação
  actionText.textContent = currentDayData.acao;

  /// progresso
if (currentDay > iniciacaoDays.length) {
  progressCount.textContent = `${iniciacaoDays.length} de 30 dias`;
  progressText.textContent = "Você concluiu toda a jornada de iniciação.";
} else {
  progressCount.textContent = `${currentDay} de 30 dias`;

  if (isDayLocked()) {
    progressText.textContent = `O próximo dia será liberado em ${getRemainingLockTime()}.`;
  } else {
    progressText.textContent = "Após concluir este dia, o próximo será liberado em 24 horas.";
  }
}

  // jornada visual
  renderJourneyGrid();

  applyChecklistToScreen();
updateFinishButton();

}


//=========================
// 1️⃣5️⃣ CHAMAR RENDERIZAÇÃO
//=========================

//renderCurrentDay();

//=========================
// 1️⃣6️⃣ ELEMENTOS DO CHECKLIST
//=========================

const checkYoga = document.getElementById("checkYoga");
const checkRitual = document.getElementById("checkRitual");
const checkAcao = document.getElementById("checkAcao");
const finishBtn = document.getElementById("finishBtn");


//=========================
// 1️⃣7️⃣ APLICAR CHECKLIST SALVO NA TELA
//=========================

function applyChecklistToScreen() {
  // joga os valores salvos nos inputs
  checkYoga.checked = currentChecklist.yoga;
  checkRitual.checked = currentChecklist.ritual;
  checkAcao.checked = currentChecklist.acao;
}


//=========================
// 1️⃣8️⃣ VER SE TODOS OS ITENS FORAM MARCADOS
//=========================

function isChecklistComplete() {
  return (
    currentChecklist.yoga &&
    currentChecklist.ritual &&
    currentChecklist.acao
  );
}


//=========================
// 1️⃣9️⃣ ATUALIZAR ESTADO DO BOTÃO
//=========================

function updateFinishButton() {
  // se já terminou os 30 dias, botão fica bloqueado
  if (currentDay > iniciacaoDays.length) {
    finishBtn.disabled = true;
    finishBtn.textContent = "Iniciação concluída";
    return;
  }

  // se o dia estiver bloqueado por 24h, desabilita o botão
  if (isDayLocked()) {
    finishBtn.disabled = true;
    finishBtn.textContent = "Aguardando liberação";
    return;
  }

  // se não estiver bloqueado, decide pelo checklist
  finishBtn.disabled = !isChecklistComplete();
  finishBtn.textContent = "Concluir dia";
}

//=========================
// 2️⃣0️⃣ FUNÇÃO PARA VER SE AINDA ESTÁ BLOQUEADO
//=========================

function isDayLocked() {
  // se nunca concluiu nenhum dia, não está bloqueado
  if (!lastCompletedAt) {
    return false;
  }

  // transforma a data salva em número
  const lastTime = new Date(lastCompletedAt).getTime();

  // pega o horário atual
  const now = Date.now();

  // 24 horas em milissegundos
  const twentyFourHours = 24 * 60 * 60 * 1000;

  // diferença entre agora e a última conclusão
  const diff = now - lastTime;

  // se passou menos de 24h, ainda está bloqueado
  return diff < twentyFourHours;
}


//=========================
// 2️⃣1️⃣ FUNÇÃO PARA CALCULAR TEMPO RESTANTE
//=========================

function getRemainingLockTime() {
  // se não tiver data salva, não há tempo restante
  if (!lastCompletedAt) {
    return "";
  }

  const lastTime = new Date(lastCompletedAt).getTime();
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  // quanto ainda falta
  const remaining = twentyFourHours - (now - lastTime);

  // se não falta mais nada, retorna vazio
  if (remaining <= 0) {
    return "";
  }

  // converter para horas e minutos
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}min`;
}

//=========================
// 2️⃣0️⃣ SALVAR CHECKLIST NO LOCALSTORAGE
//=========================

function saveChecklist() {
  localStorage.setItem(INIT_CHECKLIST_KEY, JSON.stringify(currentChecklist));
}




//=========================
// 2️⃣1️⃣ ATUALIZAR CHECKLIST AO CLICAR
//=========================

function handleChecklistChange() {
  // pega o valor atual de cada checkbox na tela
  currentChecklist = {
    yoga: checkYoga.checked,
    ritual: checkRitual.checked,
    acao: checkAcao.checked
  };

  // salva no localStorage
  saveChecklist();

  // atualiza botão
  updateFinishButton();

  // debug para você acompanhar
  console.log("Checklist atualizado:", currentChecklist);
}

//=========================
// 2️⃣2️⃣ FUNÇÃO PARA CONCLUIR O DIA
//=========================

function handleFinishDay() {
  // se o checklist não estiver completo, não faz nada
  if (!isChecklistComplete()) {
    return;
  }

  // se ainda estiver no bloqueio de 24h, não faz nada
  if (isDayLocked()) {
    return;
  }

  // salva o horário exato da conclusão
  lastCompletedAt = new Date().toISOString();
  localStorage.setItem(INIT_LAST_COMPLETED_KEY, lastCompletedAt);

  // avança para o próximo dia
  currentDay = currentDay + 1;
  localStorage.setItem(INIT_PROGRESS_KEY, currentDay);

  // reseta checklist para o novo dia
  currentChecklist = {
    yoga: false,
    ritual: false,
    acao: false
  };

  localStorage.setItem(INIT_CHECKLIST_KEY, JSON.stringify(currentChecklist));

  // re-renderiza a tela
  renderCurrentDay();

  // debug
  console.log("Dia concluído com sucesso.");
  console.log("Novo dia atual:", currentDay);
  console.log("Última conclusão salva em:", lastCompletedAt);
}


//=========================
// 2️⃣2️⃣ OUVIR MUDANÇAS NOS CHECKBOXES
//=========================

checkYoga.addEventListener("change", handleChecklistChange);
checkRitual.addEventListener("change", handleChecklistChange);
checkAcao.addEventListener("change", handleChecklistChange);
finishBtn.addEventListener("click", handleFinishDay);


//=========================
// 2️⃣3️⃣ AJUSTAR A TELA ASSIM QUE ABRIR
//=========================

//renderCurrentDay();