const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
// 위는 이 코드와 같다. = const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    //localStorage는 배열로 저장할 수 없다. 
    //무조건 string으로 바꿔주는 JSON.stringify 를 사용해서 array처럼 생긴 string으로 저장
    //후에 JSON.parse를 통해 array 로 꺼내온다.
    // 1,2,3,4 순으로 입력해놨다면 localStorage 에는 stringify로 인해 "[1,2,3,4]" 로 저장되고
    // 다시 parse를 하면 [1,2,3,4] 로 됨. js에서 갖고 놀 수 있는 array로 나온다는 소리

}

function deleteToDo(event){ //버튼이 여러개 생기니까, 어떤 버튼에서 생긴 이벤트인지 알기 위해서 인자를 넣어줌.
     //parentNode, parentElement : 이 버튼의 부모가 누구인가요?
     const li = event.target.parentElement; //li라는 변수에 방금 누른 버튼의 부모 정보를 준 다음
     li.remove(); //삭제한다.
     toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
     //지금 클릭한 toDo의 id랑 다른 id를 가진 toDo들은 남기고, 같은 id를 가진 toDo만 삭제하겠다!
     //단 toDo.id는 int형이고 li.id는 string으로 넘어오기 때문에 int로 바꿔주기
     saveToDos(); //배열 새로운 거 보내주니까, 저장 한 번 더 해야됨.
}

function paintToDo(newTodo){
    const li = document.createElement("li"); //변수명은 맘대로 해도 상관없는데, 함수 안에 들어갈 인자로는 html에서 사용되는 태그의 이름을 주어야 한다.
    li.id = newTodo.id; //구조체로 받았으니까 그 안의 id를 넣어주기
    const span = document.createElement("span"); //나중에 삭제 버튼도 만들 거라서 span도 추가
    span.innerText = newTodo.text; // 구조체로 받았기 때문에 그 안의 text로 찍어주기
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteToDo);
    const fixButton = document.createElement("button");
    fixButton.innerText = "📌";
    fixButton.addEventListener("click", (event) => addFixedList(event, toDos, saveToDos));
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(fixButton);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value; //써놓은 값을 저장하고
    toDoInput.value = ""; //저장했으니까 이제 지워지게
    const newTodoObj = {
        text:newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj); // toDos라는 배열에도 저장하고
    paintToDo(newTodoObj);
    saveToDos();
}

function addFixedList(event){
    const li = event.target.parentElement;
    const selectedItemIndex = toDos.findIndex(item => item.id === parseInt(li.id));
    
    if (selectedItemIndex !== -1) {
        const selectedToDo = toDos[selectedItemIndex];
        fixToDos.push(selectedToDo);
        toDos.splice(selectedItemIndex, 1);

        saveToDos();
        saveFixToDos();
        
        // UI에서도 해당 아이템을 제거하고 새로운 목록으로 보여줍니다.
        li.remove();
        paintFixedToDos(selectedToDo);
    }
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; //항상 빈 array로 시작하지 않고 localStorage에 있는 걸 가져올 수 있도록 
    parsedToDos.forEach(paintToDo);
    //parse를 이용해서 배열로 갖고 왔으니 활용해보기
    //forEach는 array의 각 item에 대해 괄호 안의 내용을 실행하게 해준다.
}

/* 동일한 동작을 함
(item) => console.log("this is the turn of ", item)

function sayHello(item){
    console.log("this is the turn of ", item)
}
*/

/*
filter 함수 동작 방법
배열.filter(각 배열 원소마다 적용하고 싶은 함수명)
만약, 배열에서 해당 원소를 그대로 유지하고 싶으면 함수는 true를 리턴하면 된다.
만약, 배열에서 해당 원소만 빼고 싶으면 함수는 false를 리턴하면 된다.
중요한 점은, 기존 배열에서 작업하지 않고 새로운 배열을 만들어준다는 점.

forEach 도 그렇고 filter도 그렇고, 적용하고 싶은 함수를 호출할 때마다
그 함수를 적용한 원소를 인자로 배달해준다.
그러니까, [1,2,3,4,5].filter(hifx) 라고 치면
hifx(1) hifx(2) 요런식으로 한단 소리.
그래서 적용할 함수 내에서 인자로 배달받은 원소를 사용하고 싶으면,
적용할 함수에 인자 변수를 써주면 된다.
function hifx(num){
    if(num===1)
    return true ... 요렇게~!
}
*/

