function startLesson(lessonId) {
  document.querySelectorAll('.lesson').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(lessonId).classList.remove('hidden');
}

function checkAnswer(button, isCorrect) {
  if (isCorrect) {
    document.getElementById('correct-sound').play();
    alert('Correct!');
  } else {
    document.getElementById('incorrect-sound').play();
    alert('Try again!');
  }
}

function checkFillBlank(inputId, correctValue) {
  const userInput = document.getElementById(inputId).value.trim().toLowerCase();
  if (userInput === correctValue.toLowerCase()) {
    document.getElementById('correct-sound').play();
    alert('Correct!');
  } else {
    document.getElementById('incorrect-sound').play();
    alert('Try again!');
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = document.getElementById("drag-hello");
  event.target.appendChild(data);
  document.getElementById('correct-sound').play();
  alert('Well done!');
}
