const days = document.querySelector("#days");
const dayOfWeeks = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function getdays(){
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()+1);
    const day = String(date.getDate());
    const dayOfWeek = String(date.getDay());
    days.innerText = `${year}/${month}/${day}/${dayOfWeeks[dayOfWeek]}`;
}

getdays();
setInterval(getdays, 1000);