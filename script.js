const body = document.querySelector("body");
const panel = document.querySelector("#panel");
const results = document.querySelector("#results");
const resultsPara = document.querySelectorAll("#results > *")
const paraRound = resultsPara[0];
const paraHumanScore = resultsPara[1];
const paraComputerScore = resultsPara[2];
const paraWinner = resultsPara[3];
const buttons = document.querySelectorAll("button");
const start = buttons[0];
const rockBtn = buttons[1];
const paperBtn = buttons[2];
const scissorsBtn = buttons[3];
const restartBtn = buttons[4];

let humanScore = 0;
let computerScore = 0;
let round = 0;
const rounds = 5;

function startGame() {
    humanScore = 0;
    computerScore = 0;
    round = 0;
    [start, rockBtn, paperBtn, scissorsBtn, results].forEach(elem => elem.classList.toggle("hidden"));
    paraRound.textContent = `Rounds: 0/${rounds}`
    paraHumanScore.textContent = "Human score: 0";
    paraComputerScore.textContent = "Computer score: 0";
    paraWinner.textContent = "Winner: ";
    paraWinner.classList.toggle("hidden");
}

function playRound(btnEvent) {
    round++;
    paraRound.textContent = `Rounds: ${round}/${rounds}`;
    const choices = ['Rock', 'Paper', 'Scissors'];
    const humanChoice = btnEvent.currentTarget.value;
    const computerChoice = getComputerChoice();

    alert(`You choice ${choices[humanChoice]} and computer choice ${choices[computerChoice]}`);
    const result = getWinnerOfRound(humanChoice, computerChoice);
    updateScores(result);
    finishGame();
}

function finishGame() {
    let remainingRounds = rounds - round;

    if((round >= 5 && humanScore > computerScore) || (round < 5 && humanScore - computerScore > remainingRounds)) {
        winner = "you";
        gameOver(winner);
    } else if ((round >= 5 && computerScore > humanScore) || (round < 5 && computerScore - humanScore > remainingRounds)) {
        winner = "computer";
        gameOver(winner);
    }
}

function updateScores(result) {
    if (result === "human") {
        alert("human scores");
        humanScore++;
        paraHumanScore.textContent = `Human score: ${humanScore}`;
    } else if (result === "pc") {
        alert("computer scores");
        computerScore++;
        paraComputerScore.textContent = `Computer score: ${computerScore}`;
    } else {
        alert("draw");
        humanScore++;
        computerScore++;
        paraHumanScore.textContent = `Human score: ${humanScore}`;
        paraComputerScore.textContent = `Computer score: ${computerScore}`;
    }
}

function getWinnerOfRound(humanChoice, computerChoice) {
    switch(humanChoice - computerChoice) {
        case 1:
        case -2:
            return "human"; //human wins
        case -1:
        case 2:
            return "pc"; //pc wins
        default:
            return "draw"; //draw
    }
}

function gameOver(winner) {
    paraWinner.textContent = `Winner: ${winner}`;
    paraWinner.classList.toggle("hidden");
    [rockBtn, paperBtn, scissorsBtn].forEach(elem => elem.setAttribute("disable", "disabled"));
    restartBtn.classList.toggle("hidden");
}

function restartGame() {
    buttons.forEach(elem => elem.classList.toggle("hidden"));
    results.classList.toggle("hidden");
    [rockBtn, paperBtn, scissorsBtn].forEach(elem => elem.removeAttribute("disabled"));
}

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

[rockBtn, paperBtn, scissorsBtn].forEach(elem => elem.addEventListener("click", playRound));
start.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
