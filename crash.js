let balance = localStorage.getItem('balance') || 1000;
document.getElementById('coin').innerText = balance;

let gameInterval;
let multiplier = 1;
let crashPoint;
let isGameRunning = false;
let ctx = document.getElementById('crashChart').getContext('2d');
let chartX = 0;

function clearCanvas() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 300, 100);
    ctx.beginPath();
    ctx.moveTo(0, 100);
    chartX = 0;
}

function startGame() {
    const bet = parseInt(document.getElementById('betAmount').value);
    if (!bet || bet <= 0 || bet > balance) {
        alert("Enter valid bet amount!");
        return;
    }
    balance -= bet;
    localStorage.setItem('balance', balance);
    document.getElementById('coin').innerText = balance;
    document.getElementById('result').innerText = '';
    document.getElementById('cashOutBtn').disabled = false;
    multiplier = 1;
    crashPoint = (Math.random() * 2 + 1).toFixed(2);
    isGameRunning = true;
    clearCanvas();

    gameInterval = setInterval(() => {
        multiplier += 0.05;
        document.getElementById('multiplier').innerText = multiplier.toFixed(2) + 'x';

        // Chiziq chizish
        chartX += 5;
        let chartY = 100 - multiplier * 10;
        if (chartY < 0) chartY = 0;
        ctx.lineTo(chartX, chartY);
        ctx.strokeStyle = "#0f0";
        ctx.stroke();

        if (multiplier >= crashPoint) {
            endGame(false, bet);
        }
    }, 200);
}

function cashOut() {
    if (!isGameRunning) return;
    const bet = parseInt(document.getElementById('betAmount').value);
    const winAmount = Math.floor(bet * multiplier);
    balance = parseInt(balance) + winAmount;
    localStorage.setItem('balance', balance);
    document.getElementById('coin').innerText = balance;
    endGame(true, winAmount);
}

function endGame(won, amount) {
    clearInterval(gameInterval);
    isGameRunning = false;
    document.getElementById('cashOutBtn').disabled = true;
    document.getElementById('result').innerText = won ? 'You won ' + amount + ' coins!' : 'Crashed at ' + multiplier.toFixed(2) + 'x. You lost!';
}
