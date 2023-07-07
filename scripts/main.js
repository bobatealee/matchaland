const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
var gameMode = params.game;

document.addEventListener('DOMContentLoaded', (event) => {
	// title outlines
	$(function() {
		$('.titleOutline').attr('letter', function() {return $(this).html();});
	});

	if (gameMode == 1) {
		document.body.classList.add("gameMode");
	}

	for (let i = 0; i < document.getElementsByClassName("desktopButton").length; i++) {
		document.getElementsByClassName("desktopButton")[i].style.backgroundPosition = -(i*32)+"px 0px";
	}
});