
if(localStorage.hasOwnProperty("logins")){
    var logins = JSON.parse(localStorage.getItem("logins"))  
}else{
    var logins = [{usuario : "Nelson", senha : "1234"}];
    window.localStorage.setItem("logins",JSON.stringify(logins));    
}
        

var form = document.getElementById("form");

console.log(logins)

form.addEventListener("submit", (e) =>{
    e.preventDefault()


    var usuarioReal = document.getElementById("usuario").value
    var senhaReal = document.getElementById("senha").value

    console.log(usuarioReal+" "+senhaReal)

    if(localStorage.hasOwnProperty("logins")){
        logins = JSON.parse(localStorage.getItem("logins"))  
    }

    let usuarioExistente = logins.find((element , index) => {
        if (element.usuario === usuarioReal && element.senha === senhaReal){
           return true;
        }else{
            return false;
        }
    })
    
    if (!usuarioExistente){
        window.alert("Este usuário não existe ainda, vou cadastra-lo primeiro");

        logins.push({usuario: usuarioReal, senha: senhaReal});

        window.localStorage.setItem("logins",JSON.stringify(logins));

        confirm("Agora você está cadastrado.");
    }else{
        window.alert("Este usuário já existe, pode seguir para a próxima tela");
    }
 
    if (senhaReal==="1234" && usuarioReal === "Nelson"){
        window.localStorage.setItem("adm",true);
    }else{
        window.localStorage.setItem("adm",false);
    }
 
    window.localStorage.setItem("logado",true);
    window.localStorage.setItem("usuarioAtual",usuarioReal);
    localStorage.removeItem('carrinho')

    history.back()

})





