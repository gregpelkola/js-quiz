var preGame = document.getElementById("pre-game");
var game = document.getElementById("game");
var gameEnd = document.getElementById("game-end");
var hiScore = document.getElementById("hi-score");

var hiButton = document.getElementById("hi");
var backButton = document.getElementById("back");

var timeEl = document.getElementById("timer");
var timeLeft = 90;


hiButton.addEventListener("click", viewHiScore);
backButton.addEventListener("click", function () {
    document.location.reload();
});

function setTime() {
   var timerInterval = setInterval(function() {
      timeLeft--;
      timeEl.textContent = timeLeft + " seconds left";
      if(timeLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }


function startGame() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-active");
}

function endGame() {
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-active");
}

function viewHiScore() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-inactive");
    hiScore.setAttribute("class", "is-active");
}

const questions = [
    {
        question: "Commonly used data types DO not include",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false},
        ]
    },
    {
        question: "The conditon in an if/else statement is enclosed with",
        answers: [
            {text: "parenthesis", correct: true},
            {text: " square brackets", correct: false},
            {text: "curly brack", correct: false},
            {text: "quotes", correct: false},
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store",
        answers: [
            {text: "numbers and strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above", correct: true},
        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
        answers: [
            {text: "commas", correct: false},
            {text: "curly brackets", correct: false},
            {text: "parenthesis", correct: false},
            {text: "quotes", correct: true},
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        answers: [
            {text: "console.log", correct: true},
            {text: "for loops", correct: false},
            {text: "JavaScript", correct: false},
            {text: "Terminal/Bash", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
//if (selected == myQuestions[5].correctAnswer){
   // alert("Correct!")
//}else{
   // alert("Wrong! Try again.")
//}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 90;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild) 
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        timeLeft -= 25;
    
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
      showScore();  
    }
}



startBtn.addEventListener('click', function() {
    setTime();
})

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
