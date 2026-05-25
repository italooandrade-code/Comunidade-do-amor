//=========================
// 0️⃣ PROTEÇÃO DO ADMIN
//=========================

const API_URL = "";
fetch(`${API_URL}/verificar-admin`, {
  method: "GET",
  credentials: "include"
})
.then(response => response.json())
.then(data => {

  if(data.autorizado === false){
    window.location.href = "login.html";
    return;
  }

})
.catch(error => {
  console.log("Erro ao verificar admin:", error);
  window.location.href = "login.html";
});


//=========================
// 1️⃣ PEGAR ELEMENTOS
//=========================
const form = document.getElementById("adminForm");
const emailInput = document.getElementById("email");
const userList = document.getElementById("userList");
const nameInput = document.getElementById("name");

//=========================
// 2️⃣ CARREGAR USUÁRIOS
//=========================
function loadUsers(){

  fetch(`${API_URL}/usuarios`)
    .then(response => response.json())
    .then(data => {

      userList.innerHTML = "";

      if(data.success === false){
        alert(data.message);
        return;
      }

      data.usuarios.forEach((user) => {

        const div = document.createElement("div");
        div.classList.add("user-item");

        const status = user.senha === null ? "🔒 Novo" : "✅ Ativo";

        div.innerHTML = `
          <span>${user.nome || "Sem nome"} (${user.email})</span>
          
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="status">${status}</span>
            <button class="delete-btn" data-id="${user.id}">❌</button>
          </div>
        `;

        userList.appendChild(div);

      });

    })
    .catch(error => {
      console.log("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários do banco.");
    });
}

//=========================
// 3️⃣ ADICIONAR USUÁRIO
//=========================
form.addEventListener("submit", function(event){

  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Envia os dados para o backend
  fetch(`${API_URL}/criar-usuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: name,
      email: email
    })
  })
  .then(response => response.json())
  .then(data => {

    if(data.success === false){
      alert(data.message);
      return;
    }

    nameInput.value = "";
    emailInput.value = "";

    alert("Usuário criado no banco com sucesso!");

  })
  .catch(error => {
    console.log("Erro no fetch:", error);
    alert("Erro ao conectar com o servidor.");
  });

});

//=========================
// 4️⃣ INICIAR
//=========================
loadUsers();

//=========================
// 5️⃣ DELETAR USUÁRIO
//=========================
userList.addEventListener("click", function(e){

  if(e.target.classList.contains("delete-btn")){

    const id = e.target.getAttribute("data-id");

    fetch(`http://localhost:3000/deletar-usuario/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {

      if(data.success === false){
        alert(data.message);
        return;
      }

      loadUsers();

    })
    .catch(error => {
      console.log("Erro ao deletar usuário:", error);
      alert("Erro ao deletar usuário.");
    });

  }

});