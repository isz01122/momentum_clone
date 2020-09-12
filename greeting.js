const form = document.querySelector(".js-form"),
  input = document.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const userId = "currentUser",
  Showing = "showing";

//넘겨받은 새로운 이름을 로컬저장소에 저장한다
function saveName(text) {
  localStorage.setItem(userId, text);
}

//엔터를 누르면 기본적으로 실행되는 이벤트를 막기위해 임시 함수를 선언하고
//입력된 이름의 값을 현재값으로 저장하고
//현재값을 paintGreeting함수와 saveName함수에 인자로 넘겨준다
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

//form태그에서 Showing 클래스를 추가한다
//form태그에서 이벤트를 듣고있다가 제출을 하게되면 handelSubmit를 실행
function askForName() {
  form.classList.add(Showing);
  form.addEventListener("submit", handleSubmit);
}

//form태그에서 Showing 클래스를 지우고 greeting태그에서 Showing 클래스를 추가한다
//추가 후 내용을 바꾸어준다
function paintGreeting(text) {
  form.classList.remove(Showing);
  greeting.classList.add(Showing);
  greeting.innerText = `Hello ${text}`;
}

//로컬저장소에서 현재유저 정보를 가져온다
//만약 없다면 이름을 묻고, 있다면 유저 정보의 이름을 색칠한다
function loadName() {
  const currentUser = localStorage.getItem(userId);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

//시작함수
function init() {
  loadName();
}

//시작
init();
