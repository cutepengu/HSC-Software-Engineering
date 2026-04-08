class Menu {

constructor(){

this.playBtn=document.getElementById("playBtn");
this.loginBtn=document.getElementById("loginBtn");
this.helpBtn=document.getElementById("helpBtn");

this.initialiseButtons();

}

initialiseButtons(){

if(this.playBtn){
this.playBtn.addEventListener("click",()=>this.startGame());
}

if(this.loginBtn){
this.loginBtn.addEventListener("click",()=>this.goToLogin());
}

if(this.helpBtn){
this.helpBtn.addEventListener("click",()=>this.goToHelp());
}

}

startGame(){

const loggedIn=sessionStorage.getItem("loggedIn");

if(loggedIn==="true"){
window.location.href="game.html";
}
else{
window.location.href="login/login.html";
}

}

goToLogin(){
window.location.href="login/login.html";
}

goToHelp(){
window.location.href="help.html";
}

}

window.addEventListener("DOMContentLoaded",()=>{
new Menu();
});

function goBack(){
window.history.back();
}