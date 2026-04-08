// Check if user already exists
window.addEventListener("DOMContentLoaded", () => {

const savedUser = localStorage.getItem("name");

if(savedUser){
window.location.href = "../game.html";
}

});
class User {

constructor(name, email, dob) {

this.name = name;
this.email = email;
this.dob = dob;

}

saveUser() {

sessionStorage.setItem("name", this.name);
sessionStorage.setItem("email", this.email);
sessionStorage.setItem("dob", this.dob);

}

}


document.getElementById("registrationForm")?.addEventListener("submit", function(event){

event.preventDefault();

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const dob=document.getElementById("dob").value;
const password=document.getElementById("password").value;

const error=document.getElementById("errorMessage");

error.textContent="";


if(!email.includes("@")){

error.textContent="Emails require an @ symbol. Please try again.";
return;

}


const passwordRule=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

if(!passwordRule.test(password)){

error.textContent="Password must be at least 8 characters long and contain both letters and numbers.";
return;

}

const newUser=new User(name,email,dob);

newUser.saveUser();

window.location.href="../game.html";

});


window.addEventListener("DOMContentLoaded",function(){

const name=sessionStorage.getItem("name");
const email=sessionStorage.getItem("email");
const dob=sessionStorage.getItem("dob");

if(document.getElementById("displayName"))
document.getElementById("displayName").textContent=name;

if(document.getElementById("displayEmail"))
document.getElementById("displayEmail").textContent=email;

if(document.getElementById("displayDob"))
document.getElementById("displayDob").textContent=dob;

});