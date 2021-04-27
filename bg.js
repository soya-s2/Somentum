/*
이미지의 파일 이름을 1.jpg, 2.jpg... n.jpg로 지정한다.
1~n까지의 난수를 생성하고
이미지의 src를 난수를 활용하여 지정하고,
새로고침 할 때마다 r.jpg를 불러와
무작위의 배경 이미지를 출력하도록 한다.
*/

const body = document.querySelector("body");

const IMG_NUMBER = 6; // 이미지의 개수 지정


function paintImage(imageNumber) { // 이미지를 화면에 표시하는 함수
  const image = new Image();
  image.src = `images/${imageNumber + 1}.jpg`; 
  image.classList.add("bgImage");
  body.prepend(image); // body 태그의 최상단에 image를 추가
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER); // 이미지의 개수 내 난수를 생성
  return number;
  }

function init() {
  const randomNumber = genRandom(); // 난수를 생성하는 함수를 불러와 반환 값을 randomNumber에 저장
  paintImage(randomNumber);
}

init();