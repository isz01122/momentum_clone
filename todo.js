const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

//toDo를 저장할 배열
let toDos = [];

//클릭된 버튼의 부모노드를 따라가서 li를 지우고
//toDo의 id값과 li의 id값이 같은 경우를 지워야 함
//즉, 두 값이 다른 경우들만 필터로 찾아내어 새롭게 toDo에 저장하는 방식!
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//로컬저장소에 todos를 문자열 형태로 저장함
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//각종 속성등을 만들어주고 toDo객체를 만들어서 toDos배열에 하나씩 저장한다
//버튼이 클릭되는 이벤트를 통해 toDo를 삭제하고 saveToDos함수 호출
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newID;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newID,
  };
  toDos.push(toDoObj);
  saveToDos();
}

//기본적으로 엔터 입력시 실핼되는 것을 막는 임시 함수를 선언해주고
//입력한 toDo값을 현재 값으로 저장하여 paintToDo함수로 넘겨준다
//그리고 toDo값은 다시 공백으로 초기화하여 재입력시 간편하게 만들어준다
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

//로컬저장소에서 toDo값을 가져온 후
//만약 값이 있다면 문자열로 객체 값을 변화하여 하나씩 출력한다
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

//맨 처음 시작함수이고 loadToDos를 실행한다
//이벤트리스너를 통하여 무언가 값이 제출이 되면 handleSubmit를 호출한다
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
