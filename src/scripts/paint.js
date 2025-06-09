let tilesX, tilesY;
const tileSize = 16;

const DynCanvas = document.createElement("canvas");
const DynCtx = DynCanvas.getContext("2d");

let grid = [];

const animated = {
	407: {
		speed: 1.5,
		frames: 5,
	},
	234: {
		speed: 2.5,
		frames: 8,
	},
	242: {
		speed: 2.5,
		frames: 8,
	},
};

let buffers = {
	background: {
		context: new OffscreenCanvas(100, 100).getContext("2d"),
	},
	behind: [],
	dynamic: [],
	top: [],
};

function updateBuffers() {
	grid = [];

	mimicSize();
	updateBehindBuffers();
	updateDynamicBuffers();
	updateTopBuffers();
}

function paintBackground() {
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(
		buffers.background.context.canvas,
		(-camera.x % tileSize) - tileSize,
		(-camera.y % tileSize) - tileSize
	);
}

function updateBGBuffer() {
	tilesX = Math.ceil(gameW / tileSize) + 2;
	tilesY = Math.ceil(gameH / tileSize) + 2;
	const ctx = buffers.background.context;
	const canvas = ctx.canvas;

	canvas.width = tilesX * tileSize;
	canvas.height = tilesY * tileSize;

	for (let y = 0; y < tilesY; y++) {
		for (let x = 0; x < tilesX; x++) {
			drawTile(ctx, currentScene.map.bgtile, x * tileSize, y * tileSize);
		}
	}
}

function drawTile(ctx, tile, x, y) {
	if (tile == null) return;

	const tileImage = assets.tileset.ow[tile];

	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(tileImage, x, y);
}

function paintPlayer() {
	ctx.imageSmoothingEnabled = false;
	drawSprite(ctx, player.costume, player.x - camera.x, player.y - camera.y - 8);
}

function drawPlayerShadow() {
	ctx.globalAlpha = 0.2;
	ctx.imageSmoothingEnabled = false;
	drawSprite(ctx, player.costume, player.x - camera.x, player.y - camera.y - 8);
	ctx.globalAlpha = 1;
}

function drawSprite(
	ctx,
	image,
	x,
	y,
	w = image.width,
	h = image.height,
	ox = image.width / 2,
	oy = image.height / 2
) {
	if (ox == null) {
		ox = image.width / 2;
	}

	if (oy == null) {
		oy = image.height / 2;
	}

	if (w == null) {
		w = image.width;
	}

	if (h == null) {
		h = image.height;
	}

	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(image, x - ox, y - oy, w, h);
}

function drawBackLayers() {
	drawBehind();
	drawDynBehind();
}

function drawFrontLayers() {
	drawDynTop();
	drawTop();
}

function drawBehind() {
	ctx.imageSmoothingEnabled = false;
	buffers.behind.forEach((data) => {
		ctx.drawImage(data.ctx.canvas, -camera.x, -camera.y);

		data.anidraw.forEach((tile) => {
			const tileAnim = animated[tile.tile];
			const frame = Math.floor(((frames / 30) * tileAnim.speed) % tileAnim.frames);

			const tileImage = assets.tileset.ow[tile.tile + frame];

			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(
				tileImage,
				tile.x * tileSize - camera.x,
				tile.y * tileSize - camera.y
			);
		});
	});
}

function drawDynBehind() {
	DynCtx.imageSmoothingEnabled = false;
	buffers.dynamic.forEach((data) => {
		DynCtx.drawImage(data.ctx.canvas, 0, 0);

		data.anidraw.forEach((tile) => {
			const tileAnim = animated[tile.tile];
			const frame = Math.floor(((frames / 30) * tileAnim.speed) % tileAnim.frames);

			const tileImage = assets.tileset.ow[tile.tile + frame];

			DynCtx.imageSmoothingEnabled = false;
			DynCtx.drawImage(tileImage, tile.x * tileSize, tile.y * tileSize);
		});
	});

	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(DynCanvas, -camera.x, -camera.y);
}

