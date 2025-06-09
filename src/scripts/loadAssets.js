var src = "../src/"

const toLoad = {
    tileset: {
        ow: src + "img/tileset.png"
    },
	sprites: {
		player: {
			idle0: src + "img/player/1-idle0.png",
			idle90: src + "img/player/2-idle90.png",
			idle180: src + "img/player/3-idle180.png",
			idle270: src + "img/player/4-idle-90.png",

			walk0: [
				src + "img/player/5-walk0.png",
				src + "img/player/6-walk0.1.png",
				src + "img/player/7-walk0.2.png",
				src + "img/player/8-walk0.3.png",
				src + "img/player/9-walk0.4.png",
				src + "img/player/10-walk0.5.png",
			],
			walk90: [
				src + "img/player/11-walk90.png",
				src + "img/player/12-walk90.1.png",
				src + "img/player/13-walk90.2.png",
				src + "img/player/14-walk90.3.png",
				src + "img/player/15-walk90.4.png",
				src + "img/player/16-walk90.5.png",
			],
			walk180: [
				src + "img/player/17-walk180.png",
				src + "img/player/18-walk180.1.png",
				src + "img/player/19-walk180.2.png",
				src + "img/player/20-walk180.3.png",
				src + "img/player/21-walk180.4.png",
				src + "img/player/22-walk180.5.png",
			],
			walk270: [
				src + "img/player/23-walk-90.png",
				src + "img/player/24-walk-90.1.png",
				src + "img/player/25-walk-90.2.png",
				src + "img/player/26-walk-90.3.png",
				src + "img/player/27-walk-90.4.png",
				src + "img/player/28-walk-90.5.png",
			],
		},

		fullscreen: {
			enter: src + "img/fs_enter.svg",
			exit: src + "img/fs_exit.svg",
		},

		objs: {
			hairstraightener: src + "img/objs/hairstraightener.png",
		},
	},
	sounds: {
		player: {
			footstep: {
				grass: [
					src + "snd/footsteps/grass/1.wav",
					src + "snd/footsteps/grass/2.wav",
					src + "snd/footsteps/grass/3.wav",
					src + "snd/footsteps/grass/4.wav",
					src + "snd/footsteps/grass/5.wav",
					src + "snd/footsteps/grass/6.wav",
					src + "snd/footsteps/grass/7.wav",
					src + "snd/footsteps/grass/8.wav",
				],
				dirt: [
					src + "snd/footsteps/dirt/1.mp3",
					src + "snd/footsteps/dirt/2.mp3",
					src + "snd/footsteps/dirt/3.mp3",
					src + "snd/footsteps/dirt/4.mp3",
					src + "snd/footsteps/dirt/5.mp3",
					src + "snd/footsteps/dirt/6.mp3",
					src + "snd/footsteps/dirt/7.mp3",
					src + "snd/footsteps/dirt/8.mp3",
					src + "snd/footsteps/dirt/9.mp3",
					src + "snd/footsteps/dirt/10.mp3",
					src + "snd/footsteps/dirt/11.mp3",
					src + "snd/footsteps/dirt/12.mp3",
					src + "snd/footsteps/dirt/13.mp3",
					src + "snd/footsteps/dirt/14.mp3",
					src + "snd/footsteps/dirt/15.mp3",
					src + "snd/footsteps/dirt/16.mp3",
					src + "snd/footsteps/dirt/17.mp3",
					src + "snd/footsteps/dirt/18.mp3",
					src + "snd/footsteps/dirt/19.mp3",
					src + "snd/footsteps/dirt/20.mp3",
					src + "snd/footsteps/dirt/21.mp3",
					src + "snd/footsteps/dirt/22.wav",
					src + "snd/footsteps/dirt/23.wav",
					src + "snd/footsteps/dirt/24.wav",
					src + "snd/footsteps/dirt/25.wav",
					src + "snd/footsteps/dirt/26.wav",
					src + "snd/footsteps/dirt/27.wav",
					src + "snd/footsteps/dirt/28.wav",
					src + "snd/footsteps/dirt/29.wav",
				],
				floor: [
					src + "snd/footsteps/floor/1.mp3",
					src + "snd/footsteps/floor/2.mp3",
					src + "snd/footsteps/floor/3.mp3",
					src + "snd/footsteps/floor/4.mp3",
					src + "snd/footsteps/floor/5.mp3",
					src + "snd/footsteps/floor/6.mp3",
					src + "snd/footsteps/floor/7.mp3",
					src + "snd/footsteps/floor/8.mp3",
					src + "snd/footsteps/floor/9.mp3",
					src + "snd/footsteps/floor/10.mp3",
					src + "snd/footsteps/floor/11.mp3",
					src + "snd/footsteps/floor/12.mp3",
					src + "snd/footsteps/floor/13.mp3",
					src + "snd/footsteps/floor/14.mp3",
					src + "snd/footsteps/floor/15.mp3",
					src + "snd/footsteps/floor/16.mp3",
					src + "snd/footsteps/floor/17.mp3",
					src + "snd/footsteps/floor/18.mp3",
					src + "snd/footsteps/floor/19.mp3",
					src + "snd/footsteps/floor/20.mp3",
					src + "snd/footsteps/floor/21.mp3",
				],
				wood: [
					src + "snd/footsteps/wood/1.mp3",
					src + "snd/footsteps/wood/2.mp3",
					src + "snd/footsteps/wood/3.mp3",
					src + "snd/footsteps/wood/4.mp3",
					src + "snd/footsteps/wood/5.mp3",
					src + "snd/footsteps/wood/6.mp3",
					src + "snd/footsteps/wood/7.mp3",
					src + "snd/footsteps/wood/8.mp3",
					src + "snd/footsteps/wood/9.mp3",
					src + "snd/footsteps/wood/10.mp3",
					src + "snd/footsteps/wood/11.mp3",
					src + "snd/footsteps/wood/12.mp3",
					src + "snd/footsteps/wood/13.mp3",
					src + "snd/footsteps/wood/14.mp3",
					src + "snd/footsteps/wood/15.mp3",
					src + "snd/footsteps/wood/16.mp3",
					src + "snd/footsteps/wood/17.mp3",
					src + "snd/footsteps/wood/18.mp3",
					src + "snd/footsteps/wood/19.mp3",
					src + "snd/footsteps/wood/20.mp3",
					src + "snd/footsteps/wood/21.mp3",
				],
			},
		},
		ambience: [src + "snd/ambience/1.mp3"],
		vfx: {
			item: {
				pickup: [src + "snd/vfx/item_pickup.mp3"],
				discovery: [src + "snd/vfx/item_discovery.mp3"],
			},
		},
	},
};

