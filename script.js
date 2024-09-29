const start = document.querySelector("#start-game");

let humanScore = 0;
let computerScore = 0;
let round = 0;

function startGame() {
    let winner;
    let remainingRounds;

    while (true) {
        playRound(getHumanChoice, getComputerChoice);
        alert(`Your score: ${humanScore}. Pc score: ${computerScore}`)
        round++;
        remainingRounds = 5 - round;

        if((round >= 5 && humanScore > computerScore) || (round < 5 && humanScore - computerScore > remainingRounds)) {
            winner = "you";
            break;
        } else if ((round >= 5 && computerScore > humanScore) || (round < 5 && computerScore - humanScore > remainingRounds)) {
            winner = "computer";
            break;
        }
    }

    gameOver(winner)
}

function gameOver(winner) {
    alert(`${winner} win`);
    humanScore = 0;
    computerScore = 0;
    round = 0;
}

function playRound(getHumanChoice, getComputerChoice) {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    alert(`You choice ${choices[humanChoice]} and computer choice ${choices[computerChoice]}`);
    const result = getWinner(humanChoice, computerChoice);
    updateScores(result);
}

function updateScores(result) {
    if (result === "human") {
        alert("human scores");
        humanScore++;
    } else if (result === "pc") {
        alert("computer scores");
        computerScore++;
    } else {
        alert("draw");
    }
}

function getWinner(humanChoice, computerChoice) {
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

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getHumanChoice() {
    let choice;

    while(true) {
        choice = prompt("Rock: 'R'; Paper: 'P'; Scissors: 'S'").toUpperCase();
        if (choice === 'R' || choice === 'P' || choice === 'S') break;
    }
    
    return choice === 'R' ? 0 : //rock
    choice === 'P' ? 1 : //paper
    2 //scissors
}

start.addEventListener("click", startGame);