var overlay = document.getElementById("glitchOverlay");
var black = document.getElementById("blackScreen");
var crazy = document.getElementById("crazyScreen");
var txt = document.getElementById("randomText");
var home = document.querySelector("content");
var menu = document.getElementById("menuPage");
var jump = document.getElementById("jumpscare");
var errLayer = document.getElementById("errorLayer");

var flashInt;
var textInt;
var errInt;
var invInt;
var blocked = false;
var snd = null;
var errorCount = 0;
var clicks = 0;
var t1, t2, t3, t4;

var words = [
    "BOBA BASH",
    "TAPIICA ERROR 404",
    "SUGAR OVERLOAD",
    "RUN. THE BOBA IS AWAKE",
    "MILK TEA SYSTEM FAILURE",
    "CHEWY CHAOS EVERYWHERE",
    "PEARL NOT FOUND",
    "DRINK THE GLITCH",
    "BOBA BASH",
    "SIP SIP HACK",
    "TOO MANY PEARLS",
    "BOBA BASH TAKES OVER"
];

var errMsgs = [
    "boba.exe has stopped responding",
    "TOO MANY PEARLS DETECTED",
    "DO NOT CLOSE THIS TAB",
    "YOUR DRINK IS HAUNTED",
    "SYSTEM: I AM STILL WATCHING",
    "404 CALM NOT FOUND",
    "WARNING - BOBA KNOWS YOUR LOCATION",
    "MILK TEA BUFFER OVERFLOW",
    "ESCAPE KEY DISABLED",
    "BOBA BASH INSTALLED SUCCESSFULLY"
];

document.querySelector(".content a").onclick = function () {
    clicks = clicks + 1;
    openMenu();
    return false;
};

document.getElementById("backBtn").onclick = function () {
    goBackHome();
    return false;
};

function openMenu() {
    home.style.display = "none";
    menu.style.display = "block";

    try {
        var AC = window.AudioContext || window.webkitAudioContext;
        snd = new AC();
        if (snd.state == "suspended") {
            snd.resume();
        }
    } catch (e) {
        console.log(e);
    }

    try {
        var el = document.documentElement;
        if (el.requestFullscreen) {
            var p = el.requestFullscreen();
            if (p && p.catch) {
                p.catch(function (err) {
                    console.log("fullscreen nahi chala", err);
                });
            }
        }
    } catch (err) {
        console.log("fullscreen error", err);
    }

    blocked = true;
    history.pushState("", "", location.href);

    window.onbeforeunload = function () {
        return " ";
    };

    t1 = setTimeout(function () {
        startGlitch();

        t2 = setTimeout(function () {
            stopGlitch();
            black.classList.add("on");
            dhakDhak();

            t3 = setTimeout(function () {
                bigGlitch();

                t4 = setTimeout(function () {
                    sabNormal();
                }, 12000);

            }, 2000);
        }, 6000);
    }, 2000);
}

function goBackHome() {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    clearTimeout(t4);

    menu.style.display = "none";
    home.style.display = "block";
    blocked = false;
    window.onbeforeunload = null;
    document.body.classList.remove("glitching");

    try {
        if (document.exitFullscreen && document.fullscreenElement) {
            var p = document.exitFullscreen();
            if (p && p.catch) {
                p.catch(function () {});
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function startGlitch() {
    document.body.classList.add("glitching");
    overlay.classList.add("active");

    flashInt = setInterval(function () {
        if (overlay.classList.contains("active") == true) {
            overlay.classList.remove("active");
        } else {
            overlay.classList.add("active");
        }
    }, 150);
}

function stopGlitch() {
    clearInterval(flashInt);
    overlay.classList.remove("active");
}

function bigGlitch() {
    crazy.classList.add("on");
    txt.innerHTML = words[0];

    jumpscareDikha(700);

    textInt = setInterval(function () {
        var i = Math.floor(Math.random() * words.length);
        txt.innerHTML = words[i];
    }, 260);

    errInt = setInterval(function () {
        var box = document.createElement("div");
        box.className = "error-box";
        var msg = errMsgs[Math.floor(Math.random() * errMsgs.length)];
        box.innerHTML = '<div class="bar"><span>Error</span><span>[X]</span></div>' +
            '<div class="msg">' + msg + '</div>' +
            '<button class="ok">OK</button>';
        box.style.left = Math.floor(Math.random() * 65) + "%";
        box.style.top = Math.floor(Math.random() * 65) + "%";
        errLayer.appendChild(box);
        errLayer.style.display = "block";
        errorCount = errorCount + 1;

        if (errorCount % 4 == 0) {
            scream();
        } else {
            dhakDhak();
        }

        if (errLayer.childNodes.length > 7) {
            errLayer.removeChild(errLayer.childNodes[0]);
        }
    }, 420);

    invInt = setInterval(function () {
        if (document.body.style.filter == "invert(1)") {
            document.body.style.filter = "";
        } else {
            document.body.style.filter = "invert(1)";
        }
    }, 180);
}

function scream() {
    try {
        var o = snd.createOscillator();
        var g = snd.createGain();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(900, snd.currentTime);
        o.frequency.exponentialRampToValueAtTime(110, snd.currentTime + 0.6);
        g.gain.setValueAtTime(0.22, snd.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, snd.currentTime + 0.7);
        o.connect(g);
        g.connect(snd.destination);
        o.start(0);
        o.stop(snd.currentTime + 0.7);
    } catch (e) {
        console.log(e);
    }
}

function dhakDhak() {
    try {
        var o = snd.createOscillator();
        var g = snd.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(70, snd.currentTime);
        g.gain.setValueAtTime(0.5, snd.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, snd.currentTime + 0.35);
        o.connect(g);
        g.connect(snd.destination);
        o.start(0);
        o.stop(snd.currentTime + 0.35);
    } catch (e) {
        console.log(e);
    }
}

function jumpscareDikha(ms) {
    jump.classList.add("on");
    scream();
    setTimeout(function () {
        jump.classList.remove("on");
    }, ms);
}

function sabNormal() {
    clearInterval(textInt);
    clearInterval(flashInt);
    clearInterval(errInt);
    clearInterval(invInt);

    errLayer.style.display = "none";
    while (errLayer.firstChild) {
        errLayer.removeChild(errLayer.firstChild);
    }
    errorCount = 0;

    crazy.classList.remove("on");
    black.classList.remove("on");
    overlay.classList.remove("active");
    document.body.classList.remove("glitching");
    document.body.style.filter = "";

    menu.style.display = "none";
    home.style.display = "block";
    blocked = false;
    window.onbeforeunload = null;

    try {
        if (document.exitFullscreen && document.fullscreenElement) {
            var p = document.exitFullscreen();
            if (p && p.catch) {
                p.catch(function () {});
            }
        }
    } catch (err) {
        console.log(err);
    }

    window.scrollTo(0, 0);

    window.location.href = "hacked.html";
}

window.addEventListener("popstate", function () {
    if (blocked == true) {
        history.pushState("", "", location.href);
    }
});
