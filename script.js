const questions = [
    {
        question: "What is the origin of the term 'pedagogy'?",
        answers: [
            { text: "Latin", correct: false},
            { text: "Greek", correct: true},
            { text: "Arabic", correct: false},
            { text: "Sanskrit", correct: false}
        ]
    },
    {
        question: "Who proposed the theory of multiple intelligences?",
        answers: [
            { text: "Jean Piaget", correct: false},
            { text: "Howard Gardner", correct: true},
            { text: "Lev Vygotsky", correct: false},
            { text: "Erik Erikson", correct: false}
        ]
    },
    {
        question: "Which educational psychologist is known for the concept of 'Zone of Proximal Development'?",
        answers: [
            { text: "B.F. Skinner", correct: false},
            { text: "Maria Montessori", correct: false},
            { text: "Lev Vygotsky", correct: true},
            { text: "Jerome Bruner", correct: false}
        ]
    },
    {
        question: "In Bloom's Taxonomy, which level of learning involves the ability to analyze information and draw conclusions?",
        answers: [
            { text: "Remembering", correct: false},
            { text: "Understanding", correct: false},
            { text: "Applying", correct: false},
            { text: "Analyzing", correct: true}
        ]
    },
    {
        question: "Which of the following is NOT one of the 4Cs of 21st-century skills in education?",
        answers: [
            { text: "Collaboration", correct: false},
            { text: "Creativity", correct: false},
            { text: "Critical Thinking", correct: false},
            { text: "Calculation" , correct: true}
        ]
    }
];

const questionElement = document.getElementById("Q");
const answerbutton = document.getElementById("choices");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.style.display = "none";
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionElement.classList.add("fade-in"); 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer.correct));
        answerbutton.appendChild(button);
    });
    answerbutton.style.display = "block"; 
}

function resetState(){
    questionElement.classList.remove("fade-in"); 
    nextbutton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(correct){
    if(correct){
        score++;
    }
    nextbutton.style.display = "block"; 
}

function goToNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        questionElement.innerHTML = `You got ${score} out of ${questions.length} questions correct.`;
        answerbutton.style.display = "none"; 
        nextbutton.innerHTML = "Restart";
        nextbutton.removeEventListener("click", goToNextQuestion);
        nextbutton.addEventListener("click", startQuiz);
        currentQuestionIndex = 0; 
    }
}

nextbutton.addEventListener("click", goToNextQuestion);

startQuiz();
