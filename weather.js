/*
현재 위치의 위도와 경도를 가져와
API를 활용하여 나타낸다.
localStorage의 데이터는 string형으로 주고 받을 수 있으므로
console로 확인하거나 객체로 활용해야 하는 경우
json화가 필요하다.
즉 obj <-> string 간의 변환이 필요할 때가 있다.
*/

const API_KEY = "9cf74e9e2d0e01071b6b0d67e3becced";
const COORDS = "coords"; // localStorage에 저장될 coords 변수 생성
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) { // 경도와 위도를 계산하여 API Call에 지정
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function (response) {
    return response.json(); // API에 데이터를 request하여 값을 받음
  }).then(function (json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature}℃ @ ${place}`; // 현재 위치와 기온을 알려줌
  });
  // then()은 데이터가 완전히 들어온 다음 함수를 호출한다.
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) { // 좌표를 가져오는 데에 성공 시 실행되는 함수
  const latitude = position.coords.latitude; // 객체의 위도를 가져옴
  const longitude = position.coords.longitude; // 객체의 경도를 가져옴
  const coordsObj = {
    latitude,
    longitude  // latitude: latitude, longitude: longitude을 줄여서 쓸 수 있음.
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() { // 좌표를 가져오는 데에 실패 시 실행되는 함수
  console.log("Can't access geo location");
}


function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); // 좌표를 가져오는 데에 성공 시, 실패 시의 함수를 2개의 requirements로 가짐
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();

