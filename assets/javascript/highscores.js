const bragList = document.getElementById('bragList');
const clearBtn = document.getElementById('clearBtn');
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // getting our strings from the array, or blan array in case there is nothing there.


//map takes an array of items and converts the items into something else. In this case we are making <li>'s
bragList.innerHTML = highScores
.map(score => {
    return `<li class="highscoresListItem">${score.name} - ${score.score}</li>`; //using template literal again with backticks
})
//this returns a string of <li>'s with the object values score and name.
.join("");// join add the strings together (joins the <li>'s together)

//function to clear the localStorage and remove the ul (bragList)
const clearScore = () => {
    localStorage.clear()
    while (bragList.firstChild) {
    bragList.removeChild(bragList.firstChild)
    }
};

