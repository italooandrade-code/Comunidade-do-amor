require("dotenv").config();

// Importa o express


const express = require("express");


const cors = require("cors");

const session = require("express-session");
const bcrypt = require("bcrypt");
const OpenAI = require("openai");
const path = require("path");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Cria o servidor
const app = express();
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://comunidade-do-amor-production.up.railway.app",
    "https://comunidadedoamor2026oficial.online"
  ],
  credentials: true
}));

// Permite receber JSON do frontend
app.use(express.json());

// Faz o Express servir os arquivos do frontend
app.use(express.static(path.join(__dirname, "..")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Importa o model Usuario
const Usuario = require("./models/Usuario");

const HistoricoIA = require("./models/HistoricoIA");
const ProgressoIniciacao = require("./models/ProgressoIniciacao");
const caminho = require.resolve("./models/ProgressoTarot");



const ProgressoTarot = require(caminho);



// Faz o Sequelize criar a tabela automaticamente
Usuario.sync();
HistoricoIA.sync();
ProgressoIniciacao.sync();
ProgressoTarot.sync();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "login.html"));
});

// Rota para criar usuário pelo painel admin
app.post("/criar-usuario", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;

  Usuario.create({
    nome: nome,
    email: email.toLowerCase(),
    senha: null,
    status: "novo"
  })
    .then(() => {
      res.json({
        success: true,
        message: "Usuário criado com sucesso!"
      });
    })
    .catch((erro) => {
      console.log("Erro ao criar usuário:", erro);

      res.json({
        success: false,
        message: "Erro ao criar usuário."
      });
    });
});

// Rota para listar usuários no painel admin
app.get("/usuarios", (req, res) => {
  Usuario.findAll({
    order: [["id", "DESC"]]
  })
    .then((usuarios) => {
      res.json({
        success: true,
        usuarios: usuarios
      });
    })
    .catch((erro) => {
      console.log("Erro ao listar usuários:", erro);

      res.json({
        success: false,
        message: "Erro ao listar usuários."
      });
    });
});

// Rota para deletar usuário pelo painel admin
app.delete("/deletar-usuario/:id", (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: {
      id: id
    }
  })
    .then(() => {
      res.json({
        success: true,
        message: "Usuário deletado com sucesso!"
      });
    })
    .catch((erro) => {
      console.log("Erro ao deletar usuário:", erro);

      res.json({
        success: false,
        message: "Erro ao deletar usuário."
      });
    });
});

// Rota para o usuário criar senha no primeiro acesso
app.post("/criar-senha", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  Usuario.findOne({
    where: {
      email: email.toLowerCase()
    }
  })
    .then((usuario) => {

      if (!usuario) {
        return res.json({
          success: false,
          message: "Email não encontrado."
        });
      }

      if (usuario.senha !== null) {
        return res.json({
          success: false,
          message: "Esse usuário já possui senha cadastrada."
        });
      }

      bcrypt.hash(senha, 10)
  .then((senhaCriptografada) => {

    usuario.senha = senhaCriptografada;
    usuario.status = "ativo";

    usuario.save()
      .then(() => {
        res.json({
          success: true,
          message: "Senha criada com sucesso!"
        });
      });

  });
        

    })
    .catch((erro) => {
      console.log("Erro ao criar senha:", erro);

      res.json({
        success: false,
        message: "Erro ao criar senha."
      });
    });
});

// Rota para verificar se o usuário existe e se é primeiro acesso
app.post("/verificar-acesso", (req, res) => {
  const email = req.body.email;

  Usuario.findOne({
    where: {
      email: email.toLowerCase()
    }
  })
    .then((usuario) => {

      if (!usuario) {
        return res.json({
          success: false,
          message: "Acesso não autorizado"
        });
      }

      if (usuario.senha === null) {
        return res.json({
          success: true,
          primeiroAcesso: true,
          message: "Primeiro acesso. Crie sua senha."
        });
      }

      res.json({
        success: true,
        primeiroAcesso: false,
        message: "Usuário encontrado. Digite sua senha."
      });

    })
    .catch((erro) => {
      console.log("Erro ao verificar acesso:", erro);

      res.json({
        success: false,
        message: "Erro ao verificar acesso."
      });
    });
});

