let url = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple';

startBtn =  document.querySelector('#play');
highScroreBtn =  document.querySelector('#high-score');

var questionClassArray =[];
var playerClassArray = [];
var globalQuesdata;

mainContainer = document.querySelector('#main-container');

class ChoiceText {
    constructor(q,correctAnswer, wrongAnswer){
        this.q = q;
        this.correctAnswer =correctAnswer;
        this.options = [correctAnswer,...wrongAnswer];
    }
}

class Player {
    constructor(name,score){
        this.name = '';
        this.score = 0;
    }
}

var questionCount = {
    'count': 1,
};

checkanswer = (questionObject, selectedOption) => {
    if (selectedOption === questionObject.correctAnswer){
        tempPlayer.score += 10;
        questionCount.count = questionCount.count + 1;
    } else {
        questionCount.count = questionCount.count + 1;
    }

    if (questionCount.count<=10){
        console.log('i am here')
        console.log(questionCount);
        displayHTML(questionClassArray[questionCount.count - 1], tempPlayer, questionCount.count);
    } else {
        console.log('it is the end')
    }

    console.log(tempPlayer);
}

displayHTML = (questionObject, player) =>{
    console.log('hh', questionObject);
    mainContainer.innerHTML =  `     <div class="row h-100 align-items-center">` +
`    <div class="col-sm-12 col-lg-6 offset-lg-3 display-col">` +
`        <div class="row">`+
`            <div class="col-6">`+
`            <p>Question ${questionCount.count}/10</p>`+
`           <div class="progress w-50">`+
`                <div class="progress-bar my-progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="prog-inner-bar"></div>`+
`            </div>`+
`            </div>`+
`           <div class="col-6 justify-content-end">`+
`            <p>Score</p>`+
`            <p>${player.score}</p>`+
`            </div>`+
`        </div>`+
`        <div class="row">`+
`            <div class="col-12">`+
`            <p class="question"> ${questionObject.q}</p>`+
`            <p class="option-p"><button class="btn btn-primary option-btn" value = "${questionObject.options[0]}">A</button>${questionObject.options[0]}</p>`+
`            <p class="option-p"><button class="btn btn-primary option-btn" value = "${questionObject.options[1]}">B</button>${questionObject.options[1]}</p>`+
`            <p class="option-p"><button class="btn btn-primary option-btn" value = "${questionObject.options[2]}">C</button>${questionObject.options[2]}</p>`+
`            <p class="option-p"><button class="btn btn-primary option-btn" value = "${questionObject.options[3]}">D</button>${questionObject.options[3]}</p>`+
`            </div>`+
`        </div>`+
`    </div>`+
`</div>`

    optionBtns = document.querySelectorAll('.option-btn').forEach((btn) => {
        btn.addEventListener('click' ,(e)=> {
            console.log(e.target.value);
            checkanswer(questionObject,e.target.value);
        })
    })

}


async function startGame (url) {
    let res =  await fetch(url);
    globalQuesdata = await res.json();

    globalQuesdata.results.forEach((v) => {
        questionClassArray.push(new ChoiceText(v.question, v.correct_answer, v.incorrect_answers))
    });

    tempPlayer = new Player();
    console.log(tempPlayer);
    console.log(questionClassArray);

    questionCount.count = 1;
    console.log(questionCount);

    displayHTML(questionClassArray[questionCount.count - 1], tempPlayer);

}
    

startBtn.addEventListener('click', ()=>{
    startGame(url);
})
