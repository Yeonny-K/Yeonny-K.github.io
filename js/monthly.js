const monthlyTitle = document.getElementById("monthly");
const monthlyForm = document.getElementById("monthly-form");
const monthlyInput = monthlyForm.querySelector("input");
const monthlyList = document.getElementById("monthly-list");

const MONTHLY_KEY = "monthlys";

let monthlyToDos = [];


function saveMonthlyToDos(){
    localStorage.setItem(MONTHLY_KEY, JSON.stringify(monthlyToDos));
}

function deleteMonthlyToDos(event){
    const li = event.target.parentElement;
    li.remove();
    monthlyToDos = monthlyToDos.filter( (monthly) => monthly.id !== parseInt(li.id)) ;
    saveMonthlyToDos();
}

function paintMonthlyToDos(newMonthly){
    const li = document.createElement("li");
    li.id = newMonthly.id;
    const span = document.createElement("span");
    span.innerText = newMonthly.text;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteMonthlyToDos);
    const fixButton = document.createElement("button");
    fixButton.innerText = "📌";
    fixButton.addEventListener("click", (event) => addFixedList(event, monthlyToDos, saveMonthlyToDos));
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(fixButton);
    monthlyList.appendChild(li);
}

function handleMonthlySubmit(event){
    event.preventDefault();
    const newMonthly = monthlyInput.value;
    monthlyInput.value = "";
    const newMonthlyObj = {
        text: newMonthly,
        id: Date.now(),
    };
    monthlyToDos.push(newMonthlyObj);
    paintMonthlyToDos(newMonthlyObj);
    saveMonthlyToDos();
}


monthlyForm.addEventListener("submit", handleMonthlySubmit);

const savedMonthlyToDos = localStorage.getItem(MONTHLY_KEY);

if(savedMonthlyToDos !== null){
    const parsedMonthly = JSON.parse(savedMonthlyToDos);
    monthlyToDos = parsedMonthly;
    parsedMonthly.forEach(paintMonthlyToDos);
}

function setTitle(){
    const date = new Date();
    const month = String(date.getMonth()+1);
    monthlyTitle.innerText = `Monthly ToDo #${month}`;
}

setTitle();
setInterval(setTitle, 1000*60);

