let gameseq=[];
let userseq=[];
let btns=["one","two","three","four"];
let started=false;
let level=0;
let hs=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(!started){
        h2.innerText=`Level ${level}`;
        nextSequence();
        started=true;
    }
});
document.addEventListener("dblclick",function(){
    if(!started){
        h2.innerText=`Level ${level}`;
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    userseq=[]; 
    level++;
    h2.innerText=`Level ${level}|High Score:${hs}`;
    let rand=Math.floor(Math.random()*4);
    let randcol=btns[rand];
    let randbtn=document.querySelector(`.${randcol}`);
    gameseq.push(randcol);
    console.log("Game sequence:",gameseq);
    setTimeout(()=>{
        btnflash(randbtn);
        beep(); 
    },500);
}
function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    }, 250);
}
function checkans(idx){
    if (userseq[idx]===gameseq[idx]){
        console.log("Correct so far...");
        if (userseq.length===gameseq.length) {
            setTimeout(nextSequence,1000); 
        }
    } else {
        console.log("Wrong choice!");
        beepError(); 
        document.body.classList.add("game-over");
        setTimeout(()=>document.body.classList.remove("game-over"),200);
        h2.innerHTML = `Game Over! Your Score: ${level} <br> Press any key to restart.`;
        if (level>hs){
            hs=level; 
        }
        startOver();
    }
}
function startOver(){
    level=0;
    gameseq=[];
    started=false;
}
function btnpress(){
    let btn=this;
    userflash(btn);
    let usercolor=btn.classList[1];
    userseq.push(usercolor);
    beep(); 
    console.log("User sequence:",userseq);
    checkans(userseq.length-1);
}
let allbtns=document.querySelectorAll(".box");
for(let btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function beep() {
    let context=new(window.AudioContext||window.webkitAudioContext)();
    let oscillator=context.createOscillator();
    oscillator.type="sine"; 
    oscillator.frequency.setValueAtTime(440,context.currentTime); 
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(()=>oscillator.stop(),150);
}
function beepError(){
    let context=new(window.AudioContext||window.webkitAudioContext)();
    let oscillator=context.createOscillator();
    oscillator.type="square"; 
    oscillator.frequency.setValueAtTime(200,context.currentTime); 
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(()=>oscillator.stop(),300); 
}