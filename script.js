let xp = 0;
let hearts = 3;
function startLesson() {
document.getElementById('dashboard').classList.add('hidden');
document.getElementById('lesson').classList.remove('hidden');
}
function checkAnswer(button, isCorrect) {
const feedback = isCorrect ? 'correct' : 'incorrect';
button.classList.add(feedback);
playSound(isCorrect);
updateXP(isCorrect);
}
function checkFillBlank() {
const answer = document.getElementById('fillBlank').value.trim().toLowerCase();
const correct = answer === "hello";
playSound(correct);
updateXP(correct);
}
function allowDrop(ev) {
ev.preventDefault();
}
function drop(ev) {
ev.preventDefault();
const data = document.getElementById("drag-hello");
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