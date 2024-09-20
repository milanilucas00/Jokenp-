const playerChoices = document.querySelectorAll('.btn');
const machineResult = document.getElementById('resultado-maquina');
const scorePlayer = document.getElementById('score-jogador');
const scoreMachine = document.getElementById('score-maquina');
const restartContainer = document.getElementById('restart-container');
const restartYes = document.getElementById('restart-yes');
const restartNo = document.getElementById('restart-no');
const containerInterno = document.querySelector('.container-interno');
const containerInterno2 = document.querySelector('.container-interno2');
const selecaoTxt = document.getElementById('selecao-txt');

let playerScore = 0;
let machineScore = 0;
let isGameOver = false;

// Função para gerar uma escolha aleatória para a máquina
function getMachineChoice() {
    const choices = ['stone', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Função para determinar o vencedor
function getResult(playerChoice, machineChoice) {
    if (playerChoice === machineChoice) return 'draw';
    if ((playerChoice === 'stone' && machineChoice === 'scissor') ||
        (playerChoice === 'paper' && machineChoice === 'stone') ||
        (playerChoice === 'scissor' && machineChoice === 'paper')) {
        return 'player';
    } else {
        return 'machine';
    }
}

// Função para aplicar os efeitos e atualizações
function applyResultEffect(result, machineChoice) {
    if (isGameOver) return;

    isGameOver = true
    
    // Mudar cor do container-interno e container-interno2 baseado no resultado
    if (result === 'player') {
        containerInterno.style.backgroundColor = '#FFEB3B';
        containerInterno2.style.backgroundColor = '#4CAF50';
        selecaoTxt.textContent = 'Você ganhou!';
        playerScore++;
        scorePlayer.textContent = String(playerScore).padStart(2, '0');
        containerInterno.classList.add('scaleEffect');
        containerInterno2.classList.add('scaleEffect');
    } else if (result === 'machine') {
        containerInterno.style.backgroundColor = '#FFEB3B';
        containerInterno2.style.backgroundColor = '#F44336';
        selecaoTxt.textContent = 'Você perdeu!';
        machineScore++;
        scoreMachine.textContent = String(machineScore).padStart(2, '0');
        containerInterno.classList.add('fallEffect');
        containerInterno2.classList.add('fallEffect');
    } else {
        containerInterno.style.backgroundColor = '#696969';
        containerInterno2.style.backgroundColor = '#FFEB3B';
        selecaoTxt.textContent = 'Empate!';
        containerInterno.classList.add('shakeEffect');
        containerInterno2.classList.add('shakeEffect');
    }

    // Atualizar o quadrado branco com a imagem da escolha da máquina
    const img = document.createElement('img');
    img.src = `/jokenpo/src/images/${machineChoice}.jpg`;
    img.alt = machineChoice;
    machineResult.innerHTML = '';
    machineResult.appendChild(img);

    restartContainer.style.display = 'flex';
}

// Lógica para reiniciar o jogo
function restartGame(resetScore) {
    isGameOver = false;
    containerInterno.classList.remove('scaleEffect', 'fallEffect', 'shakeEffect');
    containerInterno2.classList.remove('scaleEffect', 'fallEffect', 'shakeEffect');

    if (resetScore) {
        playerScore = 0;
        machineScore = 0;
        scorePlayer.textContent = '00';
        scoreMachine.textContent = '00';
    }

    // Reiniciar o layout visual
    playerChoices.forEach(btn => {
        btn.style.display = 'block';
    });
    document.querySelector('.jogador-selecao').style.justifyContent = 'space-between';
    machineResult.innerHTML = ''; // Limpa a imagem anterior

    containerInterno.style.backgroundColor = '#6cd0d0'; 
    containerInterno2.style.backgroundColor = '#f98128';

    restartContainer.style.display = 'none';

    selecaoTxt.textContent = 'Escolha um sinal!';
}

// Lógica principal quando o jogador faz uma escolha
playerChoices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (isGameOver) return;

        const playerChoice = choice.id;
        const machineChoice = getMachineChoice();

        // Determina o resultado e aplica os efeitos
        const result = getResult(playerChoice, machineChoice);
        applyResultEffect(result, machineChoice);

        // Oculta os sinais não selecionados e alinha os escolhidos
        playerChoices.forEach(btn => {
            if (btn.id !== playerChoice) {
                btn.style.display = 'none';
            }
        });

        // Centralizar a escolha do jogador e da máquina
        document.querySelector('.jogador-selecao').style.justifyContent = 'center';
    });
});

// Lógica para reiniciar ou resetar o jogo
restartYes.addEventListener('click', () => {
    // Reinicia o jogo mantendo o score atual
    restartGame(false);
});

restartNo.addEventListener('click', () => {
    // Reseta o jogo e o score para 00
    restartGame(true);
});
