const start = document.getElementById("start");
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const scoreDiv = document.getElementById("scores");
const finalscore = document.getElementById("finalscore");
const navoptions = document.getElementById("navoptions");
const goback = document.getElementById("goback");
const clearscoreboard = document.getElementById("clearscoreboard");
const addMyScore = document.getElementById("addscore");
const buttons = document.getElementById("buttons");

let questions = [{
    question: "Commonly used data types do NOT include:",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "numbers",
    correct: "B"
},{
    question: "What is the syntax for the end of a line of JavaScript?",
    choiceA: "period",
    choiceB: "curly bracket",
    choiceC: "semi-colon",
    correct: "C"
},{
    question: "What is the syntax for a comment in JavaScript?",
    choiceA: "// comment",
    choiceB: "! comment",
    choiceC: "< !--comment-- >",
    correct: "A"
},{
    question: "How do you create a function in JavaScript?",
    choiceA: "function myFunction()",
    choiceB: "function:myFunction()",
    choiceC: "function = myFunction()",
    correct: "A"
},{
    question: "How would you write an if statement that executes if i does NOT equal 2?",
    choiceA: "if (i != 2)",
    choiceB: "if (i == 2)",
    choiceC: "if i != 2",
    correct: "A"
}];

const lastQ = questions.length-1;
let currentQ = 0;
let score = 0;

function startQuiz() {
    start.style.display = "none";
    intro.style.display = "none";
    showQuestion();
    startTimer();
    quiz.style.display = "block";
};

start.addEventListener("click",startQuiz);

function showQuestion() {
    let q = questions[currentQ];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

function checkAnswer(answer) {
    if(answer == questions[currentQ].correct){
        score++;
    }
    else {
    }
    if(currentQ < lastQ) {
        currentQ++;
        showQuestion();
    }
    else {
        showScore();
    }
};

function showScore() {
    quiz.style.display = "none";
    finalscore.style.display = "block";
    buttons.style.display = "block";
    let scoreDisplay = score / (questions.length) * 100;
    finalscore.style.display ="block";
    finalscore.innerHTML = "<p>" + "Finished! Your final score is: " + scoreDisplay + "%. " + "Would you like to save your score?" + "</p>";
    navoptions.style.display = "block";
}

function startTimer() {
    var timer = 60;
    var interval = setInterval(function(){
      document.getElementById('gametimer').innerHTML=timer + " seconds remaining";
      timer--;
      if (timer === 0){
        clearInterval(interval);
        document.getElementById('gametimer').innerHTML='Done';
      }
    }, 1000);
}

    document.getElementById("addscore").addEventListener("click", function () {
        let userName = prompt("Enter your initials:");
        let scoreDisplay = score / (questions.length) * 100;
        var playerScore = {
            initial: userName,
            score: scoreDisplay
        }
        localStorage.setItem("scores", JSON.stringify(playerScore));
        var getplayerInfo = JSON.parse(localStorage.getItem("scores"));
        scoreDiv.innerHTML += "<p>" + getplayerInfo.initial + " - " + getplayerInfo.score + "%</p>";
    });

document.getElementById("goback").addEventListener("click", function () {
    location.reload();
})
document.getElementById("clearscoreboard").addEventListener("click", function () {
    scoreDiv.innerHTML = "",
    localStorage.clear();
});