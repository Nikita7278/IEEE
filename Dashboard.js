// Time-based Greeting
const greeting = document.getElementById("greeting");

function updateGreeting() {
  const hour = new Date().getHours();
  let message = "Welcome back";

  if (hour < 12) message = "Good Morning, Niku!";
  else if (hour < 18) message = "Good Afternoon, Niku!";
  else message = "Good Evening, Niku!";

  greeting.textContent = message;
}
updateGreeting();

// Daily Goal Status
const goalStatus = document.getElementById("goalStatus");

function markGoalDone() {
  goalStatus.textContent = "✔ Done";
  goalStatus.style.color = "green";
  localStorage.setItem("goalDone", "true");
}

function loadGoalStatus() {
  const status = localStorage.getItem("goalDone");
  if (status === "true") {
    goalStatus.textContent = "✔ Done";
    goalStatus.style.color = "green";
  } else {
    goalStatus.textContent = "❌ Not Done";
    goalStatus.style.color = "red";
  }
}
loadGoalStatus();

// Animate Progress Bar
window.addEventListener("load", () => {
  const progress = document.querySelector(".progress");
  const targetWidth = progress.style.width;
  progress.style.width = "0";

  setTimeout(() => {
    progress.style.transition = "width 1s ease-in-out";
    progress.style.width = targetWidth;
  }, 300);
});
