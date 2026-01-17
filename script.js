const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

let intervalId = null;
let startTimestamp = 0;
let elapsed = 0;
const tickMs = 3;

function formatTime(ms){
    const totalHundredths = Math.floor(ms / 10);
    const hundredths = totalHundredths % 100;
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    const two = v => String(v).padStart(2,'0');
    if(hours>0){
        return `${two(hours)}:${two(minutes)}:${two(seconds)}`;
    }
    else{
        return `${two(minutes)}:${two(seconds)}:${two(hundredths)}`;
    }
}

function updateDisplay(){
    const now = performance.now();
    const currentElapsed = elasped + (startTimestamp ? (now - startTimestamp) : 0);
    display.textContent = formatTime(Math.floor(currentElapsed));
}

function start(){
    if(intervalId) return;
    startTimestamp = performance.now();
    intervalId = setInterval(updateDisplay, tickMs);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function stop(){
    if(!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;

    const now =performance.now();
    elasped += (now - startTimestamp);
    startTimestamp = 0;
    updateDisplay();

    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;

}

function reset(){
    if(intervalId) clearInterval(intervalId);
    intervalId = null;
    startTimestamp = 0;
    elasped = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML='';

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function lap(){
    const now = performance.now();
    const currentElapsed = elasped + (startTimestamp ? ( now - startTimestamp) : 0);
    const li = document.createElement('li');
    const idx = lapsList.children.length + 1;
    const left = document.createElement('span');
    left.textContent = `Lap ${idx}`;
    const right = document.createElement('span');
    right.textContent = formatTime(Math.floor(currentElapsed));
    li.appendChild(left);
    li.appendChild(right);
    lapsList.insertBefore(li, lapsList.firstChild);
    resetBtn.disabled = false;
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

reset();