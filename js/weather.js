const API_KEY = "d5a197add950080a36fef382c9d4ef00";


function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    }); 
    // 실제로 그 url에 가는 게 아니라, js가 대신 url을 불러주는 방법

}

function onGeoError(){
    alert("Can't find tou. No weather for you.");
}


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//https://openweathermap.org/