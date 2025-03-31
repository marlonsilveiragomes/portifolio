document.addEventListener("DOMContentLoaded", function () {
    const matrizDiv = document.getElementById("matrizGutiTabela");

    const imagem = document.createElement("img");
    imagem.src = "assets/GutMatriz.jpg"; // Substitua pelo caminho correto
    imagem.alt = "Matriz GUT";
    imagem.style.width = "100%"; // Ajuste o tamanho conforme necessário

    matrizDiv.appendChild(imagem);
});