/* 
somentum.html의 폼을 가져와
localStorage에 저장된 이름이 없다면 입력받고,
saveName(text)에 의해 localStorage에 저장한다.
이미 이름이 있다면 Hello, currentUser!를 출력한다.

어떤 요소의 ClassList에 SHOWING_CN("showing")이 추가되면 
해당 요소는 somentum.css에 의해 보이게 되고,
SHOWING_CN("showing")이 제거되면 보이지 않는다.
*/

const form = document.querySelector(".js-form"), 
  input = form.querySelector("input"), 
  greeting = document.querySelector(".js-greetings"); 

const USER_LS = "currentUser", // localStorage에 저장될 사용자 이름
  SHOWING_CN = "showing"; // css 적용을 위한 클래스 이름

function saveName(text) { // localStorage에 해당 이름을 저장함
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) { // event의 prevent Default. 이 Default는 form을 제출 시 다른 문서로 이동, 새로고침 하려고 함. 이를 방지
  event.preventDefault(); // 이름이 다시 사라지는 것을 방지, 즉 원하는 동작만 구현하기 위하여 prevent함.
  const currentValue = input.value; 
  paintGreeting(currentValue); 
  saveName(currentValue); 
}

function askForName() { // 이름이 입력되지 않았으므로 입력 폼을 보이게 함
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit); 
}

function paintGreeting(text) { // 저장된 이름이 이미 있으므로 입력 폼은 보이지 않고 사용자의 이름이 보이게 하는 함수
  form.classList.remove(SHOWING_CN); 
  greeting.classList.add(SHOWING_CN); 
  greeting.innerText = `Hello, ${text}!`;
}

function loadName() { // localStorage에 저장된 사용자 이름이 있는지 검사하는 함수
  const currentUser = localStorage.getItem(USER_LS); 
  if (currentUser === null) { // 이름이 존재하지 않는 경우는 이름을 입력 받음
    askForName();
  } else { // 이미 저장된 이름이 있는 경우 이를 출력함
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
