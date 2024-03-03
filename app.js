let listadeNUmerosSorteados = [] ;                            /*tem que criar a lista antes de tudo se não (em alguns casos) buga*/
let numeroLimite = 10;                                        /*essa variavel esta aqui por causa da função gerarNumeroAleatorio() se fosse depois dela iria bugar o codigo*/
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero de 1 a 10');
}
exibirMensagemInicial();
function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}`
       exibirTextoNaTela('p', mensagemTentativas);
       document.getElementById('reiniciar').removeAttribute('disabled');

    }else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O numero secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
    
         
}
function gerarNumeroAleatorio (){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLIsta = listadeNUmerosSorteados.length;
   if (quantidadeDeElementosNaLIsta == numeroLimite) {
    listadeNUmerosSorteados = [];
   }
   /*metodo includes verifica nesse caso o que esta dentro da lista e ele é uma função tambem por isso os parenteses*/
   /*nessa questão estamos querendo ver se o numero aleatorio gerado esta incluso na lista fazendo assim, se o numero gerado ja foi escolhido, gerar denovo*/
   if (listadeNUmerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
   }else {
        listadeNUmerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
   }
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
