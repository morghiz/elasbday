let joystick = { x: 0, y: 0 };
let runButton = false;
const container = document.getElementById("joystick-container");
const stick = document.getElementById("joystick-stick");
const button = document.getElementById("run-button");
let maxRadius, stickRadius, containerRect;
let activeJoystickTouchId = null;

function updateDimensions() {
	containerRect = container.getBoundingClientRect();
	maxRadius = container.clientWidth / 2;
	stickRadius = stick.clientWidth / 2;
}

function getPointerPosition(e, touchId = null) {
	let clientX, clientY;
	if (e.touches) {
		let touch = null;
		if (touchId !== null) {
			for (let i = 0; i < e.touches.length; i++) {
				if (e.touches[i].identifier === touchId) {
					touch = e.touches[i];
					break;
				}
			}
		} else {
			touch = e.touches[0];
		}
		if (touch) {
			clientX = touch.clientX;
			clientY = touch.clientY;
		} else {
			return null;
		}
	} else {
		clientX = e.clientX;
		clientY = e.clientY;
	}
	const x = clientX - containerRect.left - maxRadius;
	const y = clientY - containerRect.top - maxRadius;
	return { x, y };
}

function onStart(e) {
	e.preventDefault();
	updateDimensions();
	if (e.touches && e.touches.length > 0) {
		if (activeJoystickTouchId === null) {
			activeJoystickTouchId = e.touches[0].identifier;
			stick.style.transition = "background 0.2s";
			stick.style.background = "rgba(0,0,0,0.6)";
			onMove(e);
		}
	} else if (e.button === 0) {
		activeJoystickTouchId = "mouse";
		stick.style.transition = "background 0.2s";
		stick.style.background = "rgba(0,0,0,0.6)";
	}
}

function onMove(e) {
	let currentTouchId = null;
	if (e.touches) {
		for (let i = 0; i < e.touches.length; i++) {
			if (e.touches[i].identifier === activeJoystickTouchId) {
				currentTouchId = e.touches[i].identifier;
				break;
			}
		}
	} else if (activeJoystickTouchId === "mouse") {
		currentTouchId = "mouse";
	}
	if (currentTouchId === null) return;

	const pos = getPointerPosition(e, currentTouchId);
	if (!pos) return;

	const dist = Math.hypot(pos.x, pos.y);
	const angle = Math.atan2(pos.y, pos.x);

	const limitedDist = Math.min(dist, maxRadius - stickRadius);
	const x = limitedDist * Math.cos(angle);
	const y = limitedDist * Math.sin(angle);

	stick.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
	joystick.x = parseFloat((x / (maxRadius - stickRadius)).toFixed(2));
	joystick.y = parseFloat((y / (maxRadius - stickRadius)).toFixed(2));
}

function onEnd(e) {
	let touchEndedForJoystick = false;
	if (e.changedTouches) {
		for (let i = 0; i < e.changedTouches.length; i++) {
			if (e.changedTouches[i].identifier === activeJoystickTouchId) {
				touchEndedForJoystick = true;
				break;
			}
		}
	} else if (activeJoystickTouchId === "mouse") {
		touchEndedForJoystick = true;
	}
	if (touchEndedForJoystick) {
		activeJoystickTouchId = null;
		stick.style.transition = "transform 0.2s, background 0.2s";
		stick.style.transform = "translate(-50%, -50%)";
		stick.style.background = "rgba(0,0,0,0.4)";
		joystick.x = 0;
		joystick.y = 0;
	}
}

window.addEventListener("load", () => {
	updateDimensions();
	stick.addEventListener("mousedown", onStart);
	stick.addEventListener("touchstart", onStart, { passive: false });
	window.addEventListener("mousemove", onMove);
	window.addEventListener("touchmove", onMove, { passive: false });
	window.addEventListener("mouseup", onEnd);
	window.addEventListener("touchend", onEnd);
	window.addEventListener("touchcancel", onEnd);

	if (button) {
		button.addEventListener("mousedown", () => {
			window.runButton = true;
		});
		button.addEventListener("mouseup", () => {
			window.runButton = false;
		});
		button.addEventListener("mouseleave", () => {
			window.runButton = false;
		});
		button.addEventListener(
			"touchstart",
			(e) => {
				window.runButton = true;
			},
			{ passive: true }
		);
		button.addEventListener("touchend", () => {
			window.runButton = false;
		});
		button.addEventListener("touchcancel", () => {
			window.runButton = false;
		});
	}
});

document.addEventListener(
	"touchstart",
	() => {
		showControls();
	},
	{ once: true }
);

function showControls() {
	container.classList.remove("notouch");
	button.classList.remove("notouch");
}