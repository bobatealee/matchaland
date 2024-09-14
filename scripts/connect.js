const ip = new URLSearchParams(window.location.search).keys().next().value;
const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::(?:[1-9]\d{0,3}|[1-5]\d{4}|6(?:[0-4]\d{3}|5(?:[0-4]\d{2}|5(?:[0-2]\d|3[0-5])))))?$/;

document.addEventListener('DOMContentLoaded', () => {
	if (regex.test(ip)) {
		window.location.href = `steam://connect/${ip}`;
		window.location.replace("https://matchaland.net/servers");
	} else {
		window.location.replace("https://matchaland.net/404");
    }
});