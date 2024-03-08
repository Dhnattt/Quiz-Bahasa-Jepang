const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [  {
    "question": "くるま  dalam romanji ditulis?",
    "choice1": "Kuruma",
    "choice2": "Kurumo",
    "choice3": "Kuroma",
    "choice4": "Kurima",
    "answer": 1
  },
  {
    "question": "あした dalam romanji ditulis?",
    "choice1": "Osita",
    "choice2": "Oshita",
    "choice3": "Ashita",
    "choice4": "Asita",
    "answer": 3
  },
  {
    "question": "いちご dalam romanji ditulis?",
    "choice1": "Shichiko",
    "choice2": "Ichiko",
    "choice3": "Shirago",
    "choice4": "Ichigo",
    "answer": 4
  },
  {
    "question": "うさぎ dalam romanji ditulis?",
    "choice1": "Rakigi",
    "choice2": "Usagi",
    "choice3": "Usaki",
    "choice4": "Ukigi",
    "answer": 2
  },
  {
    "question": "おにぎり dalam romanji ditulis?",
    "choice1": "Onigiri",
    "choice2": "Oshikiri",
    "choice3": "Ashigiri",
    "choice4": "Anikiri",
    "answer": 1
  },
  {
    "question": "すいか dalam romanji ditulis?",
    "choice1": "Sushika",
    "choice2": "Shuika",
    "choice3": "Surika",
    "choice4": "Suika",
    "answer": 4
  },
  {
    "question": "ねこ dalam romanji ditulis?",
    "choice1": "Reko",
    "choice2": "Neko",
    "choice3": "Wako",
    "choice4": "Nuko",
    "answer": 2
  },
  {
    "question": "すごい dalam romanji ditulis?",
    "choice1": "Sukoshi",
    "choice2": "Sukoi",
    "choice3": "Sugoi",
    "choice4": "Shugoi",
    "answer": 3
  },
  {
    "question": " おかあさん dalam romanji ditulis?",
    "choice1": "Okaasan ",
    "choice2": "Okaakin",
    "choice3": "Okasan",
    "choice4": "Akasan",
    "answer": 1
  },
  {
    "question": " きって dalam romanji ditulis?",
    "choice1": "Kitsute",
    "choice2": "Kitte",
    "choice3": "Sate",
    "choice4": "Kite",
    "answer": 2
  },
{
  "question": " たべる dalam romanji ditulis?",
  "choice1": "Tahero",
  "choice2": "Taberu",
  "choice3": "Tabero",
  "choice4": "Daberu",
  "answer": 2
},
{
  "question": "むりょう dalam romanji ditulis?",
  "choice1": "Muryou",
  "choice2": "Muriyou",
  "choice3": "Muryuu",
  "choice4": "Shiriyou",
  "answer": 1
},
{
  "question": "がっこう dalam romanji ditulis?",
  "choice1": "Gakkou",
  "choice2": "Gatsuko",
  "choice3": "Gakko",
  "choice4": "Kakkou",
  "answer": 1
},
{
  "question": "くるま dalam romanji ditulis?",
  "choice1": "Kuruma",
  "choice2": "Kurima",
  "choice3": "Kurumo",
  "choice4": "Kuroma",
  "answer": 1
},
{
  "question": "えんぴつ dalam romanji ditulis?",
  "choice1": "Enpitsu",
  "choice2": "Anpitsu",
  "choice3": "Enhisu",
  "choice4": "Enhitsu",
  "answer": 1
},
];

// fetch(
//     'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
// )
//     .then((res) => { 
//         return res.json();
//     })
//     .then((loadedQuestions) => {
//         questions = loadedQuestions.results.map((loadedQuestion) => {
//             const formattedQuestion = {
//                 question: loadedQuestion.question,
//             };

//             const answerChoices = [...loadedQuestion.incorrect_answers];
//             formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
//             answerChoices.splice(
//                 formattedQuestion.answer - 1,
//                 0,
//                 loadedQuestion.correct_answer
//             );

//             answerChoices.forEach((choice, index) => {
//                 formattedQuestion['choice' + (index + 1)] = choice;
//             });

//             return formattedQuestion;
//         });

//         startGame();
//     })
//     .catch((err) => {
//         console.error(err);
//     }); 

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();