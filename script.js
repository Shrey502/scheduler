let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
let tasksBelowTimer = document.getElementById("Tasks");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            let currentTimeOnStopwatch = displayTime.innerHTML;
            e.target.setAttribute("data-completion-time", currentTimeOnStopwatch); 
        }

        updateCheckedTasks();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateCheckedTasks();
        saveData();
    }
}, false);

function updateCheckedTasks() {
    tasksBelowTimer.innerHTML = "";
    let checkedTasks = document.querySelectorAll("#list-container li.checked");
    checkedTasks.forEach(task => {
        let li = document.createElement("li");
        let taskName = task.textContent.replace("\u00d7", ""); 
        let completionTime = task.getAttribute("data-completion-time");

        li.textContent = `${taskName} - ${completionTime}`;
        tasksBelowTimer.appendChild(li);
    });
}  
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateCheckedTasks();
}
showTask();

// Stopwatch Functionality
let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById("displayTime");
let timer = null;

function stopwatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    displayTime.innerHTML = h + ":" + m + ":" + s;
}

function watchStart() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
}

function watchStop() {
    clearInterval(timer);
}

function watchReset() {
    clearInterval(timer);
    [seconds, minutes, hours] = [0, 0, 0];
    displayTime.innerHTML = "00:00:00";
}
