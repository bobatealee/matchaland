// title outlines
document.addEventListener('DOMContentLoaded', (event) => {
	$(function() {
		$('.titleOutline').attr('letter', function() {return $(this).html();});
	});

	for (let i = 0; i < document.getElementsByClassName("desktopButton").length; i++) {
		document.getElementsByClassName("desktopButton")[i].style.backgroundPosition = -(i*32)+"px 0px";
	}
});

// preload images
new Image().src = "images/boba.png";
new Image().src = "images/desktopicons.png";
new Image().src = "images/windowbuttons2.png";

// preload sounds
const toy1 = new Audio("sounds/toy1.mp3");
const toy2 = new Audio("sounds/toy2.mp3");
const toy3 = new Audio("sounds/toy3.mp3");
const toy4 = new Audio("sounds/toy4.mp3");
const toy5 = new Audio("sounds/toy5.mp3");
const toy6_1 = new Audio("sounds/toy6_1.mp3");
const toy6_2 = new Audio("sounds/toy6_2.mp3");
const toy6_3 = new Audio("sounds/toy6_3.mp3");
const toy6_4 = new Audio("sounds/toy6_4.mp3");
const toy6_5 = new Audio("sounds/toy6_5.mp3");
const toy6_6 = new Audio("sounds/toy6_6.mp3");
const toy6_7 = new Audio("sounds/toy6_7.mp3");
const toy7 = new Audio("sounds/toy7.mp3");
const toy8 = new Audio("sounds/toy8.mp3");
const toy9 = new Audio("sounds/toy9.mp3");

// title toy 1
var toy1Var = false;
function toy1Toggle() {
	document.getElementById("titleLetter1").classList.toggle("rainbow");
	toy1Var = !toy1Var;
	if (toy1Var == true) {
		document.querySelector('html').style.setProperty('--htmlOpacity', '1');
		document.querySelector('#content').style.setProperty('--contentOpacity', '1');
	} else {
		document.querySelector('html').style.setProperty('--htmlOpacity', '0');
		document.querySelector('#content').style.setProperty('--contentOpacity', '0');
	}
	toy1.load();
	toy1.play();
};

// title toy 2
function toy2Toggle() {
	document.getElementById("titleLetter2").classList.remove("rainbowTemp");
	document.getElementById("titleLetter2").offsetWidth;
	document.getElementById("titleLetter2").classList.add("rainbowTemp");
	document.getElementById("titleLetter2").classList.toggle("toy2Boba");
	toy2.load();
	toy2.play();
};

// title toy 3
function toy3Toggle() {
	document.getElementById("titleLetter3").classList.toggle("rainbow");
	document.querySelectorAll("a").forEach((link) => {
		link.classList.toggle("toy3Link");
	});
	document.querySelectorAll(".desktopButtonContainer").forEach((desktopButtonContainer) => {
		desktopButtonContainer.classList.toggle("toy3DesktopButtonContainer");
	});
	document.querySelectorAll(".desktopButtonText").forEach((desktopButtonText) => {
		desktopButtonText.classList.toggle("toy3DesktopButtonText");
	});
	document.querySelectorAll(".textbox").forEach((textbox) => {
		textbox.classList.toggle("toy3Textbox");
	});
	document.querySelectorAll(".textboxHeader").forEach((textboxHeader) => {
		textboxHeader.classList.toggle("toy3TextboxHeader");
	});
	document.querySelectorAll(".windowButton").forEach((windowButton) => {
		windowButton.classList.toggle("toy3WindowButton");
	});
	document.querySelectorAll(".tooltip").forEach((tooltip) => {
		tooltip.classList.toggle("toy3Tooltip");
	});
	document.querySelectorAll(".container").forEach((container) => {
		container.classList.toggle("toy3Container");
	});
	toy3.load();
	toy3.play();
};

// title toy 4
function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY
	};
}

// a little bit messy and inheried from the old site, but it will do
function createParticle (x, y) {
	const toy4Particle = document.createElement('toy4Particle');
	document.body.appendChild(toy4Particle);

	const size = Math.floor(Math.random() * 10 + 5);
	toy4Particle.style.width = `${size}px`;
	toy4Particle.style.height = `${size}px`;
	toy4Particle.style.background = `hsl(${Math.random() * 360 + 360}, 100%, 50%)`;

	const destinationX = x + (Math.random() - 0.5) * 2 * 50;
	const destinationY = y + (Math.random() - 0.5) * 2 * 50;

	const animation = toy4Particle.animate([
		{
			transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
			opacity: 1
		},
		{
			transform: `translate(${destinationX}px, ${destinationY}px)`,
			opacity: 0
		}
	], {
		duration: Math.random() * 1000 + 750,
		easing: 'cubic-bezier(0, .9, .57, 1)',
		delay: Math.random() * 1
	});

	animation.onfinish = () => {
		toy4Particle.remove();
	};
}

