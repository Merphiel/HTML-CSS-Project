var ranNumArr = [];
var ranOpArr = [];
var numCount;
var sol;
var score;
var maxScore;
var diff;
var maxNumVal;
var question;
var num;
ranNumArr.find;


Image
function initGame() {
    Image.sh
    ranNumArr = [];
    maxScore = 0;
    numCount = 0;
    sol = 0;
    score = 0;
    diff = 0;
    question = "";
    num = 0;
    startGame();
}

function startGame() {
    diff = Math.floor(Math.random() * 7);
    switch (diff) {
        case 0:
            maxNumVal = 99;
            numCount = Math.floor(Math.random() * 4 + 2);
            ranNumArr.push(Math.floor(Math.random() * maxNumVal))
            for (let i = 1; i < numCount; i++) {
                ranNumArr.push(Math.floor(Math.random() * maxNumVal));
                ranOpArr.push(Math.floor(Math.random() * 2));
            }
            sol = ranNumArr.shift();
            question = "" + sol;
            for (let i = 0; i < numCount - 1; i++) {
                switch (ranOpArr.shift()) {
                    case 0:
                        num = ranNumArr.shift();
                        question = question + " + " + num;
                        sol += num;
                        break;
                    case 1:
                        num = ranNumArr.shift();
                        question = question + " - " + num;
                        sol -= num;
                        break;
                }
            }
            document.getElementById("question").innerHTML = question;
            break;
        case 1:
            maxNumVal = 15;
            sol = Math.floor(Math.random() * maxNumVal + 5);
            num = Math.floor(Math.random() * maxNumVal + 5);
            question = ((sol) + " * " + num);
            sol = sol * num;


            maxNumVal = 99;
            numCount = Math.floor(Math.random() * 2 + 1);
            for (let i = 0; i < numCount; i++) {
                ranNumArr.push(Math.floor(Math.random() * maxNumVal));
                ranOpArr.push(Math.floor(Math.random() * 2));
            }
            for (let i = 0; i < numCount; i++) {
                switch (ranOpArr.shift()) {
                    case 0:
                        num = ranNumArr.shift();
                        question = question + " + " + num;
                        sol += num;
                        break;
                    case 1:
                        num = ranNumArr.shift();
                        question = question + " - " + num;
                        sol -= num;
                        break;
                }
            }
            document.getElementById("question").innerHTML = question;
            break;
        case 2:
            maxNumVal = 15;
            sol = Math.floor(Math.random() * maxNumVal + 5);
            num = Math.floor(Math.random() * maxNumVal + 5);
            question = ((num * sol) + " / " + num);
            maxNumVal = 99;
            numCount = Math.floor(Math.random() * 2 + 1);
            for (let i = 0; i < numCount; i++) {
                ranNumArr.push(Math.floor(Math.random() * maxNumVal));
                ranOpArr.push(Math.floor(Math.random() * 2));
            }
            for (let i = 0; i < numCount; i++) {
                switch (ranOpArr.shift()) {
                    case 0:
                        num = ranNumArr.shift();
                        question = question + " + " + num;
                        sol += num;
                        break;
                    case 1:
                        num = ranNumArr.shift();
                        question = question + " - " + num;
                        sol -= num;
                        break;
                }
            }
            document.getElementById("question").innerHTML = question;
            break;
        case 3:

            maxNumVal = 15;
            sol = Math.floor(Math.random() * maxNumVal + 5);
            num = Math.floor(Math.random() * maxNumVal + 5);
            question = ((num * sol) + " / " + num);
            document.getElementById("question").innerHTML = question;
            break;
        case 4:
            maxNumVal = 15;
            sol = Math.floor(Math.random() * maxNumVal + 5);
            num = Math.floor(Math.random() * maxNumVal + 5);
            question = ((sol) + " * " + num);
            sol = sol * num;
            document.getElementById("question").innerHTML = question;
            break;
        case 5:

            maxNumVal = 10;

            numCount = Math.floor(Math.random() * 2 + 2);
            ranNumArr.push(Math.floor(Math.random() * maxNumVal + 2))
            for (let i = 1; i < numCount; i++) {
                ranNumArr.push(Math.floor(Math.random() * maxNumVal + 2));
            }
            sol = ranNumArr.shift();
            question = "" + sol;
            for (let i = 0; i < numCount - 1; i++) {
                num = ranNumArr.shift();
                question = question + " * " + num;
                sol *= num;
            }
            document.getElementById("question").innerHTML = question;
            break;
        case 6:
            maxNumVal = 15;
            sol = Math.floor(Math.random() * maxNumVal + 5);
            num = Math.floor(Math.random() * maxNumVal + 5);
            question = ((num * sol) + " / " + num);
            num = Math.floor(Math.random() * maxNumVal + 5);
            question = num + " * " + question;
            sol *= num;
            document.getElementById("question").innerHTML = question;
            break;
    }
}

function checkAnswer() {
    ans = parseInt(document.getElementById("num").value)
    document.getElementById("num").value = "";
    maxScore++;
    if (ans === sol) {
        jump();
        jump();
        score++;
    }

    document.getElementById("scoreVal").innerHTML = score + "/" + maxScore;
    startGame();
}
let isJumping = false;
function jump() {
    if (isJumping) return;
    isJumping = true;

    const character = document.getElementById("monika");
    const character2 = document.getElementById("sayori");
    const character3 = document.getElementById("natsuki");
    const character4 = document.getElementById("yuri");

    character.src = "assets/m_sticker_2.png";
    character2.src = "assets/s_sticker_2.png";
    character3.src = "assets/n_sticker_2.png";
    character4.src = "assets/y_sticker_2.png";
    character.style.animationName = "jump";
    character2.style.animationName = "jump";
    character3.style.animationName = "jump";
    character4.style.animationName = "jump";
    setTimeout(() => {
        character.src = "assets/m_sticker_1.png";
        character2.src = "assets/s_sticker_1.png";
        character3.src = "assets/n_sticker_1.png";
        character4.src = "assets/y_sticker_1.png";
        character.style.animation = "";
        character2.style.animation = "";
        character3.style.animation = "";
        character4.style.animation = "";
        character.style.transform = "translateY(0)";
        character2.style.transform = "translateY(0)";
        character3.style.transform = "translateY(0)";
        character4.style.transform = "translateY(0)";
        isJumping = false;
    }, 500);

}
initGame();