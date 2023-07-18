let last_update = Date.now();
let state = "Work";
let state_counter = 0;
let time_lookup = {
    "Work" : 1500,
    "Break" : 300,
    "Extended Break" : 1200
}

function pad(num, size) {
    // pad a string with leading zeros
    // @param num - string - the string to pad
    // @param size - int - the required length of string
    while (num.length < size) num = "0" + num;
    return num;
}

function next_state() {
    window.state_counter++;
    if (window.state_counter % 2 == 0) {
        window.state = "Work"
    } else {
        if (window.state_counter % 7 == 0) {
            window.state = "Break";
        } else {
            window.state = "Extended Break";
        }
    }
}

function update() {
    let current_time = Date.now();
    let time_remaining = time_lookup[state] - Math.round((current_time - last_update)/1000);
    window.last_update = current_time;

    if (time_remaining <= 0) {
        next_state();
    }

    let minutes = String(Math.round(Math.floor(time_remaining/60)));
    let seconds = String(Math.round(time_remaining % 60));
    document.getElementById("state").innerText = `${state} - ${pad(minutes, 2)}:${pad(seconds, 2)}`
    
    let percent_completion = Math.round((time_remaining / time_lookup[state]) * 100)
    document.getElementById("slider").value = percent_completion;
}

setInterval(update, 1000);