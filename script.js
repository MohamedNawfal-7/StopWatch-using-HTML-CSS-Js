let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', start);
lapBtn.addEventListener('click', lap);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startBtn.style.display = "none";
        stopBtn.style.display = "inline-block";
    }
}

function stop() {
    if (running) {
        savedTime = difference;
        clearInterval(tInterval);
        running = false;
        startBtn.style.display = "inline-block";
        stopBtn.style.display = "none";
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00";
    laps.innerHTML = "";
    startBtn.style.display = "inline-block";
    stopBtn.style.display = "none";
    lapNumber = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime) + savedTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
                        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                        (seconds < 10 ? "0" + seconds : seconds);
}

function lap() {
    if (running) {
        lapNumber++;
        const lapTime = document.createElement('div');
        lapTime.innerText = "Lap " + lapNumber + ": " + display.innerHTML;
        laps.appendChild(lapTime);
    }
}