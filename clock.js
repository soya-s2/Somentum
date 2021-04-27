/* 
somentum.html의 시계 부분을 보여주는 부분을 가져와
시간이 1초마다 00:00의 형식으로 보여주도록 한다.
*/

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1"); 

function getTime() { // 시간을 화면에 표시해주는 함수
  const date = new Date(); // Date 객체 생성
  const minutes = date.getMinutes();
  const hours = date.getHours();
  clockTitle.innerText = `${hours <10 ? `0${hours}`: hours}  : ${minutes < 10 ? `0${minutes}` : minutes}`;
} // 백틱을 활용하여 00:00 형식으로 나타냄. 8시 9분인 경우 8:9가 아니라 08:09로 표현하기 위해서임

function init() {
  getTime();
  setInterval(getTime, 1000); // 1초마다 getTime을 호출
}

init();

