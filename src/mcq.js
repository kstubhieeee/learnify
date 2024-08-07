document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const questionNumber = document.getElementById("question-number");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options");
  const pageNumbers = document.querySelectorAll(".page-number");
  const timerElement = document.querySelector(".time");
  const submitButton = document.querySelector(".submit-button");
  const finalScoreContainer = document.querySelector(".final-score");
  const finalScoreElement = document.getElementById("final-score");

  let currentQuestion = 1;
  let timeRemaining = 30;
  let score = 0;
  let answeredQuestions = Array(10).fill(false);

  const questions = [
    "Which of the following is a popular programming language for developing multimedia webpages?",
    "What does HTML stand for?",
    "What is the capital of France?",
    "Who is the author of 'Harry Potter'?",
    "What is the square root of 64?",
    "What is the chemical symbol for water?",
    "What is the largest planet in our solar system?",
    "What is the speed of light?",
    "What is the smallest prime number?",
    "What is the hardest natural substance on Earth?",
  ];

  const options = [
    ["A. COBOL", "B. HTML", "C. CSS", "D. JavaScript"],
    [
      "A. Hyper Text Markup Language",
      "B. High Text Markup Language",
      "C. Hyper Tabular Markup Language",
      "D. None of these",
    ],
    ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
    [
      "A. J.R.R. Tolkien",
      "B. J.K. Rowling",
      "C. George R.R. Martin",
      "D. Stephen King",
    ],
    ["A. 6", "B. 7", "C. 8", "D. 9"],
    ["A. H2O", "B. O2", "C. CO2", "D. NaCl"],
    ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"],
    [
      "A. 299,792 km/s",
      "B. 150,000 km/s",
      "C. 1,080,000 km/h",
      "D. 300,000 km/h",
    ],
    ["A. 1", "B. 2", "C. 3", "D. 4"],
    ["A. Gold", "B. Iron", "C. Diamond", "D. Graphite"],
  ];

  const correctAnswers = [
    "B. HTML",
    "A. Hyper Text Markup Language",
    "C. Paris",
    "B. J.K. Rowling",
    "C. 8",
    "A. H2O",
    "C. Jupiter",
    "A. 299,792 km/s",
    "A. 1",
    "C. Diamond",
  ];

  function updateQuestion() {
    questionNumber.textContent = currentQuestion;
    questionText.textContent = questions[currentQuestion - 1];
    optionsContainer.innerHTML = "";
    options[currentQuestion - 1].forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(button, index);
      optionsContainer.appendChild(button);
    });
    timeRemaining = 30;
  }

  function checkAnswer(button, index) {
    const selectedOption = button.textContent;
    if (selectedOption === correctAnswers[currentQuestion - 1]) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("incorrect");
      optionsContainer.querySelectorAll("button").forEach((btn, idx) => {
        if (btn.textContent === correctAnswers[currentQuestion - 1]) {
          btn.classList.add("correct");
        }
      });
    }
    answeredQuestions[currentQuestion - 1] = true;
    disableOptions();
  }

  function disableOptions() {
    optionsContainer.querySelectorAll("button").forEach((btn) => {
      btn.disabled = true;
    });
  }

  function enableOptions() {
    optionsContainer.querySelectorAll("button").forEach((btn) => {
      btn.disabled = false;
    });
  }

  function updateTimer() {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerElement.textContent = `00:${String(timeRemaining).padStart(2, "0")}`;
      setTimeout(updateTimer, 1000);
    } else {
      disableOptions();
      if (!answeredQuestions[currentQuestion - 1]) {
        optionsContainer.querySelectorAll("button").forEach((btn, idx) => {
          if (btn.textContent === correctAnswers[currentQuestion - 1]) {
            btn.classList.add("correct");
          }
        });
        answeredQuestions[currentQuestion - 1] = true;
      }
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentQuestion > 1) {
      currentQuestion--;
      updateQuestion();
      enableOptions();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentQuestion < 10) {
      currentQuestion++;
      updateQuestion();
      enableOptions();
    }
  });

  pageNumbers.forEach((button) => {
    button.addEventListener("click", () => {
      currentQuestion = parseInt(button.getAttribute("data-number"));
      updateQuestion();
      enableOptions();
    });
  });

  submitButton.addEventListener("click", () => {
    finalScoreElement.textContent = score;
    finalScoreContainer.style.display = "block";
  });

  updateQuestion();
  updateTimer();
});
