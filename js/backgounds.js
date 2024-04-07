const images = [
"img1.jpg", 
"img2.jpg",
"img3.jpg",
"img4.jpg", 
"img5.jpg",
"img6.jpg",
"img7.jpg", 
"img8.jpg",
"img9.jpg",
"img10.jpg",
"img11.jpg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

//반응형 배경으로 들어가도록 깔끔하게 바꾸기
document.body.style.backgroundImage = `url(img/${chosenImage})`;
document.body.style.backgroundPosition = "top";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed"; 

//이렇게 만든 경로 문자열을 html의 body에 넣어준다.

document.body.appendChild(bgImage); 
// html의 body라는 부분에 이 아이를 넣어주세요


