* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif;
}

body {
  background: linear-gradient(135deg, #0d1b2a, #1b263b, #415a77);
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  color: #ffca28;
  font-size: 2rem;
  margin-bottom: 5px;
}

header p {
  color: #e0e0e0;
  font-size: 1.1rem;
}

.card {
  background-color: #ffffff;
  color: #333333;
  border-radius: 15px;
  padding: 25px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.hidden {
  display: none !important;
}

#game-info {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  color: #1b263b;
  margin-bottom: 20px;
  background-color: #f0f4f8;
  padding: 10px 15px;
  border-radius: 8px;
}

#question-text {
  font-size: 1.25rem;
  margin-bottom: 20px;
  color: #0d1b2a;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.btn, .option-btn {
  background-color: #ff7043;
  color: white;
  border: none;
  padding: 14px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.1s, background-color 0.2s;
}

.btn:hover {
  background-color: #f4511e;
  transform: scale(1.03);
}

.option-btn {
  background-color: #42a5f5;
  text-align: left;
}

.option-btn:hover:not(:disabled) {
  background-color: #1e88e5;
  transform: scale(1.02);
}

.option-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.feedback-text {
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  min-height: 28px;
}

footer {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #e0e0e0;
}

/* Adaptabilidade para telas pequenas */
@media (max-width: 480px) {
  .card {
    padding: 18px;
  }
  header h1 {
    font-size: 1.5rem;
  }
  #question-text {
    font-size: 1.1rem;
  }
}
