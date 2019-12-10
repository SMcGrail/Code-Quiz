//defining variables like a boss
const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const scoreText = document.getElementById('score');

let currentQuestion = {}; //{} this will be an object
let acceptingAnswers = false; //to give a delay between selecting answers, when we are ready to acceot answers we can redefine this as true
let score = 0; // score counter
let availableQuestions = []; //define empty array of available questions. it is a copy of the full question set array
//this is so I can take questions out of the availableQuestions array as we use them so that it is a new question every time.

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
        "question": "This is the question?",
        "option1": "answer 1",
        "option2": "answer 2",
        "option3": "answer 3",
        "option4": "answer 4",
        "answer": 4
    },
    {
        "question": "This is the question?",
        "option1": "answer 1",
        "option2": "answer 2",
        "option3": "answer 3",
        "option4": "answer 4",
        "answer": 4
    },
    {
        "question": "This is the question?",
        "option1": "answer 1",
        "option2": "answer 2",
        "option3": "answer 3",
        "option4": "answer 4",
        "answer": 4
    },
    {
        "question": "This is the question?",
        "option1": "answer 1",
        "option2": "answer 2",
        "option3": "answer 3",
        "option4": "answer 4",
        "answer": 4
    }
];

startGame = () => {
    availableQuestions = [...questions]; //the three dots is a spread operator.
    //it takes the [questions] array and spreads it out into a new array. Now called availableQuestions.
    //creating a separate array so that I can remove questions as they are used so that the same question is not repeated multiple times in one instance of the quiz. 
    //console.log(availableQuestions); //so... that's the new array created using the spread operator. cool.

    getNewQuestion();
};

//function to get a new question... obviously.
getNewQuestion = () => {
    //if statement that stops the quiz if all of the questions have been answered.
    if (availableQuestions.length === 0) {
        //if above conditions are met, user is taken to the end page.
        return window.location.assign("end.html");
    }
    //randomize a question from the array. availableQuestions.length will run through all questions in array
    const questionList = Math.floor(Math.random() * availableQuestions.length);
    //questionList is a list of the current available questions, this will not include questions already used. 

    //to get the current question from the array
    //currentQuestion is the question that is currently displaying in the quiz
    //it will pull a question from the questionList array.
    currentQuestion = availableQuestions[questionList];

    //innerText is almost the same as textContent, it sets or returns the text of a specific element.
    //in this case I am setting the innerText of question in the HTML <h2> tag on the main page. 
    //it is displaying the currentQuestion defined in the line above. 
    question.innerText = currentQuestion.question;

    //Basically the same thing is happening with the options
    //grab options, forEach will refercne each option in the array, then 
    options.forEach(option => {
        //this is how to access the custom dataset attribute in the API, we are extracting the number from it
        const number = option.dataset["number"];
        //out of the currentQuesion we want to extract the option, we use the number associated with the option
        //["option" + number] will be the answers associated with the question in our array ie; option1 option2...

        //then displays text in the option associated with that number: 
        option.innerText = currentQuestion["option" + number];
    });

    //this will splice the just-used question from our availableQuestions array
    //this is why we made a copy of the questions array, so that we wont be splicing the question from the master array
    //the number 1 tells it what question to cut
    availableQuestions.splice(questionList, 1);

}; //this is the end of the getNEwQuestion function

//adding Event Listeners
options.forEach(option => {
    option.addEventListener("click", e => {
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];

        let classCorrect = 'incorrect'; // set the default value to incorrect
        if (selectedAnswer == currentQuestion.answer) {
            classCorrect = 'correct'; // if the selectedAnswer is equal to the currentQuestion.answer then the 'correct' class is applied
        };

        //the selectedoption is the text that is selected, the pareentElement would be the container box that is selected. 
        //classList.add is adding the classCorrect class to the container element, this will set the class to apply to correct or incorrect
        selectedOption.parentElement.classList.add(classCorrect);
        console.log(classCorrect);

        setTimeout( () => { //setTimeout is built into Javascript. I am using it here to create a delay between questions so that a color can be applied signifying correct ot incorrect
            selectedOption.parentElement.classList.remove(classCorrect);//this is the removal of the class from the container element.
            getNewQuestion();
            }, 150); //200 is the parameter of how long the setTimeout delay is (1000 = 1 second)
        //I set the timer to 150 so that the delay is quick due to the timer.
    });

});

//call function to start quiz.
startGame();