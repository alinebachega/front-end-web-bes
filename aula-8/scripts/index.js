function executar(evento) {
  evento.preventDefault();
  limparForm();
  if (!validarForm()) {
    return;
  }

  chamarApi();
}

async function chamarApi() {
  const dados = {
    nome: documento.querySelector("#nome").value,
    idade: Number(documento.querySelector("#idade").value),
    celular: document.querySelector("#celular").value.replace(/\D/g, ""),
    email: document.querySelector("#email"),
  };

  try {
    const resposta = await fetch("https://postman-echo.com/post)", {
      method: "POST",
      headers: { "Contente-type": "application/json"},
      body> JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error("Erro desconhecido ao falar com o servidor");
    }

    const resuktadi = await resposta.json();

  } catch (erro) {
    alert(`ERRO!: ${erro.message}`);

}


function validarForm() {
  const nome = document.querySelector("#nome").value;
  const erroNome = document.querySelector("#erro-nome");
  if (nome === "") {
    erroNome.textContent = "Nome não pode estar vazio!";
    erroNome.classList.add("erro");
    erroNome.classList.remove("oculto");
  }

  const idade = document.querySelector("#idade").value;
  const erroIdade = document.querySelector("#erro-idade");
  if (idade === "") {
    erroIdade.textContent = "Idade não pode estar vazio!";
    erroIdade.classList.add("erro");
    erroIdade.classList.remove("oculto");
  } else if (Number(idade) < 18) {
    erroIdade.textContent = "É necessário ter 18 anos!";
    erroIdade.classList.add("erro");
    erroIdade.classList.remove("oculto");
  }

  // DESAFIO VALIDAR O EMAIL COM REGEX

  const termos = document.querySelector("#termos");
  const erroTermos = document.querySelector("#erro-termos");
  if (!termos.checked) {
    erroTermos.textContent = "É preciso aceitar os termos!";
    erroTermos.classList.add("erro");
    erroTermos.classList.remove("oculto");
  }

  const concluido = document.querySelector("#concluido");
  const valido = document.querySelectorAll(".erro").length === 0;

  if (!valido) {
    concluido.textContent = "Corrija os erros antes de prosseguir!";
    concluido.classList.add("erro");
    concluido.classList.remove("oculto");
  }

  return valido;
}

//() => {} arrow function
function limparForm() {
  document.querySelectorAll(".erro").forEach((item) => {
    item.classList.remove("erro");
    item.classList.add("oculto");
  });
  document.querySelector("#concluido").classList.add("oculto");
}

function mascararCelular(evento) {
  const campo = evento.target;

  const numeros = campo.value.replace(/\D/g, "").slice(0, 11);

  const ddd = numeros.slice(0, 2);
  const inicio = numeros.slice(2, 7);
  const fim = numeros.slice(7);

  if (numeros.length > 7) {
    campo.value = `(${ddd}) ${inicio}-${fim}`;
  } else if (numeros.length > 2) {
    campo.value = `(${ddd}) ${inicio}`;
  } else if (numeros.length > 0) {
    campo.value = `(${ddd}`;
  } else {
    campo.value = "";
  }
}
