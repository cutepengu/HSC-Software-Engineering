class GameUser{

constructor(){

this.name=localStorage.getItem("name");

}

display(){

const text=document.getElementById("welcomeText");

if(this.name){

text.textContent="Welcome "+this.name+"! Start exploring the ocean.";

}

}

}


function logout(){

localStorage.clear();

window.location.href="index.html";

}


window.addEventListener("DOMContentLoaded",()=>{

const user=new GameUser();

user.display();

});