const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const scoreText = document.getElementById('score');


const timeText = document.getElementById("finalCountdown");

let secondsLeft = 75;
const scoreNerf = 15;

let currentQuestion = {};
let score = 0;
let availableQuestions = []; 

let questions = [
    {//each question wil be an object consisting of the following:
        "question": "What does HTML stand for?", //this is the question.
        "option1": "Hyper Text Markup Language", //option
        "option2": "Hyper Text Mode Language", //option
        "option3": "Hyper Text Market Language", // option
        "option4": "Hyper Text Markup Lookup", //option
        "answer": 1 //this is the number in the option that will match up with the answer
    },
    {
        "question": "How do you define a variable in js?",
        "option1": "const x - y",
        "option2": "const x equals y",
        "option3": "const x = y",
        "option4": "const x is y",
        "answer": 3
    },
    {
        "question": " How do you write an alert?",
        "option1": "msgBox('Hello World');",
        "option2": "alertBox('Hello World');",
        "option3": "msg('Hello World');",
        "option4": "alert('Hello World');",
        "answer": 4
    },
    {
        "question": "Placeholder - the answer is 4",
        "option1": "answer 1",
        "option2": "answer 2",
        "option3": "answer 3",
        "option4": "answer 4",
        "answer": 4
    },
    {
        "question": "Placeholder - the answer is 2",
        "option1": "answer 1",
        "option2": "answer 2",
        "option3": "answer 3",
        "option4": "answer 4",
        "answer": 2
    }
];

startGame = () => {
    availableQuestions = [...questions]; //the three dots is a spread operator.
    //it takes the [questions] array and spreads it out into a new array. Now called availableQuestions.
    setTime(); //call function that starts timer
    getNewQuestion();
};

//function to get a new question.
getNewQuestion = () => {
   
    //randomize a question from the array. availableQuestions.length will run through all questions in array
    const questionList = Math.floor(Math.random() * availableQuestions.length);
    //questionList is a list of the current available questions, this will not include questions already used. 
    currentQuestion = availableQuestions[questionList];

    question.innerText = currentQuestion.question;

    options.forEach(option => {
        //this is how to access the custom dataset attribute in the API, we are extracting the number from it
        const number = option.dataset["number"];
        //out of the currentQuesion we want to extract the option, we use the number associated with the option
        //["option" + number] will be the answers associated with the question in our array ie; option1 option2...

        //then displays text in the option associated with that number: 
        option.innerText = currentQuestion["option" + number];
    });

    availableQuestions.splice(questionList, 1);

};

//Event Listeners
options.forEach(option => {
    option.addEventListener("click", e => {
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];

        let classCorrect = 'correct';
        if (selectedAnswer != currentQuestion.answer) {
            classCorrect = 'incorrect'; 
        };

        selectedOption.parentElement.classList.add(classCorrect);
        console.log(classCorrect);

        if (classCorrect === 'incorrect') {
            secondsLeft -= scoreNerf;
        }

        //delay set so that green or red coloring will show if correct/incorrect
    setTimeout(() => { 
            selectedOption.parentElement.classList.remove(classCorrect);
            getNewQuestion();
        }, 100);
    });

});

setTime = () => {
    const timerInterval = setInterval(function () {
        secondsLeft--;
        timeText.innerText = secondsLeft;

        if (secondsLeft === 0 || availableQuestions.length === 0) {
            clearInterval(timerInterval);
            return window.location.assign("end.html");
            
        }
    }, 1000);
};
scoreText = timerInterval;



//call function to start quiz.
startGame();