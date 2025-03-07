// Função para adicionar nomes na lista
let nomes = [];

function adicionarAmigo() {
    const nomeInput = document.getElementById("nome");
    const nome = nomeInput.value.trim();
    if (nome !== "" && !nomes.includes(nome)) {
        nomes.push(nome);
        atualizarLista();
        nomeInput.value = "";
        nomeInput.focus(); // Mantém o cursor no campo de entrada
    } else {
        alert("Nome inválido ou já adicionado!");
    }
}

// Função para atualizar a lista de nomes na página
function atualizarLista() {
    const lista = document.getElementById("listaNomes");
    lista.innerHTML = "";
    nomes.forEach(nome => {
        const item = document.createElement("li");
        item.textContent = nome;
        lista.appendChild(item);
    });
}

// Função para sortear o amigo secreto
function sortearAmigoSecreto() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos 2 nomes para realizar o sorteio!");
        return;
    }

    let sorteio = [...nomes];
    let resultado = {};
    let tentativas = 0;

        while (tentativas < 1000) { // Limite de tentativas para garantir o sorteio válido
        let copiaNomes = [...sorteio];
        let valido = true;
        resultado = {};
        for (let nome of nomes) {
            let candidatos = copiaNomes.filter(candidato => candidato !== nome);
            if (candidatos.length === 0) {
                valido = false;
                break;
            }
            let sorteado = candidatos[Math.floor(Math.random() * candidatos.length)];
            resultado[nome] = sorteado;
            copiaNomes.splice(copiaNomes.indexOf(sorteado), 1);
        }
        if (valido) break;
        tentativas++;
    }

    if (tentativas === 1000) {
        alert("Não foi possível realizar o sorteio corretamente. Tente novamente.");
        return;
    }

    exibirResultado(resultado);
}

// Função para exibir o resultado do sorteio
function exibirResultado(resultado) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";
    for (let [amigo, sorteado] of Object.entries(resultado)) {
        const item = document.createElement("p");        
        item.textContent = `O amigo secreto de ${amigo} é: ${sorteado};`;
        resultadoDiv.appendChild(item);
    }    
}

// Função para resetar o sorteio e limpar os dados
function resetarSorteio() {
    nomes = [];
    resultado = [];
    document.getElementById("listaNomes").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("nome").value = "";
} 