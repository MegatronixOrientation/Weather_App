const apiKey = "74ec28eece80985503eff705822a96ce";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const bg=document.getElementById("video-bg");
const now = new Date();

let data;
const days = ['Sunday', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
document.querySelector(".date").innerHTML = days[now.getDay()] + " ," + months[now.getMonth()] + " " + now.getDate() + "," + now.getFullYear();
function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
    if (hh == 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
    let time = hh + ":" + mm + ":" + ss + " " + session;
    document.querySelector(".time").innerText = time;
    let t = setTimeout(function () { currentTime() }, 1000);
}
currentTime();
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".min-temp").innerHTML = "Min Temp : " + data.main.temp_min + "°C";
        document.querySelector(".max-temp").innerHTML = "Max Temp : " + data.main.temp_max + "°C";
        document.getElementById("feel").innerHTML = " Feels Like " + data.main.feels_like + "°C";
        setTimeout(() => {
            speakText();
        }, 500);

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./clouds.png";
            bg.src="./pexels_videos_1893623 (2160p).mp4";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./clear.png";
            bg.src="./mountains_-_59291 (1080p).mp4";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./rain.png";
            bg.src="./rain_-_78 (Original).mp4";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./drizzle.png";
            bg.src="./rain_-_78 (Original).mp4";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./mist.png";
            bg.src="./164360 (1080p).mp4";
        }
        else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "./haze.png";
            bg.src="./162714 (Original).mp4";
            
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".card").style.maxWidth = "1200px";
    }
}
// searchBtn.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// })
searchBox.addEventListener("keyup", (e) => {
    if (e.key === 'Enter')
        checkWeather(searchBox.value);
})

let form = document.querySelector("form");
let sr = window.webkitSpeechRecognition || window.SpeechRecognition;
let spRec = new sr();
let text;
spRec.lang = "en";
spRec.continuous = true;
spRec.interimResults = true;

function Listen() {
    spRec.start();

    setTimeout(() => {
        spRec.stop();

        checkWeather(searchBox.value);
    }, 3000);
    document.querySelector(".box").style.display = "block";

    setTimeout(() => {
        document.querySelector(".box").style.display = "none";
    }, 3000);

    document.querySelector(".weather").style.display = "none";
    document.querySelector(".card").style.maxWidth = "470px";
    bg.src="./mountain_-_105224 (1080p).mp4";
}

function show() {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".card").style.maxWidth = "470px";
    bg.src="./mountain_-_105224 (1080p).mp4";
}


spRec.onresult = res => {
    text = Array.from(res.results)
        .map(r => r[0])
        .map(txt => txt.transcript)
        .join("");
    console.log(text);
    document.getElementById("searchBox").value = text;

    text = null;

}



if ('speechSynthesis' in window) {
    const textToSpeechInput = document.getElementById('textToSpeech');
    const speakButton = document.getElementById('speakButton');

    const speechSynthesisUtterance = new SpeechSynthesisUtterance();

    speechSynthesisUtterance.voice = speechSynthesis.getVoices()[0];
    speechSynthesisUtterance.rate = 1;

    function speakText() {
        let sentence = `Today in ${data.name} it's ${data.main.temp} Degree Celsius and the humidity is ${data.main.humidity} percent But Usually you will feel like ${Math.floor(data.main.feels_like)} Degree Celsius.`;

        const text = sentence;

        speechSynthesisUtterance.text = text;
        speechSynthesis.speak(speechSynthesisUtterance);
    }
}
else {
    console.log("text to speech in not working");
}


let video = document.getElementById("myVideo");


function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";
    } else {
        video.pause();
        btn.innerHTML = "Play";
    }
}
function btn() {
    checkWeather(searchBox.value);
}


