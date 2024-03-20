const servers = [
	{
		"id": "tf2_standard1",
		"name": "matchaland.net | TF2 Standard Maps + Custom Classes",
		"ip": "64.5.76.253:27015",
		"game": "tf2"
	},
	{
		"id": "tf2_custom1",
		"name": "matchaland.net | TF2 Custom Maps + Custom Classes",
		"ip": "64.5.76.253:27045",
		"game": "tf2"
	},
	{
		"id": "tf2_mvm1",
		"name": "matchaland.net | TF2 MvM + Custom Classes",
		"ip": "64.5.76.253:27055",
		"game": "tf2"
	},
	{
		"id": "tf2_mge1",
		"name": "matchaland.net | TF2 MGE + Custom Classes",
		"ip": "64.5.76.253:27065",
		"game": "tf2"
	},
	{
		"id": "tf2classic_standard1",
		"name": "matchaland.net | TF2C Standard Maps + Bhop",
		"ip": "64.5.76.253:27025",
		"game": "hl2dm",
		"overridegame": "tf2classic"
	},
	{
		"id": "tf2classic_custom1",
		"name": "matchaland.net | TF2C Custom Maps + Bhop",
		"ip": "64.5.76.253:27035",
		"game": "hl2dm",
		"overridegame": "tf2classic"
	},
	{
		"id": "dmc",
		"name": "matchaland.net | Half-Life DMC",
		"ip": "64.5.76.253:17015",
		"game": "dmc"
	},
	{
		"id": "minecraft",
		"name": "matchaland.net | Minecraft 1.20.4 Survival",
		"ip": "64.5.76.253:25565",
		"game": "minecraft",
		"overridemap": "matchaland",
		"dynmap": "64.5.76.253:8123"
	},
	{
		"id": "minecraftbeta",
		"name": "matchaland.net | Minecraft b1.7.3 Survival",
		"ip": "64.5.76.253:25576",
		"game": "minecraftbeta",
		"overridename": "matchaland.net | Minecraft b1.7.3 Survival",
		"overridemap": "matchaland_beta",
		"dynmap": "64.5.76.253:8133",
	}
];

// loop through every server
document.addEventListener('DOMContentLoaded', (event) => {
	servers.forEach(server => listServer(server));
	servers.forEach(server => fetchServerData(server));
});

// generate dummy server entries
function listServer(server) {
	const id = server.id;
	const name = server.overridename ? server.overridename : server.name;
	const game = server.overridegame ? server.overridegame : server.game;

	const container = document.getElementById("servers");
	const serverElement = document.createElement("div");
	serverElement.id = id;
	serverElement.className = "server";
	// temp
	serverElement.style.width = "100%";

	serverElement.innerHTML =`
		<img class="serverMap" src="https://resources.matchaland.net/maps/unknown.png" />

		<div class="serverInfo">
			<div class="serverTitle">
				<img class="serverStatus" src="https://resources.matchaland.net/status/offline.png" />
				<img class="serverGame" src="https://resources.matchaland.net/games/${game}.png" onerror="this.onerror=null; this.src='https://resources.matchaland.net/games/unknown.png';" />
				<div>${name}</div>
			</div>
		</div>
`

	container.appendChild(serverElement);
}

// fetch server data from api
function fetchServerData(server) {
	const id = server.id;
	const ip = server.ip;
	const game = server.game;

	const overridename = server.overridename;
	const overridegame = server.overridegame;
	const overridemap = server.overridemap;
	const dynmap = server.dynmap;

	const url = `https://api.raccoonlagoon.com/v1/server-info?ip=${ip}&g=${game}`;
	fetch(url)
		.then(response => response.json())
		.then(data => displayServerData(data, id, server.overridegame ? server.overridegame : game, overridename, overridemap, dynmap))
		.catch(error => console.error("Error fetching server data:", error));
}

// display server data once fetched
function displayServerData(data, id, game, overridename, overridemap, dynmap) {
	const serverElement = document.getElementById(id);

	const cleanServerName = (overridename ? overridename : data.serverName).replace(/�./g, "");

	const numOfBots = data.numBots > 0 ? ` (${data.numBots} Bots)` : ""; // only show bots if there are any

	// only show the table if there are players
/*
	const playerListTable = data.humanData.length > 0 ? `
	<table>
	<tr>
		<th>Name</th>
		<th>Score</th>
		<th>Time Played</th>
	</tr>${data.humanData.map(player => {
		return `<tr><td>${player.name}</td><td>${player.score}</td><td>${convertTime(player.time)}</td></tr>`;
	}).join("")}` : "";
*/

	serverElement.innerHTML = `
		<img class="serverMap" src="https://resources.matchaland.net/maps/${game}/${overridemap ? overridemap : data.currentMap}.png" onerror="this.onerror=null; this.src='https://resources.matchaland.net/maps/unknown.png';" />

		<div class="serverInfo">
			<div class="serverTitle">
				<img class="serverStatus" src="https://resources.matchaland.net/status/online.png" />
				<img class="serverGame" src="https://resources.matchaland.net/games/${game}.png" onerror="this.onerror=null; this.src='https://resources.matchaland.net/games/unknown.png';" />
				<div>${cleanServerName}</div>
			</div>

			<div><b>IP:</b> ${data.serverIP}</div>
			<div><b>Map:</b> ${overridemap ? overridemap : data.currentMap}</div>
			<div><b>Players:</b> ${data.numHumans}/${data.maxClients} ${numOfBots}</div>
		</div>

		<div class="serverButtons">
			<a href="${id}" class="serverButton" draggable="false">Info</a>
			<a href="${dynmap ? "http://"+dynmap : "steam://connect/"+data.serverIP}" class="serverButton connect" draggable="false">${dynmap ? "Dynmap" : "Connect"}</a>
		</div>
	`;
}

const SECONDS_IN_DAY = 24 * 60 * 60;
const SECONDS_IN_HOUR = 60 * 60;
const SECONDS_IN_MINUTE = 60;

function convertTime(time) {
	const days = Math.floor(time / SECONDS_IN_DAY);
	const hours = Math.floor((time % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
	const minutes = Math.floor((time % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
	const seconds = Math.floor(time % SECONDS_IN_MINUTE);

	let formattedTime = "";

	// only show applicable time units
	if (days > 0) formattedTime += `${days}d `;
	if (hours > 0) formattedTime += `${hours}h `;
	if (minutes > 0 || hours > 0) formattedTime += `${minutes}m `;

	formattedTime += `${seconds.toString()}s`; // add seconds
	return formattedTime; // return formatted time string
}