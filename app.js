const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsbtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


// lIst of word for game
const words =[
    'sight',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',    
]

//Init word
let randomWord;

//Init score   
let score = 0;

//Init time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null 
? localStorage.getItem('difficulty') : 'medium'; 


// Set difficulty select value

difficultySelect.value = localStorage.getItem('difficulty') !== null 
? localStorage.getItem('difficulty') : 'medium'; 

// Text focus on start
text.focus();


// Time counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM

function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

if(time === 0){
    clearInterval(timeInterval);
    
    //End Game 
    gameOver();
}
}
//Game over, show end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;

    endgameEl.style.display = 'flex';
}
   
addWordToDOM();

// Event listeners

text.addEventListener('input', e =>{
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear 
        e.target.value = ''; 

        if(difficulty === 'hard'){
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        }else {
            time+= 5;
        }

        updateTime();
    }
})
// Settings btn click

settingsbtn.addEventListener('click', () => 
settings.classList.toggle('hide'));

// Settings Select

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})