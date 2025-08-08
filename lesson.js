let xp = 0;
let hearts = 3;

let currentQuestion = 0;
let currentMode = '';
<<<<<<< HEAD
let currentQuestions = [];

let selectedLanguage = localStorage.getItem('selectedLanguage');


if (selectedLanguage) {
  // Convert to lowercase so it matches keys in questionsData
  selectedLanguage = selectedLanguage.toLowerCase();
}

// ---------- Question Bank ----------
const questionsData = {
  german: {
    mcq: [
      { q: 'What does "Hallo" mean?', options: ['Hello', 'Goodbye', 'Thank you', 'Please'], correct: 0 },
      { q: 'What does "Guten Morgen" mean?', options: ['Good Morning', 'Good Evening', 'Goodbye', 'Thank You'], correct: 0 },
      { q: 'How do you say “How are you?”?', options: ['Wie geht’s?', 'Auf Wiedersehen', 'Guten Abend', 'Hallo'], correct: 0 }
    ],
    fill: [
      { q: 'Guten ______!', answer: ['morgen'] },
      { q: 'Wie ______ du?', answer: ['geht'] },
      { q: 'Hallo, mein ______ ist Anna.', answer: ['name'] }
    ],
    drag: [
      { instruction: 'Drag the word "Three" to the box:', word: 'Three' }
    ]
  },
  japanese: {
    mcq: [
      { q: 'What does "こんにちは" mean?', options: ['Hello', 'Goodbye', 'Thank you', 'Yes'], correct: 0 },
      { q: 'What does "おはよう" mean?', options: ['Good Morning', 'Good Night', 'Thanks', 'Please'], correct: 0 },
      { q: 'How do you say “Thank you” in Japanese?', options: ['ありがとう', 'さようなら', 'はい', 'いいえ'], correct: 0 }
    ],
    fill: [
      { q: '______ はじめまして', answer: ['こんにちは'] },
      { q: 'おはよう ______', answer: ['ございます'] },
      { q: '私の名前は ______ です', answer: ['ニク'] }
    ],
    drag: [
      { instruction: 'Drag the word "三" (san) to the box:', word: '三' }
    ]
  }
};

// Example: load questions based on language
if (selectedLanguage && questionsData[selectedLanguage]) {
  currentQuestions = questionsData[selectedLanguage].mcq; // Or whichever mode
  console.log(currentQuestions); // Debug: See questions in console
} else {
  console.error('No questions found for selected language:', selectedLanguage);
}

// ---------- Language selection listener ----------
document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('language');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      selectedLanguage = e.target.value;
    });
  }
});
=======
let fillQuestions = [];
let dragQuestions = [];
let mcqQuestions = [];
>>>>>>> 9398160b41b2ac1540d2c5d157dcfdc98269c7c7

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
<<<<<<< HEAD
  currentQuestions = [];

  // Clear old questions from the lesson container
  const lessonContainer = document.getElementById('lesson');
  lessonContainer.querySelectorAll('.question').forEach(q => q.remove());

  const data = questionsData[selectedLanguage][mode];

  if (mode === 'mcq') {
    currentQuestions = data.map((item, i) => {
      const container = document.createElement('div');
      container.className = 'question hidden';
      container.innerHTML = `
        <p>${item.q}</p>
        ${item.options.map((opt, idx) => `
          <button onclick="checkAnswer(this, ${idx === item.correct})">${String.fromCharCode(65 + idx)}) ${opt}</button>
        `).join('')}
        <br>
        <button class="next-btn hidden" onclick="goToNext()">Next</button>
      `;
      lessonContainer.appendChild(container);
      return container;
    });
  } 
  else if (mode === 'fill') {
    currentQuestions = data.map((item, i) => {
      const container = document.createElement('div');
      container.className = 'question hidden';
      const inputId = `fill-${i}`;
      container.innerHTML = `
        <h3>Fill in the blanks</h3>
        <p>${item.q}</p>
        <input type="text" id="${inputId}" placeholder="Your answer">
        <button onclick="checkFillBlank('${inputId}', ${JSON.stringify(item.answer)})">Check answer</button>
        <button class="next-btn hidden" onclick="goToNext()">Next</button>
      `;
      lessonContainer.appendChild(container);
      return container;
    });
  } 
  else if (mode === 'drag') {
    currentQuestions = data.map((item, i) => {
      const container = document.createElement('div');
      container.className = 'question hidden';
      container.innerHTML = `
        <p>${item.instruction}</p>
        <div class="drag-container">
          <div draggable="true" class="drag-item" id="dragItem-${i}">${item.word}</div>
          <div class="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">Drop Here</div>
        </div>
        <button class="next-btn hidden" onclick="goToNext()">Next</button>
      `;
      lessonContainer.appendChild(container);
      return container;
    });
  }

  showQuestion(currentQuestions, currentQuestion);
=======

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
>>>>>>> 9398160b41b2ac1540d2c5d157dcfdc98269c7c7
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
<<<<<<< HEAD
  if (!currentQuestions) return;

  // Hide current
  if (currentQuestions[currentQuestion]) {
    currentQuestions[currentQuestion].classList.add('hidden');
  }

  // Play next sound if available
=======
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
>>>>>>> 9398160b41b2ac1540d2c5d157dcfdc98269c7c7
  const nextSound = document.getElementById('next-sound');
  if (nextSound) nextSound.play();

  // Show next
  currentQuestion++;
<<<<<<< HEAD
  if (currentQuestion < currentQuestions.length) {
    showQuestion(currentQuestions, currentQuestion);
  } else {
    alert("Lesson complete! 🎉");
    document.getElementById('lesson').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
  }
}

function checkAnswer(button, isCorrect) {
  button.classList.add(isCorrect ? 'correct' : 'incorrect');
=======
  showQuestion(questionSet, currentQuestion);
}

function checkAnswer(button, isCorrect) {
  const feedback = isCorrect ? 'correct' : 'incorrect';
  button.classList.add(feedback);
>>>>>>> 9398160b41b2ac1540d2c5d157dcfdc98269c7c7
  playSound(isCorrect);
  updateXP(isCorrect);

  const parent = button.parentElement;
  const nextButton = parent.querySelector('.next-btn');
  if (nextButton) nextButton.classList.remove('hidden');
}

function checkFillBlank(inputId, correctAnswers) {
  const inputField = document.getElementById(inputId);
  const answer = inputField.value.trim().toLowerCase();
<<<<<<< HEAD
  if (answer === '') return;

=======

  if (answer === '') return;

>>>>>>> 9398160b41b2ac1540d2c5d157dcfdc98269c7c7
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
  const dragged = ev.dataTransfer.getData("text");
  const element = document.getElementById(dragged);
  ev.target.appendChild(element);
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