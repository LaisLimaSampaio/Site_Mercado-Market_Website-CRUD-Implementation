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
// -----------------------------------------carrinho--------------------------------------------

var carrinho = JSON.parse(window.localStorage.getItem('carrinho'));


function atualizarCarrinhoHtml(){
    var tbody = document.getElementsByClassName('tabela-body')[0]; 
    tbody.innerHTML = ''
    console.log(carrinho[0].foto);

    carrinho.forEach((element,index)=>{
        
        var item = document.createElement('div');
        item.classList.add('linha')

        item.innerHTML = `<div class="item-imagem"><img class="item-imagem-link" src="${element.foto}"></div>
                    <div class="produto-decricao">
                        <div class="item-produto">${element.produto}</div>
                        <div class="item-descricao">${element.descricao}</div>
                    </div>
                    <div class="item-quantidade"> <button class="operacao menos" onclick="diminuirItem(${index})">-</button>${element.quantItens}<button onclick="somarItem(${index})" class="operacao mais">+</button></div>
                    <div class="item-preco">R$ ${ ((element.preco) * (element.quantItens)).toFixed(2)}</div>
                    <div class="item-remover"><button onclick="removerCarrinho(${index})" class="remover-botao teste">Remover</button></div>`

        tbody.appendChild(item)
    })
    calcularTotal()
}
atualizarCarrinhoHtml()

function calcularTotal(){
    
    var soma = carrinho.reduce((acumulador,element)=>{
        return acumulador + (element.preco)*(element.quantItens);
    },0)

    console.log(soma)
    
    var divTotal = document.getElementsByClassName('preco-span')[0];
    divTotal.innerHTML = 'R$ '
    divTotal.innerHTML += soma.toFixed(2); 

}


function removerCarrinho(indice){

    carrinho.splice(indice,1);
    localStorage.setItem('carrinho',JSON.stringify(carrinho))   
    atualizarCarrinhoHtml();

}

function diminuirItem(indice){
    if (carrinho[indice].quantItens > 1){
        carrinho[indice].quantItens -= 1;
    }
    localStorage.setItem('carrinho',JSON.stringify(carrinho))
    atualizarCarrinhoHtml();
}

function somarItem(indice){
    carrinho[indice].quantItens += 1;
    localStorage.setItem('carrinho',JSON.stringify(carrinho))
    atualizarCarrinhoHtml();
}

function checkout(operacao){
    var formCheckout = document.getElementById('checkout-form');

    if(operacao === 'sair'){
        formCheckout.style.display = 'none';
    }else{
        formCheckout.style.display = 'flex';
    }
    
    
}

submit-button.addEventListener('subit',function(e){
    e.preventDefault();
    
})