let tela = document.querySelector('.tela');
let operadorAtual = '';
let operadorAnterior = '';
let operacao = null;
let resultado = 0;
const limiteNumeros = 1000000000000;

function atualizarTela() {
    const numeroAtual = parseFloat(operadorAtual);
    const limite = limiteNumeros;
    const numDigitos = operadorAtual.length;
    let tamanhoFonte = "50px";

    if (numeroAtual > limite) {
        const proporcao = Math.min(numeroAtual / limite, 1);
        tamanhoFonte = (50 * (1 - proporcao)) + "px";

        if (numeroAtual > limite) {
            tela.textContent = numeroAtual.toExponential(3);
            return;
        }
    } else if (numDigitos > 9) {
        tamanhoFonte = (50 - (numDigitos - 9) * 3) + "px";
    }

    tela.style.fontSize = tamanhoFonte;
    tela.textContent = operadorAtual;
}

function atualizarBotaoAC() {
    const botaoAC = document.getElementById('limpar');
    botaoAC.textContent = operadorAtual === '0' ? 'AC' : 'C';
    if (botaoAC.textContent === 'AC') {
        resultado = 0;
    }
}

function mostrarError() {
    tela.textContent = 'Error';
    operadorAtual = '0';
    operadorAnterior = '';
    operacao = null;
    resultado = 0;
    atualizarBotaoAC();
}

function calcular() {
    switch (operacao) {
        case '+':
            resultado = parseFloat(operadorAnterior) + parseFloat(operadorAtual);
            break;
        case '-':
            resultado = parseFloat(operadorAnterior) - parseFloat(operadorAtual);
            break;
        case '×':
            resultado = parseFloat(operadorAnterior) * parseFloat(operadorAtual);
            break;
        case '÷':
            if (parseFloat(operadorAtual) === 0) {
                mostrarError();
                return;
            }
            resultado = parseFloat(operadorAnterior) / parseFloat(operadorAtual);
            break;
    }

    if (isNaN(resultado)) {
        mostrarError();
        return;
    }

    operadorAtual = resultado.toString();
    operacao = null;
    operadorAnterior = '';
    atualizarTela();
    document.getElementById('limpar').textContent = 'AC';
}

function apagarNumeroCompleto() {
    if (operadorAtual !== '0') {
        operadorAtual = '0';
        operadorAnterior = '';
        operacao = null;
        resultado = 0;
    } else {
        operadorAtual = '0';
    }
    atualizarTela();
    atualizarBotaoAC();
}

function apagarUltimoNumero() {
    operadorAtual = '0';
    atualizarTela();
    atualizarBotaoAC();
}

function clicarNumero(numero) {
    if (operadorAtual.length >= limiteNumeros.toString().length) {
        return;
    }
    if (operadorAtual === '0' || tela.textContent === '0') {
        operadorAtual = numero.toString();
        if (tela.textContent === '0') {
            atualizarBotaoAC();
        }
    } else {
        const novoNumero = operadorAtual + numero;
        if (parseFloat(novoNumero) > limiteNumeros) {
            return;
        }
        operadorAtual += numero;
    }
    atualizarTela();
}

function clicarOperacao(op) {
    if (operacao) {
        calcular();
    }
    operacao = op;
    operadorAnterior = operadorAtual;
    operadorAtual = '';
}

function trocarSinal() {
    operadorAtual = (parseFloat(operadorAtual) * -1).toString();
    atualizarTela();
}

function calcularPercentagem() {
    operadorAtual = (parseFloat(operadorAtual) / 100).toString();
    atualizarTela();
}

document.getElementById('zero').addEventListener('click', () => {
    clicarNumero(0);
    atualizarBotaoAC();
});
document.getElementById('um').addEventListener('click', () => {
    clicarNumero(1);
    atualizarBotaoAC();
});
document.getElementById('dois').addEventListener('click', () => {
    clicarNumero(2);
    atualizarBotaoAC();
});
document.getElementById('tres').addEventListener('click', () => {
    clicarNumero(3);
    atualizarBotaoAC();
});
document.getElementById('quatro').addEventListener('click', () => {
    clicarNumero(4);
    atualizarBotaoAC();
});
document.getElementById('cinco').addEventListener('click', () => {
    clicarNumero(5);
    atualizarBotaoAC();
});
document.getElementById('seis').addEventListener('click', () => {
    clicarNumero(6);
    atualizarBotaoAC();
});
document.getElementById('sete').addEventListener('click', () => {
    clicarNumero(7);
    atualizarBotaoAC();
});
document.getElementById('oito').addEventListener('click', () => {
    clicarNumero(8);
    atualizarBotaoAC();
});
document.getElementById('nove').addEventListener('click', () => {
    clicarNumero(9);
    atualizarBotaoAC();
});

document.getElementById('ponto').addEventListener('click', () => {
    if (operadorAtual.indexOf('.') === -1) {
        operadorAtual += '.';
        atualizarTela();
    }
});

document.getElementById('limpar').addEventListener('click', () => {
    operadorAtual = '0';
    atualizarTela();
    atualizarBotaoAC();
});

document.getElementById('soma').addEventListener('click', () => clicarOperacao('+'));
document.getElementById('subtracao').addEventListener('click', () => clicarOperacao('-'));
document.getElementById('multiplicacao').addEventListener('click', () => clicarOperacao('×'));
document.getElementById('divisao').addEventListener('click', () => clicarOperacao('÷'));
document.getElementById('igual').addEventListener('click', calcular);
document.getElementById('trocarSinal').addEventListener('click', trocarSinal);
document.getElementById('percentagem').addEventListener('click', calcularPercentagem);

//Código para movimentar a janelinha da calculadora

const barraTitulo = document.querySelector('.barra-titulo');
const arrastaraJanela = document.querySelector('.calculadora');
let arrastando = false;
let posicaoInicial = [0, 0];
let posicaoFinal = [0, 0];

barraTitulo.addEventListener('mousedown', mudarPosicao);
document.addEventListener('mouseup', parado);
document.addEventListener('mousemove', atualizarPosicao);

function mudarPosicao(e) {
  arrastando = true;
  posicaoInicial = [
    barraTitulo.offsetLeft - e.clientX,
    barraTitulo.offsetTop - e.clientY
  ];
}

function parado() {
  arrastando = false;
}

function atualizarPosicao(e) {
    if (!arrastando) return;
  
    e.preventDefault();
  
    const novaPosicaoX = e.clientX + posicaoInicial[0];
    const novaPosicaoY = e.clientY + posicaoInicial[1];
  
    arrastaraJanela.style.left = novaPosicaoX + 'px';
    arrastaraJanela.style.top = novaPosicaoY + 'px';
}