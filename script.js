var codes = [],
    score = 0,
    target,
    streak = localStorage.getItem('streak') || 0;

function newGame() {
    codes = [];
    document.getElementById("box").innerHTML = "";
    document.getElementById("streakNum").innerHTML = streak;

    for (var i = 0; i < 9; i++) {
        code = (Math.floor(Math.random() * (16 ** 6))).toString(16);
        codes.push("0".repeat(6 - code.length) + code)
    }

    target = codes[Math.floor(Math.random() * 9)];
    document.getElementById("target").innerHTML = "#" + target.toUpperCase();
    score = 0;

    for (var i = 0; i < 9; i++) {
        if (codes[i] == target) {
            document.getElementById("box").innerHTML += `<button class="color" onclick="check(true)" style="background-color: #${target};"></button>`;
        } else {
            document.getElementById("box").innerHTML += `<button class="color" onclick="check(false)" style="background-color: #${codes[i]};"></button>`;
        }
    }
}

function check(correct) {
    if (correct) {
        if (score < 1) {
            streak++;
            newStatus("First Try!");
            document.getElementById("streakNum").innerHTML = streak;
        } else if (score == 8) {
            newStatus("Finally!")
        } else {
            newStatus("Correct!");
        } setTimeout(() => {
            newGame();
        }, 1500);
    } else {
        score++;
        streak = 0;
        newStatus("Incorrect.");
        document.getElementById("streakNum").innerHTML = streak;
    } localStorage.setItem("streak", streak);
}

function newStatus(text) {
    document.getElementById("status").innerHTML = text;
    setTimeout(() => {
        document.getElementById("status").innerHTML = "Take a guess!";
    }, 1300)
}

newGame();
