// game mode check
const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
var gameMode = params.game;

document.addEventListener('DOMContentLoaded', (event) => {
	// title outlines
	document.querySelectorAll(".textOutline").forEach((textOutline) => {
		textOutline.setAttribute("outline", textOutline.innerHTML);
	});

	document.getElementById("dividerButton").addEventListener('click', dividerToggle);

	if (gameMode == 1) {
		document.body.classList.add("gameMode");
	}
});

function dividerToggle() {
	if (document.getElementById("sidebar").classList.contains("show")) {
		document.getElementById("sidebar").classList.remove("show");
		document.getElementById("dividerButton").innerHTML = "Links ▼";
		document.getElementById("dividerButton").setAttribute("outline", document.getElementById("dividerButton").innerHTML);
	} else {
		document.getElementById("sidebar").classList.add("show");
		document.getElementById("dividerButton").innerHTML = "Links ▲";
		document.getElementById("dividerButton").setAttribute("outline", document.getElementById("dividerButton").innerHTML);
	}
}