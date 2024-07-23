let gameseq=[];
let userseq=[];
let btns=["one","two","three","four"];
let started=false;
let level=0;
let hs=0;
let h2=document.querySelector('h2');
document.addEventListener("keypress",function(){
    if(started==false){
console.log("Game statred");
started=true;
levelup();
    }
});
function btnflash(btn){
btn.classList.add('flash');

console.log("button is flashed");


setTimeout(function(){
    btn.classList.remove('flash');
},250);

}
function userflash(btn){
    btn.classList.add('userflash');
    
    console.log("button is flashed");
    
    
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);

}
function levelup(){
    userseq=[];
level++;
h2.innerText=`Level ${level}`;
let rand=Math.floor(Math.random()*4);
let randcol=btns[rand];
let randbtn=document.querySelector(`.${randcol}`);
/*console.log(rand);
console.log(randcol);
console.log(randbtn);*/
gameseq.push(randcol);
console.log(gameseq);

btnflash(randbtn);
}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}
function checkans(idx){
   
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
           setTimeout( levelup(),1000);
        }
        console.log("same color");
    }else{
        h2.innerHTML=`Game over! Your score is<b>${level}  your highest score is ${hs}</b><br>Press any key to start`; 
        if(level>hs){
            hs=level;
        }
        reset();
    }
}
function btnpress(){
    let btn=this;
    userflash(btn);
    usercolor=btn.classList[1];
   userseq.push(usercolor);
   checkans(userseq.length-1);
}
let allbtns=document.querySelectorAll(".box");
    for(btn of allbtns){
        btn.addEventListener("click",btnpress);

        
    }
