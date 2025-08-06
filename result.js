document.getElementById("xp").innerText=localStorage.getItem("xp");
document.getElementById("hearts-lost").innerText=localStorage.getItem("heartsLost");
document.getElementById("correct").innerText=localStorage.getItem("correct");
document.getElementById("incorrect").innerText=localStorage.getItem("incorrect");

function retryLesson()
{ 
    location.href="lesson.html"; 
}
function nextLesson()
{ 
    alert("Next lesson coming soon!"); 
}
