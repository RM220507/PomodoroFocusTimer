let last_update = Date.now();
let state = "Work";
let state_counter = 0;
let delay = 1500;
let running = false;
let audio = new Audio("bell.mp3");

function pad(num, size) {
    // pad a string with leading zeros
    // @param num - string - the string to pad
    // @param size - int - the required length of string
    while (num.length < size) num = "0" + num;
    return num;
}

function start_stop() {
    running = !running;
    if (running) {
        state = "Work";
        state_counter = 0;
        delay = 1500;
        last_update = Date.now();
        document.getElementById("start_stop").innerText = "Stop";
    } else {
        document.getElementById("start_stop").innerText = "Start";
    }
}

function next_state() {
    if (!running) {return}

    last_update = Date.now();
    state_counter++;
    if (state_counter % 2 == 0) {
        state = "Work";
        delay = 1500;
    } else {
        if (state_counter % 7 == 0) {
            state = "Extended Break";
            delay = 1200;
        } else {
            state = "Break";
            delay = 300;
        }
    }
    audio.play();
}

function update() {
    if (!running) {return}

    let current_time = Date.now();
    let time_elapsed = Math.round((current_time - last_update) / 1000);
    let time_remaining = delay - time_elapsed;

    if (time_remaining <= 0) {
        next_state();
    }

    let minutes = String(Math.round(Math.floor(time_remaining/60)));
    let seconds = String(Math.round(time_remaining % 60));
    document.getElementById("state").innerText = `${state} - ${pad(minutes, 2)}:${pad(seconds, 2)}`
    
    let percent_completion = Math.round((time_remaining / delay) * 100)
    document.getElementById("slider").value = percent_completion;
}

setInterval(update, 100);