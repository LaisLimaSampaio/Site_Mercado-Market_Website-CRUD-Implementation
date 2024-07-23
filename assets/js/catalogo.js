// ------------------------------------------------ nav -----------------------------------------

window.addEventListener('scroll', function() {
    const header = document.getElementsByClassName('nav-bar')[0];
    if (window.scrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// -- vendo se qm ta logado é o Nelson--------

var adm = window.localStorage.getItem("adm");

if (adm === "true"){
    var edit = document.getElementsByClassName("edit")[0]
    edit.classList.remove('edit')
}else{

    var edit = document.getElementsByClassName("edit")[0]
    edit.classList.add('edit')
}
// ------------------------------------------------ catalogo  -----------------------------------------


if(localStorage.hasOwnProperty("catalogo")){
    var catalogo = JSON.parse(localStorage.getItem("catalogo"))  
}else{
    var catalogo = [
        {produto: "Bolo de Morango", descricao: "Bolo de morango com cobertura e recheio de chocolate branco - 1kg - 15 pessoas", preco: 45, foto: "assets/imagens/boloDeMorango.png"},
        {produto: "Brigadeiro" , descricao: "Delicie-se com nossos brigadeiros gourmet, feitos com o melhor chocolate belga e um toque especial de amor." , preco: 3, foto: "assets/imagens/pngwing.com (3).png" },
        {produto: "Torta de Limão", descricao: "Saboreie a frescura da nossa torta de limão, com um recheio cremoso de limão siciliano sobre uma crocante base de biscoito, coberta com merengue dourado.", preco: 50, foto: "assets/imagens/tortaLimao.png" },
        {produto: "Panetone" , descricao: "Saboreie a frescura da nossa torta de limão, com um recheio cremoso de limão siciliano sobre uma crocante base de biscoito." , preco: 35, foto: "assets/imagens/panetone.png"}
    
    ]
    window.localStorage.setItem('catalogo',JSON.stringify(catalogo))
}
//iniciando carrinho---------
var carrinho = window.localStorage.getItem('carrinho',JSON.stringify(carrinho));
if(localStorage.getItem("carrinho") === null || carrinho === 'undefined'){
    var carrinho = [];
    window.localStorage.setItem('carrinho',JSON.stringify(carrinho))
    console.log("carrinho criado login js - entrou na 1 vez caso nao tenha o carrinho no storage")

}else{
    var carrinho = JSON.parse(localStorage.getItem("carrinho"))  
    console.log("entrou caso o carrinho já exista no js")
    
}


//adicionando no catalogo------

function addCatalogoHtml(){
    
    var catalogoHtml = document.getElementsByClassName('catalogo')[0]
    catalogoHtml.innerHTML = '';
    var catalogo = JSON.parse(localStorage.getItem('catalogo'))
    
    catalogo.forEach((element,indice) => {
        var card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `<div class="card-head">
            <img src="${element.foto}" alt="" class="card-img">
            </div>
            <div class="card-body">
            <h4 class="card-produto">${element.produto}</h4>
            <p class="card-descricao">${element.descricao}</p>
            <h5 class="card-preco">R$ ${element.preco.toFixed(2)}</h5>
            <div class="card-actions">
                <button onclick="addCarrinho(${indice})" class="card-botao"><i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i> <span>|</span> Add carrinho</button>
                <button onclick="editarItem(${indice})" class="card-editar edit">Editar</button>
                <button onclick="excluirItem(${indice})" class="card-excluir edit">Excluir</button>
            </div>
            </div>`

        catalogoHtml.appendChild(card);
        console.log(card)
    });
}
addCatalogoHtml();


// botoes de edicao que so aparecem para adm ---
function botoesCardAcao(){
    var adm = window.localStorage.getItem("adm");
    var carrinho = JSON.parse(localStorage.getItem('carrinho'));
    
    if (adm === "true"){

        catalogo.forEach((element,index) => {
            var botaoEditar = document.getElementsByClassName("card-editar")[index];
            var botaoExcluir = document.getElementsByClassName("card-excluir")[index];
            
            if (botaoEditar && botaoEditar.classList.contains('edit')) {
                botaoEditar.classList.remove('edit');
            }
            if (botaoExcluir && botaoExcluir.classList.contains('edit')) {
                botaoExcluir.classList.remove('edit');
            }
        });
    }
}
botoesCardAcao();

function excluirItem(indice){
    if(confirm(`Tem certeza que deseja excluir ${catalogo[indice].produto} do catálogo?`)){
        catalogo.splice(indice,1);
    }
    window.localStorage.setItem("catalogo",JSON.stringify(catalogo));
    location.reload();
}

function editarItem(indice){
    window.localStorage.setItem('IndiceEditCatalogo', indice)
    window.location.href = "adm.html"
}

function addCarrinho(indice){
    var logado = window.localStorage.getItem('logado');
    if(logado === 'true'){

            console.log("Entrou como tem a propiedade carrinho")
            var carrinho = JSON.parse(localStorage.getItem('carrinho'))

            var indexEdit = -1;
            var objExistente = carrinho.find((obj,index)=>{

                if (obj.produto === catalogo[indice].produto){
                    indexEdit = index;
                    return true
                }else{
                    return false
                }
                
            })

            if (indexEdit != -1){
                carrinho[indexEdit].quantItens+=1;
            }else{
                var obj = catalogo[indice]
                obj.quantItens = 1;
                carrinho.push(obj)
            }         
    }else{
            window.alert('Você não está logado, deve logar primeiro!');
            window.location.href = 'login.html';       
    }

    window.localStorage.setItem('carrinho',JSON.stringify(carrinho));

    //configuração de botao após uns segundos
    var botao_add_carrinho = document.getElementsByClassName('card-botao')[indice]

    botao_add_carrinho.classList.add('card-botao-click');
    botao_add_carrinho.innerHTML = 'Adicionado'
    setTimeout(function(){
        botao_add_carrinho.classList.remove('card-botao-click');
        botao_add_carrinho.innerHTML = '<i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i> <span>|</span> Add carrinho'
    },500);

}
//----------- efeitos 

window.sr = ScrollReveal({ reset: true})

sr.reveal('.card', {duration: 2000, origin:'left', distance: '5%'});
