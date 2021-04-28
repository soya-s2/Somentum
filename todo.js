/*
할 일 목록(toDos)을 배열로 지정한다.
이 배열은 사용자가 할 일 목록으로 입력하는 text와
목록 순서를 식별하기 위한 id로 이루어진 객체(toDoObj)로 구성된다.

---loadToDos()---
현재 할 일 목록이 없다면 입력을 받고,
이미 localStorage에 할 일 목록이 있다면
---paintToDo(text)---
그것을 모두 불러와 할 일 목록 각각에
<li> <span></span> <button><button> </li>
의 element를 추가하여 html을 재구성해준다.
그러므로 새로고침해도 할 일 목록은 사라지지 않는다.

---deleteToDo(event)---
X 버튼은 할 일 목록을 삭제해주는 버튼이다.
버튼만 제거하는 것이 아니라 목록 자체를 삭제해야 하므로
부모 노드를 불러와 list 자체를 삭제해준다.

---checkToDo(event)---
체크 버튼을 누르면 해당 목록을 완료한 것처럼 
할 일 목록에 선이 그어져 보이게 한다.
이후 되돌리기 버튼이 나타나고 다시 선을 지울 수 있다.

할 일 목록의 추가/삭제 작업이 이루어지면,
---saveToDos() 함수로 localStorage에 있는 목록을 업데이트 해준다.
*/

const toDoForm = document.querySelector(".js-toDoForm"),  
  toDoInput = toDoForm.querySelector("input"), 
  toDoList = document.querySelector(".js-toDoList"); 

const TODOS_LS = "toDos"; // localStorage에 저장될 할 일 목록들

let toDos = []; 

function saveToDos() { // localStorage에 있는 toDos를 업데이트 시키는 함수
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON.stringify는 js obj를 string으로 변환해줌
}

function checkToDo(event) { // check 버튼을 누르면 실행되는 함수.
  const img = event.target;
  const btn = img.parentNode;
  const li = btn.parentNode;
  li.classList.toggle("checked"); // li에 checked 클래스가 없으면 추가, 있으면 삭제
  if (li.classList.contains("checked")) { // 체크된 상태이면 되돌리기 버튼을 표시
    img.src = "images/revertBtn.png";
  } else {
    img.src = "images/checkBtn.png";
  }
}

function deleteToDo(event) { // X 버튼(delBtn)을 누르면 실행되는 함수, delBtn의 클릭 이벤트 핸들러
  const img = event.target;
  const btn = img.parentNode;
  const li = btn.parentNode;
  toDoList.removeChild(li); // toDoList에서 해당 할 일 목록을 제거
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // toDo.id는 숫자이고, li.id는 string이므로 형변환이 필요함
  }); // filter는 모든 item에 대해 하나의 함수를 실행시킴. 즉 function에서 참값이 된 item의 array만 출력함
  console.log(cleanToDos);
  toDos = cleanToDos; // li.id = 1인 버튼을 눌렀다면 그를 제외한 li.id != 1인 toDos만 배열로 반환하여 toDos로 복사
  saveToDos(); // 새 toDos를 업데이트 해줌
}

function paintToDo(text) { // 할 일 목록을 구성하는 함수
  // X 버튼(목록 삭제), 체크 버튼(목록 완료)을 생성하고 클릭 이벤트 핸들러를 지정하는 부분
  const xBtn = document.createElement("button");
  const checkBtn = document.createElement("button");

  xBtn.addEventListener("click", deleteToDo);
  checkBtn.addEventListener("click", checkToDo);

  const xBtnImg = document.createElement("img");
  const checkBtnImg = document.createElement("img");
  xBtnImg.src = "/images/xBtn.png";
  checkBtnImg.src = "/images/checkBtn.png";

  // 할 일 목록의 구성 요소를 생성하고 append하는 부분
  const li = document.createElement("li"); 
  const span = document.createElement("span"); 
  const newId = toDos.length + 1; // li의 id가 될 부분. image가 1.jpg라면 1이 됨
  span.innerText = text; // 사용자가 입력한 text가 span 태그 안에 들어감
  
  xBtn.appendChild(xBtnImg);
  checkBtn.appendChild(checkBtnImg);
  li.appendChild(span); 
  li.appendChild(xBtn);
  li.appendChild(checkBtn);
  
  li.id = newId;
  toDoList.appendChild(li); 

  // 할 일 목록 배열(toDos)은 사용자가 입력한 할 일 text와 id로 구성된 객체로 이루어짐
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj); // 할 일 목록에 객체를 추가
  saveToDos(); // js의 localStorage는 데이터를 저장 불가함. 즉 모든 데이터를 string으로 저장/처리하려고 함. 즉 obj를 string화가 필요함.
}

function handleSubmit(event) { // submit 이벤트 핸들러
  event.preventDefault();
  const currentValue = toDoInput.value; // toDoInput 값을 가져옴
  paintToDo(currentValue);
  toDoInput.value = ""; // 값을 입력하는 창을 비워줌
}

function loadToDos() { // 새로고침을 해도 localStorage에서 toDos를 가져와 화면에 남아있도록 해주는 함수
  const loadedToDos = localStorage.getItem(TODOS_LS); 
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // 불러온 데이터가 string이므로 JSON.stringify가 또 필요함. 
    // 데이터 전달 시 js가 처리 가능하도록 obj로 바꿔주는 기능임.
    // 즉 string과 obj 사이의 변환을 도와줌
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text)
    });
   // parsedToDos를 순회하며 매개변수로 입력한 함수를 실행함
  } 
}

function init() {
  loadToDos(); // toDos를 불러옴
  toDoForm.addEventListener("submit", handleSubmit); // toDoForm에 submit 이벤트 발생 시 이벤트 핸들러 추가
}

init();