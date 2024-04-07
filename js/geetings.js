const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

const savedUsername = localStorage.getItem(USERNAME_KEY);

function onLoginSubmit(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const inputName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, inputName);
    paintGreetings(inputName);
}

function paintGreetings(username){
    greeting.innerText = `Hello,  ${username}. Enjoy your today!`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

if(savedUsername === null){
    // form 보여주기
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);

} else{
    // h1 보여주기
    paintGreetings(savedUsername);
}

loginForm.addEventListener("submit", onLoginSubmit);