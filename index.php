<!DOCTYPE html>
    <head>
        <title>Pomodoro Focus Timer - RPi4</title>
        <link rel="stylesheet" href="styles.css?<?php echo time(); ?>">
    </head>
    <body>
        <h1>Pomodoro Focus Timer</h1>
        <h2 id="state">Work - 25:00</h2>
        <progress id="slider" value="100" max="100"></progress>
        <script rel="text/javascript" src="script.js"></script>
        <button id="start_stop" onclick="start_stop()">Start</button>
        <button onclick="next_state()">Next State</button>
    </body>
</html>