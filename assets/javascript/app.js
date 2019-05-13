const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "Who was the First President?",
        imgSrc : "img/1.png",
        choiceA : "George Washington",
        choiceB : "Benjamin Franklin",
        choiceC : "That one guy from Main",
        correct : "A",
    },{
        question : "Who discovered America",
        imgSrc : "img/3.png",
        choiceA : "My neighbors",
        choiceB : "Christopher Columbus",
        choiceC : "Sam Adams",
        correct : "B",
    },{
        question : "Which Coding Bootcamp has the best teacher and TAs?",
        imgSrc : "img/2.png",
        choiceA : "Cohort 13",
        choiceB : "Cohort 10",
        choiceC : "Idk man",
        correct : "A",
    }
];
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
} 
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion;
        qIndex++){
            progress.innerHTML += "<div class='prog' id="+
            qIndex +"></div>";
        }

}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();

    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}
function answerIsCorrect(){

    document.getElementById(runningQuestion).style.background = "#0f0";
}
function answerIsWrong(){

    document.getElementById(runningQuestion).style.background = "#f00";
}
function scoreRender(){
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * score/questions.length);
    let img=(scorePerCent >= 80) ? "img/5.png" :
            (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
            (scorePerCent >= 20) ? "img/2.png" :
            "img/1.png";
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML = "<p>"+ scorePerCent +"%</p>";
}