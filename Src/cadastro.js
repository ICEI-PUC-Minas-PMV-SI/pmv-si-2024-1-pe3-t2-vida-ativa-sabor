document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); 

        
        const nome = document.getElementById("nome").value;
        const dataNascimento = document.getElementById("data_nascimento").value;
        const email = document.getElementById("email").value;
        const confirmarEmail = document.getElementById("confirmar_email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar_senha").value;
        const telefone = document.getElementById("telefone").value;

        
        if (senha.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("A senha e a confirmação de senha não coincidem.");
            return;
        }

        if (email !== confirmarEmail) {
            alert("O email e a confirmação de email não coincidem.");
            return;
        }

       
        this.submit();
    });
});
