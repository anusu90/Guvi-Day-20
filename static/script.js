let url = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple';

startBtn =  document.querySelector('#play');
highScroreBtn =  document.querySelector('#high-score');

questionClassArray =[];
playerClassArray = [];

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

checkanswer = (questionObject, selectedOption) => {
    if (selectedOption === questionObject.correctAnswer){
        tempPlayer.score += 10;
    }

    console.log(tempPlayer);
}

displayHTML = (questionObject, player, questionCount) =>{
    console.log('hh', questionObject);
    mainContainer.innerHTML =  `     <div class="row h-100 align-items-center">` +
`    <div class="col-sm-12 col-lg-6 offset-lg-3 display-col">` +
`        <div class="row">`+
`            <div class="col-6">`+
`            <p>Question ${questionCount}/10</p>`+
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

}


async function getQuestions (url) {
    let res =  await fetch(url);
    let quesData = await res.json();

    quesData.results.forEach((v) => {
        questionClassArray.push(new ChoiceText(v.question, v.correct_answer, v.incorrect_answers))
    });

    let questionCount = 1;

    tempPlayer = new Player();
    console.log(tempPlayer);
    console.log(questionClassArray);

    

    displayHTML(questionClassArray[0], tempPlayer, questionCount);

    optionBtns = document.querySelectorAll('.option-btn').forEach((btn) => {
        btn.addEventListener('click' ,(e)=> {
            console.log(e.target.value);
            checkanswer(questionClassArray[0],e.target.value);
        })
    })


    sessionStorage.setItem('myQuestions', JSON.stringify(questionClassArray))
}

startBtn.addEventListener('click', ()=>{
    getQuestions(url);
})