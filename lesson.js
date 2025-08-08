let xp = 0;
let hearts = 3;

let currentQuestion = 0;
let currentMode = '';
let fillQuestions = [];
let dragQuestions = [];
let mcqQuestions = [];

function showModeSelection() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('mode-selection').classList.remove('hidden');
}

function startMode(mode) {
  currentMode = mode;
  document.getElementById('mode-selection').classList.add('hidden');
  document.getElementById('lesson').classList.remove('hidden');
  document.getElementById('lesson-title').textContent = `🧠 Lesson Mode: ${modeDescription(mode)}`;

  currentQuestion = 0;

  if (mode === 'mcq') {
    mcqQuestions = Array.from(document.querySelectorAll('[id^="mcq-question"]'));
    showQuestion(mcqQuestions, currentQuestion);
  } else if (mode === 'fill') {
    fillQuestions = Array.from(document.querySelectorAll('[id^="fill-question"]'));
    showQuestion(fillQuestions, currentQuestion);
  } else if (mode === 'drag') {
    dragQuestions = Array.from(document.querySelectorAll('[id^="drag-question"]'));
    showQuestion(dragQuestions, currentQuestion);
  }
}

function modeDescription(mode) {
  switch (mode) {
    case 'mcq': return 'Multiple Choice';
    case 'fill': return 'Fill in the Blanks';
    case 'drag': return 'Drag and Drop';
    default: return '';
  }
}

function showQuestion(questionSet, index) {
  questionSet.forEach(q => q.classList.add('hidden'));
  if (questionSet[index]) {
    questionSet[index].classList.remove('hidden');
  }
}

function goToNext() {
  let questionSet;
  if (currentMode === 'mcq') questionSet = mcqQuestions;
  else if (currentMode === 'fill') questionSet = fillQuestions;
  else if (currentMode === 'drag') questionSet = dragQuestions;

  if (!questionSet) return;

  // Hide current
  if (questionSet[currentQuestion]) {
    questionSet[currentQuestion].classList.add('hidden');
  }

  // Optional: play next sound
  const nextSound = document.getElementById('next-sound');
  if (nextSound) nextSound.play();

  // Show next
  currentQuestion++;
  showQuestion(questionSet, currentQuestion);
}

function checkAnswer(button, isCorrect) {
  const feedback = isCorrect ? 'correct' : 'incorrect';
  button.classList.add(feedback);
  playSound(isCorrect);
  updateXP(isCorrect);

  const parent = button.parentElement;
  const nextButton = parent.querySelector('.next-btn');
  if (nextButton) nextButton.classList.remove('hidden');
}

function checkFillBlank(inputId, correctAnswers) {
  const inputField = document.getElementById(inputId);
  const answer = inputField.value.trim().toLowerCase();

  if (answer === '') return;

  const isCorrect = correctAnswers.includes(answer);
  playSound(isCorrect);
  updateXP(isCorrect);

  inputField.classList.remove("correct", "incorrect");
  inputField.classList.add(isCorrect ? "correct" : "incorrect");

  const nextButton = inputField.parentElement.querySelector('.next-btn');
  if (nextButton) nextButton.classList.remove('hidden');
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

  const nextButton = ev.target.closest('.question').querySelector('.next-btn');
  if (nextButton) nextButton.classList.remove('hidden');
}

function updateXP(correct) {
  if (correct) {
    xp += 10;
    document.getElementById('xp').innerText = `XP: ${xp}`;
  } else {
    hearts -= 1;
    document.getElementById('hearts').innerText = "❤".repeat(hearts);
    if (hearts <= 0) alert("Game Over! Try again.");
  }
}

function playSound(correct) {
  const sound = correct
    ? document.getElementById('correct-sound')
    : document.getElementById('incorrect-sound');

  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.warn("Audio play failed:", e));
  }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    ev.target.textContent = draggedElement.textContent;
}