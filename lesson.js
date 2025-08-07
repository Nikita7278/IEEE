let xp = 0;
let hearts = 3;

function showModeSelection() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('mode-selection').classList.remove('hidden');
}

function startMode(mode) {
  document.getElementById('mode-selection').classList.add('hidden');
  document.getElementById('lesson').classList.remove('hidden');
  document.getElementById('lesson-title').textContent = `🧠 Lesson Mode: ${modeDescription(mode)}`;
  document.getElementById(`${mode}-question`).classList.remove('hidden');
}

function modeDescription(mode) {
  switch(mode) {
    case 'mcq': return 'Multiple Choice'; 
    case 'fill': return 'Fill in the Blanks'; 
    case 'drag': return 'Drag and Drop'; 
  }
}

function checkAnswer(button, isCorrect) {
  const feedback = isCorrect ? 'correct' : 'incorrect';
  button.classList.add(feedback);
  playSound(isCorrect);
  updateXP(isCorrect);
}

let currentQuestion = 0;
const mcqQuestions = document.querySelectorAll('[id^="mcq-question"]');

function showNextQuestion() {
  if (currentQuestion < mcqQuestions.length) {
    mcqQuestions[currentQuestion].classList.remove('hidden');
  }
}
function checkAnswer(button, isCorrect) {
  const feedback = isCorrect ? 'correct' : 'incorrect';
  button.classList.add(feedback);
  playSound(isCorrect);
  updateXP(isCorrect);

  // Hide current question and show next
  mcqQuestions[currentQuestion].classList.add('hidden');
  currentQuestion++;
  showNextQuestion();
}




function checkFillBlank() {
  const answer = document.getElementById('fillBlank').value.trim().toLowerCase();
  const correct = answer === "3" || answer === "three";
  playSound(correct);
  updateXP(correct);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  const data = document.getElementById("dragThree");
  ev.target.appendChild(data);
  playSound(true);
  updateXP(true);
}

function updateXP(correct) {
  if (correct) {
    xp += 10;
    document.getElementById('xp').innerText = `XP: ${xp}`;
  } else {
    hearts -= 1;
    document.getElementById('hearts').innerText = "❤️".repeat(hearts);
    if (hearts <= 0) alert("Game Over! Try again.");
  }
}

function playSound(correct) {
  const sound = correct ? document.getElementById('correct-sound') : document.getElementById('incorrect-sound');
  sound.play();
}