function drawDynTop() {
	const tmpCanvas = document.createElement("canvas");
	const tmpCtx = tmpCanvas.getContext("2d");
	const cut = Math.floor(player.y / 16) * 16;

	tmpCanvas.width = DynCanvas.width;
	tmpCanvas.height = DynCanvas.height - cut;

	tmpCtx.imageSmoothingEnabled = false;
	tmpCtx.drawImage(DynCanvas, 0, -cut);

	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(tmpCanvas, -camera.x, cut - camera.y);
}

function drawTop() {
	ctx.imageSmoothingEnabled = false;
	buffers.top.forEach((data) => {
		ctx.drawImage(data.ctx.canvas, -camera.x, -camera.y);

		data.anidraw.forEach((tile) => {
			const tileAnim = animated[tile.tile];
			const frame = Math.floor(((frames / 30) * tileAnim.speed) % tileAnim.frames);

			const tileImage = assets.tileset.ow[tile.tile + frame];

			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(
				tileImage,
				tile.x * tileSize - camera.x,
				tile.y * tileSize - camera.y
			);
		});
	});
}

function updateBehindBuffers() {
	buffers.behind = [];

	currentScene.map.data.behind.forEach((layer) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		let anidraw = [];

		canvas.width = currentScene.map.data.behind[0][0].length * tileSize;
		canvas.height = currentScene.map.data.behind[0].length * tileSize;

		layer.forEach((row, y) => {
			row.forEach((tile, x) => {
				if (typeof animated[tile] == "undefined") {
					drawTile(ctx, tile, x * tileSize, y * tileSize);
				} else {
					anidraw.push({
						tile: tile,
						x: x,
						y: y,
					});
				}

				if (tile != null && typeof colls.tiles[tile] != "undefined") {
					grid[y][x].push(tile);
				}
			});
		});

		const data = {
			ctx: ctx,
			anidraw: anidraw,
		};

		buffers.behind.push(data);
	});
}

function updateTopBuffers() {
	buffers.top = [];

	currentScene.map.data.top.forEach((layer) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		let anidraw = [];

		canvas.width = currentScene.map.data.top[0][0].length * tileSize;
		canvas.height = currentScene.map.data.top[0].length * tileSize;

		layer.forEach((row, y) => {
			row.forEach((tile, x) => {
				if (typeof animated[tile] == "undefined") {
					drawTile(ctx, tile, x * tileSize, y * tileSize);
				} else {
					anidraw.push({
						tile: tile,
						x: x,
						y: y,
					});
				}
			});
		});

		const data = {
			ctx: ctx,
			anidraw: anidraw,
		};

		buffers.top.push(data);
	});
}

function updateDynamicBuffers() {
	buffers.dynamic = [];

	currentScene.map.data.dynamic.forEach((layer) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		let anidraw = [];

		canvas.width = currentScene.map.data.dynamic[0][0].length * tileSize;
		canvas.height = currentScene.map.data.dynamic[0].length * tileSize;

		DynCanvas.width = canvas.width;
		DynCanvas.height = canvas.height;

		layer.forEach((row, y) => {
			row.forEach((tile, x) => {
				if (typeof animated[tile] == "undefined") {
					drawTile(ctx, tile, x * tileSize, y * tileSize);
				} else {
					anidraw.push({
						tile: tile,
						x: x,
						y: y,
					});
				}

				if (tile != null && typeof colls.tiles[tile] != "undefined") {
					grid[y][x].push(tile);
				}
			});
		});

		const data = {
			ctx: ctx,
			anidraw: anidraw,
		};

		buffers.dynamic.push(data);
	});
}

function mimicSize() {
	const w = currentScene.map.data.behind[0][0].length * tileSize;
	const h = currentScene.map.data.behind[0].length * tileSize;

	while (grid.length < h) {
		grid.push([]);
	}

	for (let i = 0; i < h; i++) {
		while (grid[i].length < w) {
			grid[i].push([]);
		}
	}
}
