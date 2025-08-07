const questions = [
  {
    question: "Hola means?",
    options: ["Hello", "Goodbye", "Please"],
    correct: "Hello"
  },
  {
    question: "Gracias means?",
    options: ["Thanks", "Sorry", "Welcome"],
    correct: "Thanks"
  },
  {
    question: "Adiós means?",
    options: ["Hello", "Goodbye", "Yes"],
    correct: "Goodbye"
  }
];

let currentQuestion = 0;
let xp = 0;
let hearts = 3;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsContainer = document.querySelector(".options");
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn);
    if (option === q.correct) {
      btn.setAttribute("data-correct", "true");
    }
    optionsContainer.appendChild(btn);
  });

  document.getElementById("feedback").innerText = "";
  document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(button) {
  const isCorrect = button.getAttribute("data-correct") === "true";
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    feedback.innerText = "✅ Correct!";
    xp += 10;
  } else {
    feedback.innerText = "❌ Incorrect!";
    hearts -= 1;
  }

  updateStats();

  // Disable all buttons
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach(btn => btn.disabled = true);

  // Show next button
  document.getElementById("next-btn").style.display = "inline-block";

  // End if hearts gone
  if (hearts === 0) {
    setTimeout(() => {
      alert("Game Over! You ran out of hearts.");
      window.location.href = "dashboard.html";
    }, 1000);
  }
}

function loadNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    alert("Lesson complete! Your XP: " + xp);
    window.location.href = "dashboard.html";  

  }
}

function updateStats() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("hearts").innerText = "❤️".repeat(hearts);
}

// Load first question
window.onload = loadQuestion;
