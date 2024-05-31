let cookieCount = 0;
let multiplier = 1;

document.getElementById('cookie').onclick = function() {
    cookieCount += multiplier;
    document.getElementById('cookie-count').textContent = cookieCount;
    saveGame();
};

function buyMultiplier(mult) {
    if (mult === 2 && cookieCount >= 100) {
        cookieCount -= 100;
        multiplier = 2;
    } else if (mult === 3 && cookieCount >= 500) {
        cookieCount -= 500;
        multiplier = 3;
    }
    document.getElementById('cookie-count').textContent = cookieCount;
    saveGame();
}

function saveGame() {
    localStorage.setItem('cookieCount', cookieCount);
    localStorage.setItem('multiplier', multiplier);
}

function loadGame() {
    const savedCookieCount = localStorage.getItem('cookieCount');
    const savedMultiplier = localStorage.getItem('multiplier');
    if (savedCookieCount !== null) {
        cookieCount = parseInt(savedCookieCount, 10);
    }
    if (savedMultiplier !== null) {
        multiplier = parseInt(savedMultiplier, 10);
    }
    document.getElementById('cookie-count').textContent = cookieCount;
}

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: prompt("Enter your name:"), score: cookieCount });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';
    leaderboard.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.name}: ${entry.score} cookies`;
        leaderboardElement.appendChild(listItem);
    });
}

window.onload = function() {
    loadGame();
    updateLeaderboard();
    setInterval(saveGame, 1000);
};

window.onbeforeunload = function() {
    updateLeaderboard();
};
