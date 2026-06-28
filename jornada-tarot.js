//=========================
// API
//=========================

const API_URL = "";


//=========================
// ELEMENTOS
//=========================

const listaCartas = document.getElementById("listaCartas");
const textoTempo = document.getElementById("textoTempo");
const btnVoltarCurso = document.getElementById("btnVoltarCurso");
const btnSairCurso = document.getElementById("btnSairCurso");


//=========================
// CARTAS DO CURSO
//=========================

const cartasTarot = [
  { id: 1, nome: "O Mago" },
  { id: 2, nome: "A Papisa" },
  { id: 3, nome: "A Imperatriz" },
  { id: 4, nome: "O Imperador" },
  { id: 5, nome: "Os Enamorados" },
  { id: 6, nome: "A Justiça" },
  { id: 7, nome: "A Estrela" },
  { id: 8, nome: "A Lua" },
  { id: 9, nome: "A Roda da Fortuna" },
  { id: 10, nome: "O Julgamento" },
  { id: 11, nome: "O Sol" },
  { id: 12, nome: "O Mundo" }
];


//=========================
// INICIAR
//=========================

buscarProgresso();

//=========================
// BUSCAR PROGRESSO
//=========================

function buscarProgresso(){

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

        montarTela(data.progresso);

    })
    .catch(error => {

        console.log("Erro ao buscar progresso:", error);

        textoTempo.textContent =
        "Não foi possível carregar sua jornada.";

    });

}


//=========================
// MONTAR TELA
//=========================

function montarTela(progresso){

    atualizarMensagem(progresso);

    renderCartas(progresso);
    configurarBotoes(progresso);

}

//=========================
// ATUALIZAR MENSAGEM
//=========================

function atualizarMensagem(progresso){

    const totalCartas = cartasTarot.length;

    // Curso concluído
    if(progresso.ultimaCarta >= totalCartas){

        textoTempo.textContent =
        "🎉 Parabéns! Você concluiu todas as cartas do curso.";

        return;

    }

    // Existe tempo de espera?
    if(progresso.proximaLiberacao){

        const agora = new Date();
        const liberacao = new Date(progresso.proximaLiberacao);

        // Ainda não liberou
        if(liberacao > agora){

            atualizarContador(liberacao);

            return;

        }

    }

    // Existe carta disponível
    if(progresso.ultimaCarta < progresso.cartasLiberadas){

        textoTempo.textContent =
        `Sua próxima carta já está disponível para estudo.`;

        return;

    }

    textoTempo.innerHTML = `
📖 <strong>Aproveite este tempo para revisar as cartas já estudadas.</strong><br><br>

Grandes tarólogos não decoram significados.
Eles desenvolvem interpretação através da repetição, da prática e da experiência.
`;

}

//=========================
// ATUALIZAR CONTADOR
//=========================

function atualizarContador(dataLiberacao){

    const agora = new Date();

    const diferenca = dataLiberacao - agora;

    if(diferenca <= 0){

        textoTempo.textContent =
        "🎉 Sua próxima carta já está disponível.";

        return;

    }

    const horas = Math.floor(
        diferenca / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferenca % (1000 * 60 * 60)) / (1000 * 60)
    );

    textoTempo.textContent =
    `Próxima carta disponível em ${horas}h ${minutos}min.`;

}

//=========================
// CONFIGURAR BOTÕES
//=========================

function configurarBotoes(progresso){

    // CONTINUAR JORNADA
    btnVoltarCurso.onclick = () => {

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

        const progressoAtualizado = data.progresso;

        if(progressoAtualizado.ultimaCarta < progressoAtualizado.cartasLiberadas){

            window.location.href =
            `carta-tarot.html?carta=${progressoAtualizado.ultimaCarta + 1}`;

            return;

        }

        montarTela(progressoAtualizado);

        textoTempo.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    })
    .catch(error => {

        console.log("Erro ao continuar jornada:", error);

        textoTempo.textContent =
        "Não foi possível verificar sua próxima carta agora.";

    });

};


    // SAIR DO CURSO
    btnSairCurso.onclick = () => {

        window.location.href = "curso.html";

    };

}

//=========================
// RENDERIZAR CARTAS
//=========================

function renderCartas(progresso){

    listaCartas.innerHTML = "";

    cartasTarot.forEach(carta => {

        const card = document.createElement("div");

        card.className = "tarot-card-item";

        let icone = "🔒";
        let status = "Bloqueada";

        // CARTA CONCLUÍDA
        if(carta.id <= progresso.ultimaCarta){

            icone = "✅";
            status = "Clique para revisar";

        }

        // CARTA DISPONÍVEL
        else if(carta.id <= progresso.cartasLiberadas){

            icone = "▶";
            status = "Disponível";

        }

        card.innerHTML = `

            <div class="tarot-card-title">
                ${icone} ${carta.nome}
            </div>

            <div class="tarot-card-status">
                ${status}
            </div>

        `;

        //=========================
        // CLIQUE
        //=========================

        if(carta.id <= progresso.cartasLiberadas){

            card.style.cursor = "pointer";

            card.onclick = () => {

                window.location.href =
                `carta-tarot.html?carta=${carta.id}`;

            };

        }
        else{

            card.style.opacity = "0.55";
            card.style.cursor = "default";

        }

        listaCartas.appendChild(card);

    });

}