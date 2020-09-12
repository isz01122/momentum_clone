const weather = document.querySelector(".js-weather");

const API_KEY = "1bb116bc060513b78feb643120e7c2a2";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${Math.floor(temperature * 10) / 10}°C ${place}`;
    });
}

//로컬저장소에 가져온 위치정보의 객체를 문자열 형태로 저장한다
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//가여온 경우 경도 위도를 가져오고 객체에 담아서 저장한다
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

//만약 가져오지 못한경우
function handleGeoError() {
  console.log("cant access");
}

//현재 위치정보를 가져온다
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

//위치정보를 로컬저장소에서 가져온다
//만약 없다면 위치정보를 묻는 함수를 실행
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

//시작함수
function init() {
  loadCoords();
}

init();
