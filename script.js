const questions = [
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Terra", "Júpiter", "Marte", "Saturno"],
    answer: 1
  },
  {
    question: "Qual planeta é conhecido como o 'Planeta Vermelho'?",
    options: ["Marte", "Vênus", "Mercúrio", "Netuno"],
    answer: 0
  },
  {
    question: "O Sol é classificado astrofisicamente como:",
    options: ["Um planeta", "Um cometa", "Uma estrela", "Um satélite"],
    answer: 2
  },
  {
    question: "Qual destes planetas possui anéis exuberantes e visíveis?",
    options: ["Urano", "Saturno", "Terra", "Vênus"],
    answer: 1
  },
  {
    question: "O movimento que a Terra faz ao redor do Sol chama-se:",
    options: ["Rotação", "Translação", "Gravidade", "Nutação"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const questionCountDisplay = document.getElementById('question-count');
const feedbackDisplay = document.getElementById('feedback');
const finalScoreDisplay = document.getElementById('final-score');

// Eventos
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  feedbackDisplay.textContent = "";
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionCountDisplay.textContent = `Pergunta ${currentQuestion + 1}/${questions.length}`;
  scoreDisplay.textContent = `Pontos: ${score}`;
  
  optionsContainer.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const correct = questions[currentQuestion].answer;
  if (selectedIndex === correct) {
    score += 10;
    feedbackDisplay.textContent = "¡Acertou! 🎉";
    feedbackDisplay.style.color = "green";
  } else {
    feedbackDisplay.textContent = "Ops, resposta incorreta! ❌";
    feedbackDisplay.style.color = "red";
  }

  // Desativa os botões para evitar duplo clique
  const buttons = optionsContainer.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1200);
}

function endGame() {
  quizScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  finalScoreDisplay.textContent = `Você conquistou ${score} pontos de um total de ${questions.length * 10}!`;
}