
    


    let desafioAtual = 1; // Começa no primeiro desafio
    const totalDesafios = 3; // Serão no máximo 3
        
        
        
        const perguntas = [
    {
        tipo: "texto",
        texto: "Digite o título do primeiro desafio da Guti:"
    },
    {
        tipo: "texto",
        texto: "Digite a descrição do primeiro desafio:"
    },
    {
        tipo: "opcao",
        chave: "gravidade",
        texto: (respostaDesafio) => `Em relação ao desafio "${respostaDesafio}", qual é o grau de gravidade deste problema?`,
        opcoes: [
            { texto: "Extremamente Grave", valor: 5 },
            { texto: "Muito Grave", valor: 4 },
            { texto: "Grave", valor: 3 },
            { texto: "Pouco Grave", valor: 2 },
            { texto: "Sem Gravidade", valor: 1 }
        ]
    },
    {
        tipo: "opcao",
        chave: "urgencia",
        texto: (respostaDesafio) => `Em relação à urgência para resolver o problema "${respostaDesafio}", escolha abaixo:`,
        opcoes: [
            { texto: "Extremamente Urgente", valor: 5 },
            { texto: "Muito Urgente", valor: 4 },
            { texto: "Urgente", valor: 3 },
            { texto: "Pouco Urgente", valor: 2 },
            { texto: "Sem Urgência", valor: 1 }
        ]
    },
    {
        tipo: "opcao",
        chave: "tendencia",
        texto: (respostaDesafio) => `Se o problema "${respostaDesafio}" não for resolvido, ele tenderá a piorar? Escolha o grau de piora abaixo:`,
        opcoes: [
            { texto: "Piora Rápida", valor: 5 },
            { texto: "Piora em curto prazo", valor: 4 },
            { texto: "Piora em médio prazo", valor: 3 },
            { texto: "Piora em longo prazo", valor: 2 },
            { texto: "Sem tendência de piora", valor: 1 }
        ]
    },
    {
        tipo: "opcao",
        chave: "impacto",
        texto: (respostaDesafio) => `Este problema "${respostaDesafio}" atinge diretamente os clientes? Qual o impacto?`,
        opcoes: [
            { texto: "Muito Alto impacto", valor: 5 },
            { texto: "Alto Impacto", valor: 4 },
            { texto: "Impacto Mediano", valor: 3 },
            { texto: "Baixo Impacto", valor: 2 },
            { texto: "Muito Baixo Impacto", valor: 1 }
        ]
    }
];


        const respostas = {};


        let indicePergunta = 0;
        const perguntaElemento = document.querySelector(".descricaoProblemaPergunta");
        const inputResposta = document.getElementById("respostaInput");
        const botoes = document.querySelector(".botoes");
        const salvarBtn = document.getElementById("salvarBtn");
        // === criar botão Finalizar Desafio (seguro: só cria se não existir) ===
        let finalizarBtn = document.querySelector(".finalizar");
        if (!finalizarBtn) {
            finalizarBtn = document.createElement("button");
            finalizarBtn.textContent = "Finalizar Desafio";
            finalizarBtn.id = "finalizarBtn";
            finalizarBtn.classList.add("finalizar");
            finalizarBtn.style.display = "none";
            finalizarBtn.addEventListener("click", finalizarDesafio);
            botoes.appendChild(finalizarBtn);
        }

