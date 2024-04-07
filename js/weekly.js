const weeklyTitle = document.getElementById("weekly");
const weeklyForm = document.getElementById("weekly-form");
const weeklyInput = weeklyForm.querySelector("input");
const weeklyList = document.getElementById("weekly-list");

const WEEKLY_KEY = "weeklys";

let weeklyToDos = [];

function saveWeeklyToDos(){
    localStorage.setItem(WEEKLY_KEY, JSON.stringify(weeklyToDos));
}

function deleteWeeklyToDos(event){
    const li = event.target.parentElement;
    li.remove();
    weeklyToDos = weeklyToDos.filter( (weekly) => weekly.id !== parseInt(li.id) );
    saveWeeklyToDos();
}

function paintWeeklyToDos(newWeekly){
    const li = document.createElement("li");
    li.id = newWeekly.id;
    const span = document.createElement("span");
    span.innerText = newWeekly.text;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteWeeklyToDos);
    const fixButton = document.createElement("button");
    fixButton.innerText = "📌";
    fixButton.addEventListener("click", (event) => addFixedList(event, weeklyToDos, saveWeeklyToDos));
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(fixButton);
    weeklyList.appendChild(li);
}


function handleWeeklySubmit(event){
    event.preventDefault();
    const newWeekly = weeklyInput.value;
    weeklyInput.value = "";
    const newWeeklyObj = {
        text: newWeekly,
        id: Date.now(),
    };
    weeklyToDos.push(newWeeklyObj);
    paintWeeklyToDos(newWeeklyObj);
    saveWeeklyToDos();    
}

weeklyForm.addEventListener("submit", handleWeeklySubmit);

const savedWeeklyToDos = localStorage.getItem(WEEKLY_KEY);

if(savedWeeklyToDos !== null){
    const parsedWeekly = JSON.parse(savedWeeklyToDos);
    weeklyToDos = parsedWeekly;
    parsedWeekly.forEach(paintWeeklyToDos);
}

