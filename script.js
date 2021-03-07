const gameSummary = {
    playerChoice: '',
    aiChoice: '',
}

const gameSummaryLive = {
    gameNumber: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const hands = [...document.querySelectorAll('.options img')]

const handSelection = (e) => {
    gameSummary.playerChoice = e.target.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = "")
    e.target.style.boxShadow = "0 0 10px 3px yellow";
}

hands.forEach(hand => hand.addEventListener('click', handSelection))

const aiChoice = () => {
    const choice = Math.floor(Math.random() * hands.length);
    return hands[choice].dataset.option;
}

const checkResult = (player, AI) => {
    if (player === AI) {
        return 'draw';
    } else if ((player === 'paper' && AI === 'rock') || (player === 'rock' && AI === 'scissors') || (player === 'scissors' && AI === 'paper')) {
        return 'win';
    } else {
        return 'lose';
    }
}

const showResult = (player, ai, result) => {
    document.querySelector('[data-summary="your-choice"] span').textContent = player;
    document.querySelector('[data-summary="AI-choice"] span').textContent = ai;

    document.querySelector('#game-number span').textContent = ++gameSummaryLive.gameNumber;
    if (result === 'win') {
        document.querySelector('[data-summary="who-win"] span').textContent = 'You win!!!';
        document.querySelector('#game-wins span').textContent = ++gameSummaryLive.wins;
    } else if (result === 'lose') {
        document.querySelector('[data-summary="who-win"] span').textContent = 'You lose :C';
        document.querySelector('#game-loses span').textContent = ++gameSummaryLive.losses;
    } else {
        document.querySelector('[data-summary="who-win"] span').textContent = 'Draw :/';
        document.querySelector('#game-draws span').textContent = ++gameSummaryLive.draws;
    }
}

const gameReset = () => {
    document.querySelector(`[data-option="${gameSummary.playerChoice}"]`).style.boxShadow = '';
    gameSummary.playerChoice = '';
}

const startGame = () => {
    if (!gameSummary.playerChoice) return alert("You don't pick a hand!");
    gameSummary.aiChoice = aiChoice();
    const gameResult = checkResult(gameSummary.playerChoice, gameSummary.aiChoice);
    showResult(gameSummary.playerChoice, gameSummary.aiChoice, gameResult);
    gameReset();
}

document.getElementById('accept').addEventListener('click', startGame)