function toy4Toggle() {
	document.getElementById("titleLetter4").classList.remove("rainbowTemp");
	document.getElementById("titleLetter4").offsetWidth;
	document.getElementById("titleLetter4").classList.add("rainbowTemp");
	for (let i = 0; i < 7; i++) {
		if (toy9Var == false) {
			createParticle((getOffset(document.querySelector('#titleLetter4')).left)+15, (getOffset(document.querySelector('#titleLetter4')).top)+55);
		} else {
			createParticle((getOffset(document.querySelector('#titleLetter4')).left)+15, (getOffset(document.querySelector('#titleLetter4')).top)+25);
		}
	}
	toy4.load();
	toy4.play();
};

// title toy 5
function toy5Toggle() {
	document.getElementById("titleLetter5").classList.toggle("rainbow");
	document.querySelectorAll(".textbox").forEach((textbox) => {
		textbox.classList.toggle("toy5Observer");
	});
	toy5.load();
	toy5.play();
};

// title toy 6
var toy6Var = 0;
function toy6Toggle() {
	toy6Var = toy6Var + 1;
	document.getElementById("titleLetter6").classList.add("rainbow");
	if (toy6Var == 1) {
		document.getElementById("html").classList.add("toy6Hue");
		toy6_1.load();
		toy6_1.play();
	}
	if (toy6Var == 2) {
		document.getElementById("html").classList.remove("toy6Hue");
		document.getElementById("html").classList.add("toy6Invert");
		toy6_2.load();
		toy6_2.play();
	}
	if (toy6Var == 3) {
		document.getElementById("html").classList.remove("toy6Invert");
		document.getElementById("html").classList.add("toy6Sepia");
		toy6_3.load();
		toy6_3.play();
	}
	if (toy6Var == 4) {
		document.getElementById("html").classList.remove("toy6Sepia");
		document.getElementById("html").classList.add("toy6Blur");
		toy6_4.load();
		toy6_4.play();
	}
	if (toy6Var == 5) {
		document.getElementById("html").classList.remove("toy6Blur");
		document.getElementById("html").classList.add("toy6Saturate");
		toy6_5.load();
		toy6_5.play();
	}
	if (toy6Var == 6) {
		document.getElementById("html").classList.remove("toy6Saturate");
		document.getElementById("html").classList.add("toy6Grayscale");
		toy6_6.load();
		toy6_6.play();
	}
	if (toy6Var > 6) {
		document.getElementById("html").classList.remove("toy6Grayscale");
		document.getElementById("titleLetter6").classList.remove("rainbow");
		toy6Var = 0;
		toy6_7.load();
		toy6_7.play();
	}
};

// title toy 7
var toy7Var = false;
function toy7Toggle() {
	if (toy7Var == false) {
		toy7Var = true;
		document.getElementById("titleLetter7").classList.remove("toy7Die");
		document.getElementById("titleLetter7").offsetWidth;
		document.getElementById("titleLetter7").classList.add("toy7Die");
		toy7.load();
		toy7.play();
		$("#titleLetter7").one("animationend", function(event) {
			document.getElementById("titleLetter7").classList.remove("toy7Die");
			toy7Var = false;
		});
	}
	
};

// title toy 8
function toy8Toggle() {
	document.getElementById("titleLetter8").classList.remove("rainbowTemp");
	document.getElementById("titleLetter8").offsetWidth;
	document.getElementById("titleLetter8").classList.add("rainbowTemp");
	textboxToggle(3);
	toy8.load();
	toy8.play();
};

// title toy 9
var toy9Var = false;
function toy9Toggle() {
	document.getElementById("titleLetter9").classList.toggle("rainbow");
	toy9Var = !toy9Var;
	if (toy9Var == true) {
		document.querySelector('html').style.setProperty('--htmlBackground', '#FFEAF8');
	} else {
		document.querySelector('html').style.setProperty('--htmlBackground', '#CCE5FF');
	}
	document.getElementById("content").classList.toggle("toy9Content");
	document.getElementById("html").classList.toggle("toy9Html");
	toy9.load();
	toy9.play();
};

// textbox opening/closing
function textboxToggle(x, button) {
	document.getElementById("textbox"+x).classList.toggle("hidden");
	document.getElementById("desktopButton"+x).classList.toggle("hidden");
	document.getElementById("textbox"+x).classList.remove("minimized");
	document.getElementById("textbox"+x).classList.remove("maximized");
	$("#textbox"+x).find("*").removeClass("windowButtonMaxUndo");
};

// textbox minimizing
function textboxMinimize(x) {
	document.getElementById("textbox"+x).classList.toggle("minimized");
};

// textbox maximizing
function textboxMaximize(x, button) {
	document.getElementById("textbox"+x).classList.toggle("maximized");
	button.classList.toggle("windowButtonMaxUndo");
};