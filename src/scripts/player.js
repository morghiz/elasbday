let joy = {
	x: 0,
	y: 0,
	dir: 180,
	mag: 0,
	costume: null,
};

let collsAround = [
	[[], [], []],
	[[], [], []],
	[[], [], []],
];

const adioscolls = [222, 224]

let collsAroundNow = [
	[false, false, false],
	[false, false, false],
	[false, false, false],
];

function updatePlayer() {
	let tomove = { x: 0, y: 0 };
	resetJoy();

	if (keys.KeyD || keys.ArrowRight) {
		joy.x += 1;
	}

	if (keys.KeyA || keys.ArrowLeft) {
		joy.x -= 1;
	}
	if (keys.KeyS || keys.ArrowDown) {
		joy.y += 1;
	}

	if (keys.KeyW || keys.ArrowUp) {
		joy.y -= 1;
	}

	handleJoystick();

	updJoyValues();

	if (joy.mag > 0) {
		player.state = "walk";
	} else {
		player.state = "idle";
	}

	tomove.x += joy.x * player.baseSpeed * player.speed * delta;
	tomove.y += joy.y * player.baseSpeed * player.speed * delta;

    const finalMove = getMove(tomove.x, tomove.y)

	player.x += finalMove.x;
	player.y += finalMove.y;

	updPlayerCostume();
	updateCamera();
}

function resetJoy() {
	joy.x = 0;
	joy.y = 0;
	joy.mag = 0;
}

function updJoyValues() {
	joy.mag = magnitude(joy.x, joy.y);

	if (joy.mag > 1) {
		joy.x /= joy.mag;
		joy.y /= joy.mag;

		joy.mag = 1;
	}

	if (joy.mag > 0) {
		let dir = (Math.atan2(joy.y, joy.x) * 180) / Math.PI;

		joy.dir = dir;

		player.dir = getJoyDir(joy.x, joy.y);
	}

	getMove(joy.x, joy.y);
}

const getJoyDir = (joyX, joyY) => {
	joyY = -joyY;
	if (Math.abs(joyY) >= Math.abs(joyX)) return joyY > 0 ? 0 : 180;
	return joyX > 0 ? 90 : 270;
};

function handleJoystick() {
	const mag = magnitude(joystick.x, joystick.y);

	if (mag > 0) {
		joy.x = joystick.x;
		joy.y = joystick.y;
		joy.mag = mag;
	}
}

function magnitude(x, y) {
	return Math.sqrt(x * x + y * y);
}

function updPlayerCostume() {
	let frame = 0;

	if (player.state == "walk") {
		player.frame += 0.14 * joy.mag * delta * player.speed;
	} else {
		player.frame = 0;
	}

	frame = Math.floor(player.frame % 6);

	if (player.state == "walk") {
		if ((frame + 1) % 3 == 0) {
			if (!player.didFootstep) {
			}
			player.didFootstep = true;
		} else {
			player.didFootstep = false;
		}
	}

	let costume = null;

	if (player.state == "idle") {
		costume = assets.sprites.player[player.state + player.dir];
	} else {
		costume = assets.sprites.player[player.state + player.dir][frame];
	}

	player.costume = costume;
}

function updateCamera() {
	camera.x = player.x - gameW / 2;
	camera.y = player.y - gameH / 2;

	if (camera.x < 0) camera.x = 0;
	if (camera.y < 0) camera.y = 0;

	const w = currentScene.map.data.behind[0][0].length * tileSize;
	const h = currentScene.map.data.behind[0].length * tileSize;

	if (camera.x > w - gameW) camera.x = w - gameW;
	if (camera.y > h - gameH) camera.y = h - gameH;

	if (camera.x < 0) {
		camera.x = -gameW / 2 + w / 2;
	}

	if (camera.y < 0) {
		camera.y = -gameH / 2 + h / 2;
	}
}

function isColliding(rects1, rects2, x1, y1, x2, y2) {
	for (let i = 0; i < rects1.length; i++) {
		const r1 = rects1[i];
		const ax1 = x1 + r1[0][0],
			ay1 = y1 + r1[0][1];
		const ax2 = ax1 + r1[1][0],
			ay2 = ay1 + r1[1][1];

		for (let j = 0; j < rects2.length; j++) {
			const r2 = rects2[j];
			const bx1 = x2 + r2[0][0],
				by1 = y2 + r2[0][1];
			const bx2 = bx1 + r2[1][0],
				by2 = by1 + r2[1][1];

			if (ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1) {
				return true;
			}
		}
	}
	return false;
}

function getIndex(x, y) {
	return {
		x: Math.floor(x / tileSize),
		y: Math.floor(y / tileSize),
	};
}

function getMove(mx, my) {
    let collides = {
        x: false,
        y: false,
    }
	resetColls();

	
}

function resetColls() {
	collsAround = [
		[[], [], []],
		[[], [], []],
		[[], [], []],
	];

	collsAroundNow = [
		[false, false, false],
		[false, false, false],
		[false, false, false],
	];
}
