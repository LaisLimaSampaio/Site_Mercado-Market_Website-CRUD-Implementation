
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
// --------------------------------------------------------- catalogo  ----------------------------------------------------------------------------

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

function validarForm(){
    var produto = document.getElementById('produto').value;
    var descricao = document.getElementById('descricao').value;
    var preco = parseFloat(document.getElementById('preco').value);
    var foto = document.getElementById('foto').value;

    if (produto === '' || descricao === '' || preco == NaN || foto === ''){
        alert("Os campos não foram preenchidos corretamente.");
        return false
    }else{
        return true
    }

}

function limparForm(){
    var produto = document.getElementById('produto').value = '';
    var descricao = document.getElementById('descricao').value = '';
    var preco = parseFloat(document.getElementById('preco').value = '');
    var foto = document.getElementById('foto').value = '';
}

//add lista
botaoAddCatalogo = document.getElementById('addcatalogo');
botaoAddCatalogo.addEventListener("click", ()=>{

    if (validarForm()){
        var produto = document.getElementById('produto').value;
        var descricao = document.getElementById('descricao').value;
        var preco = parseFloat(document.getElementById('preco').value);
        var foto = document.getElementById('foto').value;

        //verificar se o produto já existe
        var indiceEdicao = -1
        catalogo.find((objeto, index)=>{
            if (objeto.produto === produto){
                indiceEdicao = index;
            }
            console.log("alsjdakbdkabfdk")
        })

        if (indiceEdicao === -1){
            catalogo.push({produto,descricao,preco,foto});
        }else{
            catalogo[indiceEdicao] = {produto,descricao,preco,foto};
        }
        
        window.localStorage.setItem("catalogo",JSON.stringify(catalogo));
    }

    limparForm();
    window.location.href = "catalogo.html"
    
})

function editarCatalago(){

    var IndiceEditCatalogo = JSON.parse(window.localStorage.getItem('IndiceEditCatalogo'));
    if (IndiceEditCatalogo > -1 && IndiceEditCatalogo != null){

        document.getElementById('produto').value = catalogo[IndiceEditCatalogo].produto ;
        document.getElementById('preco').value = catalogo[IndiceEditCatalogo].preco;
        document.getElementById('descricao').value = catalogo[IndiceEditCatalogo].descricao;
        document.getElementById('foto').value = catalogo[IndiceEditCatalogo].foto;

        IndiceEditCatalogo = window.localStorage.setItem('IndiceEditCatalogo',-1);

    }
}
editarCatalago()