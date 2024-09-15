const ip = new URLSearchParams(window.location.search).keys().next().value;
const hostname = ip.replace(/\:(.*)/, "");
const regexIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::(?:[1-9]\d{0,3}|[1-5]\d{4}|6(?:[0-4]\d{3}|5(?:[0-4]\d{2}|5(?:[0-2]\d|3[0-5])))))?$/;
const regexHostname = /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,})(?::(?:[1-9]\d{0,3}|[1-5]\d{4}|6(?:[0-4]\d{3}|5(?:[0-4]\d{2}|5(?:[0-2]\d|3[0-5])))))?$/;

const API_BASE_URL = "https://api.raccoonlagoon.com/v1/";
if (regexHostname.test(ip)) {
	// if our IP is a hostname
	fetchBaseIP();
} else if (regexIP.test(ip)) {
	// if our IP is not a hostname
	connect(ip);
} else {
	// give up
	window.location.replace("https://matchaland.net/404");
}

// fetch base IP
function fetchBaseIP() {
	const url = `${API_BASE_URL}resolve-dns?hostname=${hostname}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				window.location.replace("https://matchaland.net/404");
			} else {
				connect(data.address+ip.replace(/^[^:]*/, ""));
			}
		})
		.catch((error) => console.error("Error fetching IP:", error));
}

// good to go, connect
function connect(connectIP) {
	window.location.href = `steam://connect/${connectIP}`;
	window.location.replace("https://matchaland.net/servers");
}