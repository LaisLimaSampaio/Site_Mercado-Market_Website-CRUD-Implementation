// &&&&&&&&&&&&&&&&&&&&&&&&&&&& NAV &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


// -- vendo se qm ta logado é o Nelson--------

var adm = window.localStorage.getItem("adm");

if (adm === "true"){
    var edit = document.getElementsByClassName("edit")[0]
    edit.classList.remove('edit')
}else{

    var edit = document.getElementsByClassName("edit")[0]
    edit.classList.add('edit')
}

// animação em js para a nav diminuir -------------

window.addEventListener('scroll', function() {
    const header = document.getElementsByClassName('nav-bar')[0];
    const headerCor = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('shrink');
        headerCor.style.backgroundColor = '#D93654'
    } else {
        header.classList.remove('shrink');
        headerCor.style.backgroundColor = 'transparent'
    }
});



// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& INICIO &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

var divBemVindo = document.getElementsByClassName("bem-vindo")[0]
var usuarioAtual = window.localStorage.getItem("usuarioAtual")

console.log(usuarioAtual);
divBemVindo.innerHTML = `Seja bem vindo(a), ${usuarioAtual}!`


// efeitos ---


