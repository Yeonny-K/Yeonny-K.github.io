const fixedList = document.getElementById("fixed-list");
const FIXED_KEY = "fixes";

let fixToDos = [];

function saveFixToDos(){
    localStorage.setItem(FIXED_KEY, JSON.stringify(fixToDos));
}

function deleteFix(event){ //버튼이 여러개 생기니까, 어떤 버튼에서 생긴 이벤트인지 알기 위해서 인자를 넣어줌.
    //parentNode, parentElement : 이 버튼의 부모가 누구인가요?
    const li = event.target.parentElement; //li라는 변수에 방금 누른 버튼의 부모 정보를 준 다음
    li.remove(); //삭제한다.
    fixToDos = fixToDos.filter((toDo) => toDo.id !== parseInt(li.id));
    //지금 클릭한 toDo의 id랑 다른 id를 가진 toDo들은 남기고, 같은 id를 가진 toDo만 삭제하겠다!
    //단 toDo.id는 int형이고 li.id는 string으로 넘어오기 때문에 int로 바꿔주기
    saveFixToDos(); //배열 새로운 거 보내주니까, 저장 한 번 더 해야됨.
}

function paintFixedToDos(newFixedObj){
    const li = document.createElement("li");
    li.id = newFixedObj.id;
    const span = document.createElement("span");
    span.innerText = newFixedObj.text;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteFix);
    li.appendChild(span);
    li.appendChild(deleteButton);
    fixedList.appendChild(li);
}

function addFixedList(event, todosArray, saveFunction){
    const li = event.target.parentElement;
    const selectedItemIndex = todosArray.findIndex(item => item.id === parseInt(li.id));
    
    if (selectedItemIndex !== -1) {
        const selectedToDo = todosArray[selectedItemIndex];
        fixToDos.push(selectedToDo);
        todosArray.splice(selectedItemIndex, 1);

        saveFunction();
        saveFixToDos();
        
        // UI에서도 해당 아이템을 제거하고 새로운 목록으로 보여줍니다.
        li.remove();
        paintFixedToDos(selectedToDo);
    }
}

const savedFixes = localStorage.getItem(FIXED_KEY);

if(savedFixes !== null){
    const parsedToDos = JSON.parse(savedFixes);
    fixToDos = parsedToDos; //항상 빈 array로 시작하지 않고 localStorage에 있는 걸 가져올 수 있도록 
    parsedToDos.forEach(paintFixedToDos);
    //parse를 이용해서 배열로 갖고 왔으니 활용해보기
    //forEach는 array의 각 item에 대해 괄호 안의 내용을 실행하게 해준다.
}