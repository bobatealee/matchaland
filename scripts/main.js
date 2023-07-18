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
		document.documentElement.classList.add("gameMode");

		document.querySelectorAll(".siteLink").forEach((siteLink) => {
			siteLink.href = siteLink.href+"?game=1"
		});

		document.querySelectorAll(".external").forEach((link) => {
			link.removeAttribute("href");
		});
	}
});

// preload images
new Image().src = "/images/background.png";
new Image().src = "/images/logo.png";
new Image().src = "/images/backgroundLogo.png";
new Image().src = "/images/backgroundNavSpacer.png";
new Image().src = "/images/matchaHeader.png";
new Image().src = "/images/backgroundDividerLeft.png";
new Image().src = "/images/backgroundDivider.png";
new Image().src = "/images/backgroundDividerRight.png";
new Image().src = "/images/backgroundSidebar.png";
new Image().src = "/images/backgroundPage.png";
new Image().src = "/images/backgroundTextboxTitle.png";
new Image().src = "/images/listDot.png";
new Image().src = "/images/backgroundFooterLeft.png";
new Image().src = "/images/backgroundFooter.png";
new Image().src = "/images/backgroundFooterRight.png";

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