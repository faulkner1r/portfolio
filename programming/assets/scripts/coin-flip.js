if (typeof(Storage) === "undefined") {
    updateStatus('Your Browser doesn´t support LocalStorage - which is needed for this demo.');
} else {
    updateStats();
}

var numbers = 100;

function newGame() {
    localStorage.clear();
    localStorage.coins = 0;
    localStorage.flip = 0;
    localStorage.win = 0;
    localStorage.lose = 0;
    localStorage.luck = 0;
    localStorage.last = 0;
    localStorage.streak = 0;

    $('#winAmount').text(0);
    $('#loseAmount').text(0);
    $('#flipAmount').text(0);
    $('#coinsAmount').text(0);
    $('#luckAmount').text(0);
    $('#streakAmount').text(0);
}


function updateStats(){
    $('#winAmount').text(localStorage.win);
    $('#loseAmount').text(localStorage.lose);
    $('#flipAmount').text(localStorage.flip);
    $('#coinsAmount').text(localStorage.coins);
    $('#luckAmount').text(localStorage.luck);
    $('#streakAmount').text(localStorage.streak);
}

function addCoins($amount) {
    localStorage.coins = parseInt(localStorage.coins) + $amount;
    updateStats();
}

function removeCoins($amount) {
    addCoins(-$amount);
}

function updateStatus($text) {
    $('#status').text($text);
}

function generateNumber() {
    return Math.floor((Math.random() * numbers) + 1);
}

function recordStats($win) {

    $('#flipAmount').text();
    if ($win) {
        localStorage.win = parseInt(localStorage.win) + 1;
        if (localStorage.last == "win"){
            localStorage.streak = parseInt(localStorage.streak) + 1;
        }else{
            localStorage.streak = 1;
        }
        localStorage.last = "win";
    } else {
        localStorage.lose = parseInt(localStorage.lose) + 1;
        if (localStorage.last == "lose"){
            localStorage.streak = parseInt(localStorage.streak) + 1;
        }else{
            localStorage.streak = 1;
        }
        localStorage.last = "lose";
    }
    localStorage.luck = 50 / parseInt(localStorage.streak);
    //localStorage.luck = parseInt(localStorage.luck).toFixed(2);
    updateStats();
}

$('#getCoins').on('click', function(e) {
    if (parseInt(localStorage.coins) >= 100) {
        updateStatus("You still have over 100 coins!");
    } else {
        addCoins(100);
        updateStatus("Here you go +100 coins for free!");
    }
    e.preventDefault();
});

$('#flipCoin').on('click', function(e) {
    if (parseInt(localStorage.coins) >= 10) {    
        var win = (generateNumber() >= (numbers / 2) ? true : false);
        if (win) {
            addCoins(10);
            recordStats(true);
            updateStatus("You win!");
        } else {
            removeCoins(10);
            recordStats(false);

            if (parseInt(localStorage.coins) == 0){
                updateStatus("You lost it all!");
            }else{
                updateStatus("You lose!");
            }
        }
    }else{
        updateStatus("You need at least 10 coins to play!");
    }
    e.preventDefault();
});

$('#reset').on('click', function(e) {
    newGame();
    e.preventDefault();
});
