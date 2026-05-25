//=========================
// 1️⃣ CHAVES DO SISTEMA
//=========================

const API_URL = "";
const LOGGED_KEY = "comunidade_logged";
const SESSION_EMAIL_KEY = "comunidade_email";

//=========================
// 2️⃣ PEGAR ELEMENTOS
//=========================
const form = document.getElementById("createPasswordForm");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const errorMessage = document.getElementById("errorMessage");

//=========================
// 3️⃣ PEGAR EMAIL TEMPORÁRIO
//=========================
const tempEmail = localStorage.getItem("temp_email");

//=========================
// 4️⃣ SEGURANÇA
//=========================
// Se não tiver email salvo → volta pro login
if(!tempEmail){
  window.location.href = "login.html";
}

//=========================
// 5️⃣ EVENTO DO FORM
//=========================
form.addEventListener("submit", function(event){

  //5.1 evita reload
  event.preventDefault();

  //5.2 limpar erro antigo
  errorMessage.textContent = "";

  //5.3 pegar valores
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  //=========================
  // 6️⃣ VALIDAÇÕES
  //=========================

  //6.1 verificar se senha é válida
  if(password.length < 4){
    errorMessage.textContent = "A senha deve ter pelo menos 4 caracteres";
    return;
  }

  //6.2 verificar se as senhas são iguais
  if(password !== confirmPassword){
    errorMessage.textContent = "As senhas não coincidem";
    return;
  }

//=========================
// 7️⃣ SALVAR SENHA NO BANCO
//=========================
fetch(`${API_URL}/criar-senha`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: tempEmail,
    senha: password
  })
})
.then(response => response.json())
.then(data => {

  if(data.success === false){
    errorMessage.textContent = data.message;
    return;
  }

  //=========================
  // 8️⃣ LIMPAR TEMP EMAIL
  //=========================
  localStorage.removeItem("temp_email");

  //=========================
  // 9️⃣ CRIAR SESSÃO (TEMPORÁRIO)
  //=========================
  localStorage.setItem(LOGGED_KEY, "true");
  localStorage.setItem(SESSION_EMAIL_KEY, tempEmail);

  //=========================
  // 🔟 REDIRECIONAR
  //=========================
  window.location.href = "home.html";

})
.catch(error => {
  console.log("Erro ao criar senha:", error);
  errorMessage.textContent = "Erro ao conectar com o servidor.";
});
});