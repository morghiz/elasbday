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

const adioscolls = [222, 224];

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

	const finalMove = getMove(tomove.x, tomove.y);

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

function isColliding(rec1, rec2, x1, y1, x2, y2) {
	let coll = false;
	rec1.forEach((r1) => {
		const r1sx = r1[0][0] + x1;
		const r1sy = r1[0][1] + y1;
		const r1ex = r1[1][0] + r1sx;
		const r1ey = r1[1][1] + r1sy;

		rec2.forEach((r2) => {
			const r2sx = r2[0][0] + x2;
			const r2sy = r2[0][1] + y2;
			const r2ex = r2[1][0] + r2sx;
			const r2ey = r2[1][1] + r2sy;

			if (r1ex > r2sx && r1ey > r2sy && r1sx < r2ex && r1sy < r2ey) {
				coll = true;
			}
		});
	});

	return coll;
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
	};

	const playerIndex = getIndex(player.x, player.y);

	const movedIDX = getIndex(player.x + mx, player.y + my);

	const offsets = [-1, 0, 1];

	offsets.forEach((ox) => {
		offsets.forEach((oy) => {
			const tiles = grid[movedIDX.y + oy][movedIDX.x + ox];
			let thisCollides = {
				x: false,
				y: false,
			};

			tileIDX = {
				x: movedIDX.x + ox,
				y: movedIDX.y + oy,
			};

			tiles.forEach((tile) => {
				if (adioscolls.includes(tile)) {
					thisCollides.x = false;
					thisCollides.y = false;
				}
				if (
					tile !== null &&
					isColliding(
						colls.player,
						colls.tiles[tile],
						player.x + mx,
						player.y,
						tileIDX.x * tileSize,
						tileIDX.y * tileSize
					)
				) {
					thisCollides.x = true;
				}
				if (
					tile !== null &&
					isColliding(
						colls.player,
						colls.tiles[tile],
						player.x,
						player.y + my,
						tileIDX.x * tileSize,
						tileIDX.y * tileSize
					)
				) {
					thisCollides.y = true;
				}
			});

			if (thisCollides.x) {
				collides.x = true;
			}
			if (thisCollides.y) {
				collides.y = true;
			}
		});
	});

	return {
		x: collides.x ? 0 : mx,
		y: collides.y ? 0 : my,
	};
}
