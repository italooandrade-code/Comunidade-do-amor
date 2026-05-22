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

  iniciarTela();

})
.catch(error => {

  console.log("Erro ao verificar sessão:", error);

  window.location.href = "login.html";

});

//=========================
// 1️⃣ PEGAR ELEMENTOS DA TELA
//=========================

// campo onde a pessoa escreve
const iaMessage = document.getElementById("iaMessage");

// chips de sugestão
const suggestionChips = document.querySelectorAll(".suggestion-chip");

// botão principal
const iaButton = document.querySelector(".ia-btn");

// elementos do card de resposta
const responseTag = document.querySelector(".ia-response-tag");
const responseTitle = document.querySelector(".ia-response-card h2");
const responseText = document.querySelector(".ia-response-card p");


//=========================
// 2️⃣ FUNÇÃO PARA PEGAR RESPOSTA FAKE
//=========================

// essa função recebe a mensagem digitada
// e devolve uma resposta simples de orientação
function generateFakeResponse(message) {
  const text = message.toLowerCase();

  // caso a pessoa fale sobre amor
  if (text.includes("amor")) {
    return {
      tag: "Orientação",
      title: "Sua orientação sobre amor",
      text: "Neste momento, tente não buscar respostas apenas fora de você. Antes de insistir em sinais externos, volte para o que seu coração realmente sente. O amor mais seguro começa quando existe clareza, verdade e paz dentro de você."
    };
  }

  // caso a pessoa fale sobre ansiedade
  if (text.includes("ansiedade")) {
    return {
      tag: "Orientação",
      title: "Sua orientação sobre ansiedade",
      text: "Nem toda urgência precisa ser seguida imediatamente. Respire, desacelere e tente separar o que é medo do que é intuição. Quando a mente se acalma, a direção costuma ficar mais clara."
    };
  }

  // caso a pessoa fale sobre dúvida
  if (text.includes("dúvida") || text.includes("duvida")) {
    return {
      tag: "Orientação",
      title: "Sua orientação sobre dúvida",
      text: "A dúvida nem sempre é falta de resposta. Às vezes, ela é só um sinal de que você ainda precisa de mais silêncio, observação e verdade antes de decidir. Não se force a concluir algo antes de se compreender melhor."
    };
  }

  // caso a pessoa fale sobre energia
  if (text.includes("energia")) {
    return {
      tag: "Orientação",
      title: "Sua orientação sobre energia",
      text: "Sua energia pede mais cuidado e presença. Observe o que te fortalece e o que te desgasta. Nem todo ambiente, pensamento ou vínculo merece acesso constante ao seu coração."
    };
  }

  // caso a pessoa fale sobre clareza
  if (text.includes("clareza")) {
    return {
      tag: "Orientação",
      title: "Sua orientação sobre clareza",
      text: "A clareza costuma aparecer quando você para de lutar contra o que já sente. Em vez de buscar muitas respostas ao mesmo tempo, tente olhar com sinceridade para o que mais se repete dentro de você."
    };
  }

  // caso a pessoa fale sobre direcionamento
  if (text.includes("direcionamento")) {
    return {
      tag: "Orientação",
      title: "Sua orientação sobre direcionamento",
      text: "O próximo passo não precisa resolver toda a sua vida. Ele só precisa ser verdadeiro. Foque no que faz sentido agora, com calma, e permita que o restante se revele no caminho."
    };
  }

  // resposta padrão
  return {
    tag: "Orientação",
    title: "Sua orientação",
    text: "Receba este momento com mais gentileza. Nem tudo precisa ser resolvido agora. Às vezes, a orientação mais importante é respirar, observar o que você sente com sinceridade e dar apenas o próximo passo com verdade."
  };
}


//=========================
// 7️⃣ CLICAR NOS CHIPS
//=========================

suggestionChips.forEach(chip => {
  chip.addEventListener("click", () => {
    // remove a classe ativa de todos os chips
    suggestionChips.forEach(item => {
      item.classList.remove("active");
    });

    // ativa só o chip clicado
    chip.classList.add("active");

    // pega o texto do chip clicado
    const chipText = chip.textContent.trim();

    // coloca esse texto dentro do campo
    iaMessage.value = `Quero receber uma orientação sobre ${chipText.toLowerCase()}.`;

    // joga o foco para o textarea
    iaMessage.focus();
  });
});


//=========================
// 7️⃣.1 REMOVER CHIP ATIVO SE O CAMPO FICAR VAZIO
//=========================

iaMessage.addEventListener("input", () => {
  // pega o valor atual do campo sem espaços vazios
  const message = iaMessage.value.trim();

  // se o campo ficar vazio, remove o destaque de todos os chips
  if (!message) {
    suggestionChips.forEach(chip => {
      chip.classList.remove("active");
    });
  }
});  
//=========================
// 4️⃣ CLICAR NO BOTÃO PRINCIPAL
//=========================

iaButton.addEventListener("click", () => {
  // pega o texto digitado e remove espaços vazios do começo/fim
  const message = iaMessage.value.trim();

  // validação: se estiver vazio, não continua
  if (!message) {
    responseTag.textContent = "Aviso";
    responseTitle.textContent = "Escreva sua mensagem primeiro";
    responseText.textContent = "Para receber uma orientação, escreva no campo o que você está sentindo ou o que deseja compreender melhor neste momento.";

    // joga o foco para o campo
    iaMessage.focus();
    return;
  }

  responseTag.textContent = "Conectando";
responseTitle.textContent = "A IA está preparando sua orientação...";
responseText.textContent = "Isso pode levar alguns segundos.";

  // estado visual de carregamento fake
  iaButton.textContent = "Recebendo orientação...";
  iaButton.disabled = true;

  
 fetch("http://127.0.0.1:3000/ia-orientacao", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    mensagem: message
  })
})
.then(response => response.json())
.then(data => {
setTimeout(() => {
  if(data.success === false){
    responseTag.textContent = "Aviso";
    responseTitle.textContent = "Não foi possível gerar orientação";
    responseText.textContent = data.message;
    return;
  }

  responseTag.textContent = "Orientação";
  responseTitle.textContent = "Sua orientação";
  const respostaFormatada = data.resposta
  .replace(/\*\*/g, "")
  .replace(/\n/g, "<br><br>");

responseText.innerHTML = respostaFormatada;

}, 3000);

})
.catch(error => {
  console.log("Erro ao chamar IA:", error);

  responseTag.textContent = "Erro";
  responseTitle.textContent = "Erro ao conectar com a IA";
  responseText.textContent = "Não foi possível gerar a orientação agora.";
})
.finally(() => {

setTimeout(() => {
  iaButton.textContent = "Receber orientação";
  iaButton.disabled = false;
}, 1200);

  document.querySelector(".ia-response-card").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});
});

//=========================
// INICIAR TELA
//=========================

function iniciarTela(){

}