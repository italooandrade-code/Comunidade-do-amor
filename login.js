//=========================
// 1️⃣ CHAVES DO SISTEMA
//=========================
const LOGGED_KEY = "comunidade_logged";
const SESSION_EMAIL_KEY = "comunidade_email";

//=========================
// 2️⃣ PEGAR ELEMENTOS
//=========================
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordGroup = document.getElementById("passwordGroup");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const button = document.getElementById("continueBtn");

//=========================
// 3️⃣ CONTROLE DE ETAPA
//=========================
// false = ainda está no email
// true = já está pedindo senha
let isPasswordStep = false;

//=========================
// 4️⃣ EVENTO DO FORM
//=========================
form.addEventListener("submit", function(event){

  //4.1 evita recarregar a página
  event.preventDefault();

  //4.2 limpa erro antigo
  errorMessage.textContent = "";

  //=========================
   //=========================
  // 5️⃣ ETAPA EMAIL
  //=========================
  if(!isPasswordStep){

    const email = emailInput.value.trim();

    fetch("http://127.0.0.1:3000/verificar-acesso", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then(response => response.json())
    .then(data => {

      if(data.success === false){
        errorMessage.textContent = data.message;
        return;
      }

      if(data.primeiroAcesso === true){
        localStorage.setItem("temp_email", email);
        window.location.href = "create-password.html";
        return;
      }

      passwordGroup.classList.remove("hidden");
      emailInput.disabled = true;
      button.textContent = "Entrar";
      isPasswordStep = true;

    })
    .catch(error => {
      console.log("Erro ao verificar acesso:", error);
      errorMessage.textContent = "Erro ao conectar com o servidor.";
    });

    return;
  }

    //=========================
    // 6️⃣ PRIMEIRO ACESSO
    //=========================
    

    //=========================
  // 8️⃣ ETAPA SENHA
  //=========================
  if(isPasswordStep){

    const email = emailInput.value;
    const password = passwordInput.value;

    fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        senha: password
      })
    })
    .then(response => response.json())
    .then(data => {

      if(data.success === false){
        errorMessage.textContent = data.message;
        return;
      }

      localStorage.setItem(LOGGED_KEY, "true");
      localStorage.setItem(SESSION_EMAIL_KEY, email);

      if(data.tipo === "admin"){
  window.location.href = "admin.html";
} else {
  window.location.href = "home.html";
}

    })
    .catch(error => {
      console.log("Erro ao fazer login:", error);
      errorMessage.textContent = "Erro ao conectar com o servidor.";
    });

  } });