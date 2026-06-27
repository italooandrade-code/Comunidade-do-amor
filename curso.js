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

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});


//=========================
// 5️⃣ PEGAR OS CARDS DA TELA
//=========================

const btnPrimeirosPassos = document.getElementById("btnPrimeirosPassos");
const btnFerramentasJornada = document.getElementById("btnFerramentasJornada");
const btnEstrategiaDivulgacao = document.getElementById("btnEstrategiaDivulgacao");
const btnIaCurso = document.getElementById("btnIaCurso");


//=========================
// 6️⃣ ABRIR AS TELAS
//=========================

// card 1
btnPrimeirosPassos.addEventListener("click", () => {

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

    if(!progresso.apresentacaoConcluida){

      window.location.href = "primeiros-passos.html";
      return;

    }

    const proximaCarta = progresso.ultimaCarta + 1;

    window.location.href =
      `carta-tarot.html?carta=${proximaCarta}`;

  })
  .catch(error => {

    console.log("Erro:", error);

    alert("Erro ao abrir o curso.");

  });

});

// card 2
btnFerramentasJornada.addEventListener("click", () => {
  window.location.href = "ferramentas-jornada.html";
});

// card 3
btnEstrategiaDivulgacao.addEventListener("click", () => {
  window.location.href = "estrategia-divulgacao.html";
});

// card 4
btnIaCurso.addEventListener("click", () => {
  window.location.href = "ia-curso.html";
});

//=========================
// JORNADA TAROT
//=========================

const listaCartas = document.getElementById("listaCartas");

const cartasTarot = [

    {id:1,nome:"O Mago"},
    {id:2,nome:"A Papisa"},
    {id:3,nome:"A Imperatriz"},
    {id:4,nome:"O Imperador"},
    {id:5,nome:"O Papa"},
    {id:6,nome:"Os Enamorados"},
    {id:8,nome:"A Justiça"},
    {id:10,nome:"A Roda da Fortuna"},
    {id:17,nome:"A Estrela"},
    {id:18,nome:"A Lua"},
    {id:19,nome:"O Sol"},
    {id:21,nome:"O Mundo"}

];

renderCartas();

function renderCartas(){

    listaCartas.innerHTML = "";

    cartasTarot.forEach(carta=>{

        const card = document.createElement("div");

        card.className = "tarot-card-item";

        card.innerHTML = `

            <div class="tarot-card-title">

                🔒 ${carta.nome}

            </div>

            <div class="tarot-card-status">

                Bloqueada

            </div>

        `;

        listaCartas.appendChild(card);

    });

}