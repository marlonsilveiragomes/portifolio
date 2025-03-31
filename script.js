const validUsername = "admin"; // Altere para o nome de usuário desejado
const validPassword = "admin"; // Altere para a senha desejada

function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        document.getElementById('successMessage').innerText = "Login bem-sucedido!";
        document.getElementById('successMessage').style.display = "block";
        document.getElementById('errorMessage').style.display = "none";
        
        // Redireciona para a nova página
        window.location.href = "areaALI.html"; // Altere o nome do arquivo se necessário
        return false; // Impede o envio do formulário
    } else {
        document.getElementById('errorMessage').style.display = "block";
        return false; // Impede o envio do formulário
    }
}