var params = [];
for (const key of new URLSearchParams(window.location.search).keys()) {
	params.push(key);
}
var ip = params[0];
const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::(?:[1-9]\d{0,3}|[1-5]\d{4}|6(?:[0-4]\d{3}|5(?:[0-4]\d{2}|5(?:[0-2]\d|3[0-5])))))?$/;

document.addEventListener('DOMContentLoaded', (event) => {
	if (regex.test(ip)) {
		window.location.replace("steam://connect/"+ip);
		window.location.replace("https://matchaland.net/servers");
	} else {
		window.location.replace("https://matchaland.net/404");
	}
});