//=========================
// LOGIN
//=========================
//=========================
// LOGIN
//=========================
app.post("/login", (req, res) => {

  const email = req.body.email;
  const senha = req.body.senha;

  Usuario.findOne({
    where: {
      email: email.toLowerCase()
    }
  })
  .then((usuario) => {

    if(!usuario){
      return res.json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    bcrypt.compare(senha, usuario.senha)
      .then((senhaCorreta) => {

        if(!senhaCorreta){
          return res.json({
            success: false,
            message: "Senha incorreta"
          });
        }

        req.session.usuarioId = usuario.id;
        req.session.usuarioEmail = usuario.email;

        return res.json({
          success: true,
          tipo: usuario.tipo,
          message: "Login realizado com sucesso"
        });

      });

  })
  .catch((erro) => {

    console.log("Erro no login:", erro);

    res.json({
      success: false,
      message: "Erro ao fazer login"
    });

  });

});

// Rota para verificar se existe usuário logado na sessão
app.get("/verificar-sessao", (req, res) => {

  if(req.session.usuarioId){
    return res.json({
      logado: true,
      email: req.session.usuarioEmail
    });
  }

  res.json({
    logado: false
  });

});

//=========================
// PROGRESSO DA INICIAÇÃO
//=========================
app.get("/progresso-iniciacao", (req, res) => {

  // 1. Se não tiver usuário logado, não deixa acessar
  if (!req.session.usuarioId) {
    return res.json({
      success: false,
      message: "Usuário não logado."
    });
  }

  // 2. Procura progresso desse usuário no banco
  ProgressoIniciacao.findOne({
    where: {
      usuarioId: req.session.usuarioId
    }
  })
  .then((progresso) => {

    // 3. Se ainda não existir progresso, cria o primeiro registro
    if (!progresso) {
      return ProgressoIniciacao.create({
        usuarioId: req.session.usuarioId,
        diaAtual: 1,
        checklistYoga: false,
        checklistRitual: false,
        checklistAcao: false,
        ultimoDiaConcluidoEm: null,
        iniciacaoConcluida: false
      });
    }

    // 4. Se já existir, retorna o progresso encontrado
    return progresso;

  })
  .then((progresso) => {
    res.json({
      success: true,
      progresso: progresso
    });
  })
  .catch((erro) => {
    console.log("Erro ao buscar progresso da iniciação:", erro);

    res.json({
      success: false,
      message: "Erro ao buscar progresso da iniciação."
    });
  });

});

//=========================
// SALVAR CHECKLIST
//=========================
app.post("/salvar-checklist", async (req, res) => {

  try {

    if(!req.session.usuarioId){
      return res.json({
        success: false
      });
    }

    const progresso = await ProgressoIniciacao.findOne({
      where: {
        usuarioId: req.session.usuarioId
      }
    });

    if(!progresso){
      return res.json({
        success: false
      });
    }

    progresso.checklistYoga = req.body.yoga;
    progresso.checklistRitual = req.body.ritual;
    progresso.checklistAcao = req.body.acao;

    await progresso.save();

    res.json({
      success: true
    });

  } catch(erro){

    console.log("Erro ao salvar checklist:", erro);

    res.json({
      success: false
    });

  }

});

//=========================
// CONCLUIR DIA DA INICIAÇÃO
//=========================
app.post("/concluir-dia-iniciacao", async (req, res) => {

  try {

    // 1. Verifica se existe usuário logado
    if (!req.session.usuarioId) {
      return res.json({
        success: false,
        message: "Usuário não logado."
      });
    }

    // 2. Busca o progresso desse usuário no banco
    const progresso = await ProgressoIniciacao.findOne({
      where: {
        usuarioId: req.session.usuarioId
      }
    });

    // 3. Se não encontrar progresso, bloqueia
    if (!progresso) {
      return res.json({
        success: false,
        message: "Progresso da iniciação não encontrado."
      });
    }

    // 4. Verifica se o checklist está completo
    const checklistCompleto =
      progresso.checklistYoga &&
      progresso.checklistRitual &&
      progresso.checklistAcao;

    if (!checklistCompleto) {
      return res.json({
        success: false,
        message: "Você precisa concluir todos os itens do checklist antes de avançar."
      });
    }

    // 5. Verifica bloqueio de 24 horas
    if (progresso.ultimoDiaConcluidoEm) {
      const ultimaConclusao = new Date(progresso.ultimoDiaConcluidoEm).getTime();
      const agora = Date.now();
      const vinteQuatroHoras = 24 * 60 * 60 * 1000;

      const diferenca = agora - ultimaConclusao;

      if (diferenca < vinteQuatroHoras) {
        return res.json({
          success: false,
          message: "O próximo dia ainda não foi liberado."
        });
      }
    }

    // 6. Salva a data/hora da conclusão atual
    progresso.ultimoDiaConcluidoEm = new Date();

    // 7. Avança o dia
    progresso.diaAtual = progresso.diaAtual + 1;

    // 8. Se passou do dia 30, marca iniciação concluída
    if (progresso.diaAtual > 30) {
      progresso.iniciacaoConcluida = true;
    }

    // 9. Reseta checklist para o próximo dia
    progresso.checklistYoga = false;
    progresso.checklistRitual = false;
    progresso.checklistAcao = false;

    // 10. Salva tudo no MySQL
    await progresso.save();

    // 11. Retorna o progresso atualizado para o front
    res.json({
      success: true,
      message: "Dia concluído com sucesso.",
      progresso: progresso
    });

  } catch (erro) {

    console.log("Erro ao concluir dia da iniciação:", erro);

    res.json({
      success: false,
      message: "Erro ao concluir dia da iniciação."
    });

  }

});

//=========================
// STATUS DA INICIAÇÃO
//=========================
app.get("/status-iniciacao", async (req, res) => {

  try {

    // 1. Verifica se o usuário está logado
    if (!req.session.usuarioId) {
      return res.json({
        success: false,
        message: "Usuário não logado."
      });
    }

    // 2. Busca o progresso da iniciação no banco
    const progresso = await ProgressoIniciacao.findOne({
      where: {
        usuarioId: req.session.usuarioId
      }
    });

    // 3. Se não existir progresso ainda, considera como não concluído
    if (!progresso) {
      return res.json({
        success: true,
        iniciacaoConcluida: false
      });
    }

    // 4. Retorna somente o status que o rituals.js precisa saber
    res.json({
      success: true,
      iniciacaoConcluida: progresso.iniciacaoConcluida
    });

  } catch (erro) {

    console.log("Erro ao buscar status da iniciação:", erro);

    res.json({
      success: false,
      message: "Erro ao buscar status da iniciação."
    });

  }

});

//=========================
// PROGRESSO DO TAROT
//=========================
app.get("/progresso-tarot", async (req, res) => {

  try {

    // Verifica se existe usuário logado
    if (!req.session.usuarioId) {
      return res.json({
        success: false,
        message: "Usuário não logado."
      });
    }

    // Procura o progresso do usuário
    let progresso = await ProgressoTarot.findOne({
      where: {
        usuarioId: req.session.usuarioId
      }
    });

    // Se não existir, cria automaticamente
    if (!progresso) {

      progresso = await ProgressoTarot.create({

        usuarioId: req.session.usuarioId,

        apresentacaoConcluida: false,

        ultimaCarta: 0,

        cartasLiberadas: 2,

        proximaLiberacao: null

      });

    }

        //=========================
    // VERIFICA LIBERAÇÃO AUTOMÁTICA
    //=========================

    if (progresso.proximaLiberacao) {

      const agora = new Date();

      if (agora >= progresso.proximaLiberacao) {

        progresso.cartasLiberadas += 2;

        // Não ultrapassar a quantidade de cartas disponíveis
        if (progresso.cartasLiberadas > 12) {
          progresso.cartasLiberadas = 12;
        }

        progresso.proximaLiberacao = null;

        await progresso.save();

      }

    }

    // Retorna o progresso atualizado
    res.json({
      success: true,
      progresso: progresso
    });

  } catch (erro) {

    console.log("Erro ao buscar progresso do Tarot:", erro);

    res.json({
      success: false,
      message: "Erro ao buscar progresso."
    });

  }

});

//=========================
// CONCLUIR APRESENTAÇÃO DO TAROT
//=========================
app.post("/concluir-apresentacao-tarot", async (req, res) => {

  try {

    // Verifica usuário logado
    if (!req.session.usuarioId) {
      return res.json({
        success: false,
        message: "Usuário não logado."
      });
    }

    // Busca progresso
    const progresso = await ProgressoTarot.findOne({
      where: {
        usuarioId: req.session.usuarioId
      }
    });

    if (!progresso) {

      return res.json({
        success: false,
        message: "Progresso não encontrado."
      });

    }

    // Marca apresentação como concluída
    progresso.apresentacaoConcluida = true;

    await progresso.save();

    res.json({
      success: true,
      message: "Apresentação concluída."
    });

  } catch (erro) {

    console.log("Erro ao concluir apresentação:", erro);

    res.json({
      success: false,
      message: "Erro ao concluir apresentação."
    });

  }

});

//=========================
// CONCLUIR CARTA DO TAROT
//=========================
app.post("/concluir-carta-tarot", async (req, res) => {

  try {

    if (!req.session.usuarioId) {
      return res.json({
        success: false,
        message: "Usuário não logado."
      });
    }

    const cartaId = Number(req.body.cartaId);

    if (!cartaId) {
      return res.json({
        success: false,
        message: "Carta inválida."
      });
    }

    const progresso = await ProgressoTarot.findOne({
      where: {
        usuarioId: req.session.usuarioId
      }
    });

    if (!progresso) {
      return res.json({
        success: false,
        message: "Progresso não encontrado."
      });
    }

    if (cartaId > progresso.cartasLiberadas) {
      return res.json({
        success: false,
        message: "Esta carta ainda está bloqueada."
      });
    }

    if (cartaId > progresso.ultimaCarta) {

  progresso.ultimaCarta = cartaId;

  // Se concluiu todas as cartas liberadas,
  // agenda a próxima liberação para 24h depois.

  // Se terminou todas as cartas atualmente liberadas,
// agenda a próxima liberação (caso ainda existam cartas).

if (
    progresso.ultimaCarta >= progresso.cartasLiberadas &&
    progresso.cartasLiberadas < 12
) {

    const agora = new Date();

    progresso.proximaLiberacao = new Date(
        agora.getTime() + (24 * 60 * 60 * 1000)
    );

}

  await progresso.save();

}

    res.json({
      success: true,
      message: "Carta concluída com sucesso.",
      progresso: progresso
    });

  } catch (erro) {

    console.log("Erro ao concluir carta do Tarot:", erro);

    res.json({
      success: false,
      message: "Erro ao concluir carta."
    });

  }

});

//=========================
// LOGOUT
//=========================
app.post("/logout", (req, res) => {

  req.session.destroy((erro) => {

    if(erro){
      return res.json({
        success: false,
        message: "Erro ao sair."
      });
    }

    res.clearCookie("connect.sid");

   res.json({
     success: true,
      message: "Logout realizado com sucesso."
    });
    });

});


//=========================
// VERIFICAR ADMIN
//=========================
app.get("/verificar-admin", (req, res) => {

  if(!req.session.usuarioId){
    return res.json({
      autorizado: false,
      message: "Usuário não logado."
    });
  }

  Usuario.findByPk(req.session.usuarioId)
    .then((usuario) => {

      if(!usuario){
        return res.json({
          autorizado: false,
          message: "Usuário não encontrado."
        });
      }

      if(usuario.tipo !== "admin"){
        return res.json({
          autorizado: false,
          message: "Acesso restrito ao administrador."
        });
      }

      res.json({
        autorizado: true,
        message: "Admin autorizado."
      });

    })
    .catch((erro) => {
      console.log("Erro ao verificar admin:", erro);

      res.json({
        autorizado: false,
        message: "Erro ao verificar administrador."
      });
    });

});

//=========================
// IA ORIENTAÇÃO
//=========================
app.post("/ia-orientacao", async (req, res) => {

  const mensagem = req.body.mensagem;

  // pega usuário logado
const usuario = await Usuario.findByPk(req.session.usuarioId);

// data atual
const hoje = new Date();

// verifica se já existe último uso
if(usuario.iaUltimoUso){

  const ultimoUso = new Date(usuario.iaUltimoUso);

  // compara o dia
  const mesmoDia =
    hoje.getDate() === ultimoUso.getDate() &&
    hoje.getMonth() === ultimoUso.getMonth() &&
    hoje.getFullYear() === ultimoUso.getFullYear();

  // se for outro dia, zera contador
  if(!mesmoDia){
    usuario.iaMensagensHoje = 0;
  }
  // limita 10 mensagens por dia
if(usuario.iaMensagensHoje >= 10){

  return res.json({
    success: false,
    message: "Você atingiu o limite diário de orientações."
  });

}

}


  if(!req.session.usuarioId){
    return res.json({
      success: false,
      message: "Usuário não logado."
    });
  }

  if(!mensagem){
    return res.json({
      success: false,
      message: "Mensagem vazia."
    });
  }

  openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
Você é a IA de orientação da Comunidade do Amor.

Seu papel é oferecer uma resposta acolhedora, espiritual, leve e responsável para pessoas que buscam clareza emocional, amor próprio, relacionamento, reconexão interior e direção.

Regras importantes:
- Responda sempre em português do Brasil.
- Use tom calmo, humano, cuidadoso e espiritual.
- Não prometa retorno amoroso, reconciliação garantida ou resultado específico.
- Não incentive dependência emocional.
- Não diga que a pessoa deve esperar alguém a qualquer custo.
- Traga sempre uma reflexão interna, uma orientação prática e uma mensagem de acolhimento.
- Se o tema envolver sofrimento intenso, ansiedade forte ou desespero, recomende buscar apoio de alguém de confiança ou ajuda profissional.
- Evite respostas longas demais.
- Estruture a resposta em 3 partes curtas:
  1. O que pode estar acontecendo
  2. Orientação para agora
  3. Mensagem final de acolhimento
`
      },
      {
        role: "user",
        content: mensagem
      }
    ]
  })
  .then(async (response) => {

    const resposta = response.choices[0].message.content;

    // salva histórico
await HistoricoIA.create({
  usuarioId: usuario.id,
  pergunta: mensagem,
  resposta: resposta
});

    // aumenta contador de mensagens
usuario.iaMensagensHoje += 1;

// salva data do último uso
usuario.iaUltimoUso = new Date();

// salva no banco
await usuario.save();

    res.json({
      success: true,
      resposta: resposta
    });

  })
  .catch((erro) => {

    console.log("Erro na IA:", erro);

    res.json({
      success: false,
      message: "Erro ao gerar resposta da IA."
    });

  });

});

// Liga o servidor na porta 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});