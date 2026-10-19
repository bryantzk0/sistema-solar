document.addEventListener('DOMContentLoaded', () => {

  // Banco de perguntas por níveis de dificuldade
  const questionBank = {
    facil: [
      { question: "Qual é o maior planeta do Sistema Solar?", options: ["Terra", "Júpiter", "Marte", "Saturno"], answer: 1 },
      { question: "Qual planeta é conhecido como o 'Planeta Vermelho'?", options: ["Marte", "Vênus", "Mercúrio", "Netuno"], answer: 0 },
      { question: "O Sol é classificado astrofisicamente como:", options: ["Um planeta", "Um cometa", "Uma estrela", "Um satélite"], answer: 2 },
      { question: "Qual planeta possui anéis exuberantes e bem visíveis?", options: ["Urano", "Saturno", "Terra", "Vênus"], answer: 1 },
      { question: "Qual é o planeta em que vivemos?", options: ["Marte", "Terra", "Júpiter", "Vênus"], answer: 1 }
    ],
    medio: [
      { question: "Qual é o planeta mais quente do Sistema Solar?", options: ["Mercúrio", "Vênus", "Marte", "Júpiter"], answer: 1 },
      { question: "O movimento que a Terra faz ao redor do Sol chama-se:", options: ["Rotação", "Translação", "Gravidade", "Precessão"], answer: 1 },
      { question: "Quanto tempo a luz do Sol leva para chegar até a Terra?", options: ["Aproximadamente 8 minutos", "1 hora", "Instantaneamente", "24 horas"], answer: 0 },
      { question: "Qual é o único satélite natural da Terra?", options: ["Fobos", "Europa", "Lua", "Titã"], answer: 2 },
      { question: "Qual é o planeta mais próximo do Sol?", options: ["Vênus", "Terra", "Mercúrio", "Marte"], answer: 2 }
    ],
    dificil: [
      { question: "Qual planeta do Sistema Solar tem o dia mais curto (rotação rápida)?", options: ["Terra", "Júpiter", "Marte", "Netuno"], answer: 1 },
      { question: "Em qual planeta está localizado o Monte Olimpo, o maior vulcão do Sistema Solar?", options: ["Vênus", "Marte", "Mercúrio", "Júpiter"], answer: 1 },
      { question: "Qual destes planetas é classificado como um 'gigante gelado'?", options: ["Saturno", "Júpiter", "Urano", "Marte"], answer: 2 },
      { question: "O cinturão de asteroides principal fica localizado entre quais planetas?", options: ["Terra e Marte", "Marte e Júpiter", "Júpiter e Saturno", "Vênus e Terra"], answer: 1 },
      { question: "O movimento de rotação da Terra em torno do seu próprio eixo leva cerca de:", options: ["12 horas", "24 horas", "365 dias", "30 dias"], answer: 1 }
    ],
    expert: [
      { question: "Qual é a velocidade aproximada da luz no vácuo?", options: ["150.000 km/s", "300.000 km/s", "500.000 km/s", "1.000.000 km/s"], answer: 1 },
      { question: "Qual planeta gira em sentido horário em torno de si mesmo (rotação retrógrada)?", options: ["Vênus", "Marte", "Júpiter", "Netuno"], answer: 0 },
      { question: "Qual é a maior lua de todo o Sistema Solar?", options: ["Titã", "Ganimedes", "Calisto", "Ío"], answer: 1 },
      { question: "Qual destas regiões marca o limite de influência gravitacional do Sol?", options: ["Cinturão de Kuiper", "Nuvem de Oort", "Heliopausa", "Nébula de Órion"], answer: 1 },
      { question: "Qual planeta possui o menor período de translação (ano mais curto)?", options: ["Mercúrio", "Vênus", "Marte", "Plutão"], answer: 0 }
    ]
  };

  // Estado do Jogo
  let score = 0;
  let currentLevel = "facil";
  let currentQuestionObj = null;
  let askedHistory = new Set();

  // Controle do Cronômetro
  let timerInterval = null;
  let timeLeft = 15;
  const timePerLevel = { facil: 15, medio: 12, dificil: 10, expert: 8 };

  // Elementos do DOM
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const endScreen = document.getElementById('end-screen');

  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');

  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const scoreDisplay = document.getElementById('score');
  const levelDisplay = document.getElementById('level-display');
  const timerDisplay = document.getElementById('timer');
  const timerContainer = document.getElementById('timer-display');
  const feedbackDisplay = document.getElementById('feedback');
  const finalScoreDisplay = document.getElementById('final-score');

  // Eventos de Clique
  if (startBtn) startBtn.addEventListener('click', startGame);
  if (restartBtn) restartBtn.addEventListener('click', startGame);

  function startGame() {
    score = 0;
    currentLevel = "facil";
    askedHistory.clear();
    
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    nextTurn();
  }

  function updateLevel() {
    if (score < 30) {
      currentLevel = "facil";
      levelDisplay.textContent = "Nível: 🟢 Fácil";
    } else if (score < 70) {
      currentLevel = "medio";
      levelDisplay.textContent = "Nível: 🟡 Médio";
    } else if (score < 120) {
      currentLevel = "dificil";
      levelDisplay.textContent = "Nível: 🟠 Difícil";
    } else {
      currentLevel = "expert";
      levelDisplay.textContent = "Nível: 🔴 Expert";
    }
  }

  function getRandomQuestion() {
    const pool = questionBank[currentLevel];
    let available = pool.filter(q => !askedHistory.has(q.question));
    
    if (available.length === 0) {
      pool.forEach(q => askedHistory.delete(q.question));
      available = pool;
    }
    
    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex];
    askedHistory.add(selected.question);
    
    return selected;
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = timePerLevel[currentLevel];
    if (timerDisplay) timerDisplay.textContent = timeLeft;
    if (timerContainer) timerContainer.classList.remove('timer-warning');

    timerInterval = setInterval(() => {
      timeLeft--;
      if (timerDisplay) timerDisplay.textContent = timeLeft;

      if (timeLeft <= 3 && timerContainer) {
        timerContainer.classList.add('timer-warning');
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeOut();
      }
    }, 1000);
  }

  function timeOut() {
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    feedbackDisplay.textContent = "⌛ O tempo acabou! Fim de jogo. ❌";
    feedbackDisplay.style.color = "#c62828";

    setTimeout(() => {
      endGame();
    }, 1500);
  }

  function nextTurn() {
    updateLevel();
    feedbackDisplay.textContent = "";
    scoreDisplay.textContent = `Pontos: ${score}`;
    
    currentQuestionObj = getRandomQuestion();
    questionText.textContent = currentQuestionObj.question;
    
    optionsContainer.innerHTML = "";
    currentQuestionObj.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      btn.textContent = option;
      btn.addEventListener('click', () => selectAnswer(index));
      optionsContainer.appendChild(btn);
    });

    startTimer();
  }

  function selectAnswer(selectedIndex) {
    clearInterval(timerInterval);
    
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestionObj.answer) {
      const pointsPerLevel = { facil: 10, medio: 15, dificil: 20, expert: 25 };
      const earned = pointsPerLevel[currentLevel];
      score += earned;
      
      feedbackDisplay.textContent = `¡Acertou! +${earned} pts 🚀`;
      feedbackDisplay.style.color = "#2e7d32";

      setTimeout(() => {
        nextTurn();
      }, 1200);
    } else {
      feedbackDisplay.textContent = "Fim de jogo! Resposta incorreta. ❌";
      feedbackDisplay.style.color = "#c62828";

      setTimeout(() => {
        endGame();
      }, 1500);
    }
  }

  function endGame() {
    clearInterval(timerInterval);
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = `Sua jornada espacial terminou com ${score} pontos!`;
  }

});
