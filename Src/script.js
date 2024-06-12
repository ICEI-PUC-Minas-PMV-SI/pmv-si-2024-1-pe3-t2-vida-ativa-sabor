document.addEventListener("DOMContentLoaded", function() {
    var nome = getCookie("nome");
    var adm = getCookie("adm");
    if (nome && nome.trim() !== '') { 
        var welcomeElement = document.createElement("span");
        welcomeElement.className = "nav-link";
        welcomeElement.textContent = "Bem-vindo, " + decodeURIComponent(nome) + "!";
        document.querySelector(".navbar-nav.ml-auto").innerHTML = "";
        document.querySelector(".navbar-nav.ml-auto").appendChild(welcomeElement);

        if (adm === 'S') {
            
            var controlUsersBtn = document.createElement("li");
            controlUsersBtn.className = "nav-item";
            controlUsersBtn.innerHTML = '<a class="nav-link" href="controle.html">Controle de Usuários</a>';
            document.getElementById("userNav").appendChild(controlUsersBtn);
        } else {
            var controlUsersBtn = document.createElement("li");
            controlUsersBtn.className = "nav-item";
            controlUsersBtn.innerHTML = '<a class="nav-link" href="controle.html">Controle de Usuário</a>';
            document.getElementById("userNav").appendChild(controlUsersBtn);
        }
        
        var logoutButton = document.createElement("a");
        logoutButton.className = "nav-link";
        logoutButton.href = "#"; 
        logoutButton.textContent = "Sair"; 
        logoutButton.addEventListener("click", function(event) {
            event.preventDefault(); 
            logout(); 
        });
        document.querySelector(".navbar-nav.ml-auto").appendChild(logoutButton);
    } else { 
        var loginButton = document.createElement("a");
        loginButton.className = "nav-link";
        loginButton.href = "/login";
        loginButton.textContent = "Entre/Cadastre-se";
        document.querySelector(".navbar-nav.ml-auto").innerHTML = "";
        document.querySelector(".navbar-nav.ml-auto").appendChild(loginButton);
    }
});

function getCookie(name) {
    var cookieArr = document.cookie.split("; ");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0]) {
            return cookiePair[1];
        }
    }
    return null;
}

function logout() {
    
    document.cookie = "nome=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
}



document.querySelector(".prev").addEventListener("click", function () {
    scrollImages(-1);
});

document.querySelector(".next").addEventListener("click", function () {
    scrollImages(1);
});

function scrollImages(direction) {
    const container = document.querySelector(".container-images");
    const containerWidth = container.offsetWidth;
    const scrollStep = 200;

    if (direction === -1) {
        container.scrollLeft -= scrollStep;
    } else if (direction === 1) {
        container.scrollLeft += scrollStep;

        
        if (Math.round(container.scrollLeft) >= Math.round(container.scrollWidth - containerWidth)) {
            container.scrollLeft = 0;
        }
    }

    
    if (direction === -1 && container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth;
    }
}





const verMaisReceitaButton = document.getElementById('receitas');

verMaisReceitaButton.addEventListener('click', function() {

    window.location.href = 'receitas.html';
});

const verMaisExercicioButton = document.getElementById('exercicios');

verMaisExercicioButton.addEventListener('click', function() {

    window.location.href = 'exercícios.html';
});

