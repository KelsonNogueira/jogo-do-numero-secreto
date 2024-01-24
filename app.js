
let listaDeNumerosSorteados = [];
let numeroLimite = 10;

function textoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Portuguese Female', {rate: 1.8});
}

function exibirMensagemInicial() {
    textoNaTela('h1', 'Jogo do número secreto');
    textoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
    console.log(listaDeNumerosSorteados);
    if (listaDeNumerosSorteados.length == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function limparCampo() {
    chute = document.querySelector('input').value = '';
}
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        textoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = (`Você acertou o numero secreto com ${tentativas} ${palavraTentativa}!`);
        textoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute ('disabled');
    } else {
        if (chute < numeroSecreto) {
            textoNaTela('p', 'Tente mais uma vez, o número secreto é maior');
        } else {
            textoNaTela('p', 'Tente mais uma vez, o número secreto é menor');
        } tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    exibirMensagemInicial();
    tentativas = 1;
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    numeroSecreto = gerarNumeroAleatorio();
}