let assets = {};

function loadImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(img);
		img.onerror = reject;
	});
}

function loadAudio(url) {
	return new Promise((resolve, reject) => {
		const audio = new Audio();
		audio.src = url;
		audio.oncanplaythrough = () => resolve(audio);
		audio.onerror = reject;
	});
}

function splitTileset(image, tileWidth = 16, tileHeight = 16) {
	const cols = Math.floor(image.width / tileWidth);
	const rows = Math.floor(image.height / tileHeight);
	const tiles = [];

	const canvas = document.createElement("canvas");
	canvas.width = tileWidth;
	canvas.height = tileHeight;
	const ctx = canvas.getContext("2d");

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			ctx.clearRect(0, 0, tileWidth, tileHeight);
			ctx.drawImage(
				image,
				x * tileWidth,
				y * tileHeight,
				tileWidth,
				tileHeight,
				0,
				0,
				tileWidth,
				tileHeight
			);
			const tile = document.createElement("canvas");
			tile.width = tileHeight;
			tile.height = tileWidth;
			tile.getContext("2d").drawImage(canvas, 0, 0);
			tiles.push(tile);
		}
	}

	return tiles;
}

async function loadValue(value, keyPath) {
	if (typeof value === "string") {
		const path = keyPath.join("/").toLowerCase();
		if (path.includes("tileset")) {
			const img = await loadImage(value);
			return splitTileset(img);
		} else if (path.includes("sounds")) {
			return await loadAudio(value);
		} else {
			return await loadImage(value); // default to image
		}
	} else if (Array.isArray(value)) {
		return await Promise.all(value.map((v, i) => loadValue(v, [...keyPath, i])));
	} else if (typeof value === "object" && value !== null) {
		const entries = await Promise.all(
			Object.entries(value).map(async ([k, v]) => {
				const loaded = await loadValue(v, [...keyPath, k]);
				return [k, loaded];
			})
		);
		return Object.fromEntries(entries);
	} else {
		return value;
	}
}

async function loadNestedResources(resourceDefinition) {
	assets = await loadValue(resourceDefinition, []);
	return assets;
}
