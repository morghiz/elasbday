const infoDiv = document.getElementById("info"),
	canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

let keys = {};
let hasFocus = true;

let glbScale = 1,
	gameW = 240,
	gameH = 180;

const perfectTime = 1000 / 60;
let delta = 0;
let lastTime = 0;

let currentScene = {};

let frames = 0

let player = {
	x: 0,
	y: 0,
    state: "idle",
    dir: "180",
    baseSpeed: 0.7,
    speed: 1,
    frame: 0,
    didFootstep: false,
};

let camera = {
	x: 0,
	y: 0,
};

window.onload = () => {
	loadNestedResources(toLoad).then(() => {
		initFirst();
	});
};

function initFirst() {
	container.style.display = "block";
	button.style.display = "block";
    lastTime = performance.now();

	infoDiv.remove();

	window.addEventListener("resize", () => {
		resizeCanvas();
        updateBGBuffer()
	});

	resizeCanvas();

	initMap("test");

    updateBGBuffer()
	updateBuffers();
}

function resizeCanvas() {
	canvas.width = canvas.clientWidth * devicePixelRatio;
	canvas.height = canvas.clientHeight * devicePixelRatio;

	glbScale = Math.min(canvas.width / 240, canvas.height / 180);

	ctx.scale(glbScale, glbScale);

	gameW = canvas.width / glbScale;
	gameH = canvas.height / glbScale;
}

function loop(timestamp) {
	requestAnimationFrame(loop);

    updateTiming(timestamp)

    updatePlayer()

	paintBackground();
    drawBackLayers();

    paintPlayer()

    drawFrontLayers()

    drawPlayerShadow()
}

function initMap(name) {
	currentScene = levels[name];

	player.x = currentScene.player[0];
	player.y = currentScene.player[1];

	requestAnimationFrame(loop);
}

window.addEventListener("keydown", function (e) {
	keys[e.code] = true;
});

window.addEventListener("keyup", function (e) {
	keys[e.code] = false;
});

window.onblur = function () {
	hasFocus = false;
	keys = {};
};

window.onfocus = function () {
	hasFocus = true;
};

function updateTiming(time) {
	delta = (time - lastTime) / perfectTime;
	lastTime = time;

    if (delta > 4) {delta = 4}

    frames += delta
}