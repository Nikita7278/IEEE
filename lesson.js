let xp=0, hearts=3, current=0, correctCount=0, incorrectCount=0;

let questions=[
  {type:"mcq",q:"Gracias means?",options:["Hello","Thanks","Please"],ans:"Thanks"},
  {type:"fill",q:"Translate: Goodbye → ____",ans:"Adiós"},
  {type:"drag",q:"Match words",pairs:[["Hola","Hello"],["Adiós","Goodbye"]]}
];

function showQuestion(){
  let box=document.getElementById("question-box");
  let q=questions[current];
  document.getElementById("feedback").innerText="";
  document.getElementById("next").style.display="none";
  box.innerHTML="";

  if(q.type=="mcq"){
    box.innerHTML=`<p>${q.q}</p>`;
    q.options.forEach(opt=>{
      let b=document.createElement("button");
      b.innerText=opt;
      b.onclick=()=>check(opt==q.ans);
      box.appendChild(b);
    });
  }

  if(q.type=="fill"){
    box.innerHTML=`<p>${q.q}</p><input id="ans">`;
    let b=document.createElement("button");
    b.innerText="Check";
    b.onclick=()=>{
      let val=document.getElementById("ans").value.trim();
      check(val.toLowerCase()==q.ans.toLowerCase());
    };
    box.appendChild(b);
  }

  if(q.type=="drag"){
    box.innerHTML=`<p>${q.q}</p>`;
    q.pairs.forEach(p=>{
      let word=document.createElement("div");
      word.innerText=p[0];
      word.className="draggable";
      word.draggable=true;
      word.ondragstart=e=>e.dataTransfer.setData("text",p[0]);
      box.appendChild(word);
    });
    q.pairs.forEach(p=>{
      let dz=document.createElement("div");
      dz.className="dropzone";
      dz.innerText=p[1];
      dz.ondragover=e=>e.preventDefault();
      dz.ondrop=e=>{
        let data=e.dataTransfer.getData("text");
        check(data==p[0]);
      };
      box.appendChild(dz);
    });
  }
}

function check(correct){
  let fb=document.getElementById("feedback");
  if(correct){ 
        fb.innerText="✅ Correct"; 
        xp+=10; correctCount++; 
        document.getElementById("ding").play();
    }
  else 
    { 
        fb.innerText="❌ Wrong"; 
        hearts--; 
        incorrectCount++; 
        document.getElementById("buzz").play(); 
    }
  document.getElementById("xp").innerText=xp;
  document.getElementById("hearts").innerText="❤️".repeat(hearts);
  document.getElementById("next").style.display="inline";
  if(hearts<=0) endLesson();
}

function nextQuestion(){
  current++;
  if(current<questions.length){ showQuestion(); }
  else endLesson();
}

function endLesson(){
  localStorage.setItem("xp",xp);
  localStorage.setItem("heartsLost",3-hearts);
  localStorage.setItem("correct",correctCount);
  localStorage.setItem("incorrect",incorrectCount);
  location.href="result.html";
}

showQuestion();