// Array para armazenar os desafios finalizados
const desafios = [];

        function escreverTexto(texto, elemento, callback) {
            let i = 0;
            elemento.innerHTML = "";
            const intervalo = setInterval(() => {
                elemento.innerHTML += texto[i];
                i++;
                if (i === texto.length) {
                    clearInterval(intervalo);
                    if (callback) callback();
                }
            }, 50);
        }

        const posicoesMiniRetangulos = {
    gravidade: {
        5: "gravidade-5",
        4: "gravidade-4",
        3: "gravidade-3",
        2: "gravidade-2",
        1: "gravidade-1"
    },
    urgencia: {
        5: "urgencia-5",
        4: "urgencia-4",
        3: "urgencia-3",
        2: "urgencia-2",
        1: "urgencia-1"
    },
    tendencia: {
        5: "tendencia-5",
        4: "tendencia-4",
        3: "tendencia-3",
        2: "tendencia-2",
        1: "tendencia-1"
    },
    impacto: {
        5: "impacto-5",
        4: "impacto-4",
        3: "impacto-3",
        2: "impacto-2",
        1: "impacto-1"
    }
};


       function carregarPergunta() {
    const perguntaAtual = perguntas[indicePergunta];
    botoes.style.display = "flex";
    salvarBtn.style.display = "none";
    perguntaElemento.innerHTML = "";

    if (perguntaAtual.tipo === "texto") {
        escreverTexto(perguntaAtual.texto, perguntaElemento, () => {
            inputResposta.style.display = "block";
            inputResposta.value = "";
            inputResposta.focus();
        });
   } else if (perguntaAtual.tipo === "opcao") {
    inputResposta.style.display = "none";
    const tituloDesafio = respostas["titulo"]; // resposta do primeiro desafio
    const textoPergunta = perguntaAtual.texto(tituloDesafio);
    escreverTexto(textoPergunta, perguntaElemento, () => {
        const opcoesContainer = document.createElement("div");
        opcoesContainer.classList.add("opcoes-container");

        perguntaAtual.opcoes.forEach(opcao => {
            const botao = document.createElement("button");
            botao.textContent = opcao.texto;
            botao.classList.add("opcao-btn");
            botao.addEventListener("click", () => {
                respostas[perguntaAtual.chave] = opcao.valor;
                
    // Recalcula o resultado
    const valores = ["gravidade", "urgencia", "tendencia", "impacto"]
        .map(chave => respostas[chave])
        .filter(v => typeof v === "number");
    resultadoFinal = valores.reduce((acc, val) => acc * val, 1);
    if (retanguloResultadoGlobal) {
        retanguloResultadoGlobal.textContent = resultadoFinal;
    }

    // Criar mini-retângulo fixo na posição definida
    const classePosicao = posicoesMiniRetangulos[perguntaAtual.chave][opcao.valor];
    const miniRetangulo = document.createElement("div");
    miniRetangulo.classList.add("mini-retangulo", classePosicao);
    miniRetangulo.textContent = opcao.valor;
    document.querySelector(".matrizGuti__imagem").appendChild(miniRetangulo);

    proximaPergunta();
});
                opcoesContainer.appendChild(botao);
            });

            perguntaElemento.appendChild(opcoesContainer);
        });
    }
}

        function criarRetangulo(texto, classe) {
            const matrizImagem = document.querySelector(".matrizGuti__imagem");

            const retangulo = document.createElement("div");
            retangulo.classList.add(classe);
            retangulo.textContent = texto;

            matrizImagem.appendChild(retangulo);

            const miniContainer = document.createElement("div");
            miniContainer.classList.add("mini-retangulos-container");
            matrizImagem.appendChild(miniContainer);

            criarMiniRetangulos(miniContainer);
        }

        function criarRetanguloDescricao(texto) {
            const matrizImagem = document.querySelector(".matrizGuti__imagem");

            const retanguloDescricao = document.createElement("div");
            retanguloDescricao.classList.add("matrizGuti__retanguloDescricao");
            retanguloDescricao.textContent = texto;

            matrizImagem.appendChild(retanguloDescricao);

            const miniContainer = document.createElement("div");
            miniContainer.classList.add("mini-retangulos-container");
            matrizImagem.appendChild(miniContainer);

            criarMiniRetangulos(miniContainer);
        }

        // Função para criar o retângulo resultado
       function criarRetanguloResultado(numero = 0) {
    const matrizImagem = document.querySelector(".matrizGuti__imagem");

    const retanguloResultado = document.createElement("div");
    retanguloResultado.classList.add("matrizGuti__retanguloResultado");
    retanguloResultado.textContent = numero;
    matrizImagem.appendChild(retanguloResultado);

    retanguloResultadoGlobal = retanguloResultado;

    const miniContainer = document.createElement("div");
    miniContainer.classList.add("mini-retangulos-container");
    matrizImagem.appendChild(miniContainer);

    criarMiniRetangulos(miniContainer);

}
        function criarMiniRetangulos(container) {
            for (let i = 0; i < 4; i++) {
                const miniRetangulo = document.createElement("div");
                miniRetangulo.classList.add("mini-retangulo");
                miniRetangulo.textContent = i + 1;
                miniRetangulo.setAttribute("draggable", true);

                miniRetangulo.addEventListener("dragstart", (event) => {
                    event.dataTransfer.setData("text", event.target.textContent);
                });

                container.appendChild(miniRetangulo);
            }
        }

       

        let resultadoFinal = 0;
        let retanguloResultadoGlobal = null;

        document.querySelectorAll(".drop-area").forEach(area => {
            area.addEventListener("dragover", (e) => {
                e.preventDefault();
                area.classList.add("highlight");
            });

            area.addEventListener("dragleave", () => {
                area.classList.remove("highlight");
            });

            area.addEventListener("drop", (e) => {
                e.preventDefault();
                area.classList.remove("highlight");

                const valorTexto = e.dataTransfer.getData("text");
                const coluna = area.getAttribute("data-coluna");

                const valor = parseInt(valorTexto) * valoresPorColuna[coluna];
                resultadoFinal += valor;

                if (retanguloResultadoGlobal) {
                    retanguloResultadoGlobal.textContent = resultadoFinal;
                }

                const novoElemento = document.createElement("div");
                novoElemento.classList.add("mini-retangulo");
                novoElemento.textContent = valorTexto;
                area.appendChild(novoElemento);
            });
        });

        function proximaPergunta() {
    const perguntaAtual = perguntas[indicePergunta];

    if (perguntaAtual.tipo === "texto") {
        const resposta = inputResposta.value;
        if (indicePergunta === 0) {
            respostas["titulo"] = resposta;
            criarRetangulo(resposta, "matrizGuti__retangulo");
        } else if (indicePergunta === 1) {
            respostas["descricao"] = resposta;
            criarRetanguloDescricao(resposta);
            criarRetanguloResultado(0);
        }
    }

    if (indicePergunta < perguntas.length - 1) {
    indicePergunta++;
    carregarPergunta();
} else {
    // Chegou na última pergunta → mostra botão Finalizar
    // Chegou na última pergunta → mostra botão Finalizar
    if (botoes) botoes.style.display = "flex";
    if (salvarBtn) salvarBtn.style.display = "none";
    if (finalizarBtn) finalizarBtn.style.display = "inline-block";
}
}
       function voltarPergunta() {
    // Se estiver na primeira pergunta: recarrega a página (voltar ao início)
    if (indicePergunta === 0) {
        window.location.reload();
        return;
    }

    // índice da última pergunta respondida (a ação que devemos desfazer)
    const ultimoRespondido = indicePergunta - 1;

    // Função auxiliar para remover mini-retângulos
    function limparMiniRetangulos() {
        const minis = document.querySelectorAll(".mini-retangulo");
        if (minis.length) {
            minis[minis.length - 1].remove(); // remove o último criado
        }
    }

    // Caso: foi o título (pergunta 0)
    if (ultimoRespondido === 0) {
        delete respostas["titulo"];
        const ret = document.querySelector(".matrizGuti__retangulo");
        if (ret) ret.remove();

        const miniContainers = document.querySelectorAll(".mini-retangulos-container");
        if (miniContainers.length) miniContainers[miniContainers.length - 1].remove();

        limparMiniRetangulos();
    }
    // Caso: foi a descrição (pergunta 1)
    else if (ultimoRespondido === 1) {
        delete respostas["descricao"];
        const desc = document.querySelector(".matrizGuti__retanguloDescricao");
        if (desc) desc.remove();

        const resRect = document.querySelector(".matrizGuti__retanguloResultado");
        if (resRect) resRect.remove();
        retanguloResultadoGlobal = null;
        resultadoFinal = 0;

        const miniContainers = document.querySelectorAll(".mini-retangulos-container");
        if (miniContainers.length) miniContainers[miniContainers.length - 1].remove();

        limparMiniRetangulos();
    }
    // Caso: foi uma das opções (gravidade, urgencia, tendencia, impacto)
    else {
        const mapa = {2: "gravidade", 3: "urgencia", 4: "tendencia", 5: "impacto"};
        const chave = mapa[ultimoRespondido];
        if (chave && respostas[chave] !== undefined) {
            delete respostas[chave];

            // recalcula o produto G * U * T * I
            const valores = ["gravidade","urgencia","tendencia","impacto"]
                .map(k => respostas[k])
                .filter(v => typeof v === "number");

            resultadoFinal = valores.length ? valores.reduce((acc, v) => acc * v, 1) : 0;
            if (retanguloResultadoGlobal) retanguloResultadoGlobal.textContent = resultadoFinal;
        }

        limparMiniRetangulos();
        delete respostas[ultimoRespondido];
    }

    // Ajusta o índice e volta para a pergunta anterior
    indicePergunta = ultimoRespondido;
    carregarPergunta();

    // Se a pergunta for de texto, restaura no input
    const perguntaAtual = perguntas[indicePergunta];
    if (perguntaAtual.tipo === "texto") {
        const chaveTexto = indicePergunta === 0 ? "titulo" : "descricao";
        inputResposta.value = respostas[chaveTexto] || "";
    }
}

       function finalizarDesafio() {
    // Guardar o desafio atual
    desafios.push({ ...respostas, resultado: resultadoFinal });

    // Resetar variáveis para iniciar novo desafio
    indicePergunta = 0;
    resultadoFinal = 0;
    retanguloResultadoGlobal = null;

    for (let chave of ["titulo", "descricao", "gravidade", "urgencia", "tendencia", "impacto"]) {
        delete respostas[chave];
    }

    // Ajustar botões
    finalizarBtn.style.display = "none";
    salvarBtn.style.display = "none";

    // Inicia novamente o ciclo de perguntas
    carregarPergunta();
}

        carregarPergunta();

        




    