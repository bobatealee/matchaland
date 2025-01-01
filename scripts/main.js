// variables
var year = "2025";
var version = "2.21.0";

// game mode check
const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
var gameMode = params.game;

document.addEventListener("DOMContentLoaded", (event) => {
	document.getElementById("dividerButton").addEventListener("click", dividerToggle);

	if (gameMode == 1) {
		document.documentElement.classList.add("gameMode");

		document.querySelectorAll(".siteLink").forEach((siteLink) => {
			siteLink.href = siteLink.href+"?game=1";
		});

		document.querySelectorAll(".external").forEach((link) => {
			link.removeAttribute("href");
		});
	}

	document.getElementById("footerContent").innerHTML = '© 2020-'+year+' boba<br><span id="footerVersion">v'+version+'</span>';

	// notice; comment out as necessary
	// document.getElementById('container').insertAdjacentHTML('beforebegin', '<div id="notice"><div id="noticeInner"><marquee>• Sourcemod is currently disabled on our TF2 servers due to the Halloween update. Sorry for the inconvenience! •</marquee></div></div>');
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
	} else {
		document.getElementById("sidebar").classList.add("show");
		document.getElementById("dividerButton").innerHTML = "Links ▲";
	}
}