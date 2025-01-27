const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); // Aqui criou um instancia e um objeto "audio"
const iniciarPausarBt = document.querySelector('#start-pause span');
const imagemPlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const beep = new Audio('/sons/beep.mp3');
const pause = new Audio('/sons/pause.mp3');
const play = new Audio('/sons/play.wav');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        play.play();
        musica.play();
    } else {
        musica.pause();
        pause.play();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarcontexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarcontexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarcontexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarcontexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">faça uma pausa curto</strong>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície.<br><strong class="app__title-strong">faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beep.play();
        alert('Tempo Finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        return;
    }

    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarPausarBt.textContent = "Pausar";
    imagemPlayPause.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarPausarBt.textContent = "Começar";
    imagemPlayPause.setAttribute('src', `imagens/play_arrow.png`)
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`; //aqui foi usado uma templete string
}

mostrarTempo(); // aqui chamou a função no scopo global para ficar o tempo todo na tela