const servers = [
	{
		"id": "minecraft",
		"name": "matchaland.net | Minecraft 1.21 Survival",
		"ip": "199.247.78.239:10010",
		"game": "minecraft",
		"overridemap": "matchaland",
		"dynmap": "199.247.78.239:10015"
	},
	{
		"id": "minecraft_creative",
		"name": "matchaland.net | Minecraft 1.21 Creative",
		"ip": "199.247.78.239:10020",
		"game": "minecraft",
		"overridemap": "matchaland_creative",
		"dynmap": "199.247.78.239:10025"
	},
	{
		"id": "minecraftbeta",
		"name": "matchaland.net | Minecraft b1.7.3 Survival",
		"ip": "199.247.78.239:11011",
		"game": "minecraftbeta",
		"overridename": "matchaland.net | Minecraft b1.7.3 Survival",
		"overridemap": "matchaland_beta",
		"dynmap": "199.247.78.239:11015",
	},
	{
		"id": "tf2_standard1",
		"name": "matchaland.net | TF2 Standard Maps",
		"ip": "199.247.78.239:20010",
		"game": "tf2"
	},
	{
		"id": "tf2_custom1",
		"name": "matchaland.net | TF2 Custom Maps",
		"ip": "199.247.78.239:20020",
		"game": "tf2"
	},
	{
		"id": "tf2_grabbag1",
		"name": "matchaland.net | TF2 Grab Bag",
		"ip": "199.247.78.239:20030",
		"game": "tf2"
	},
	{
		"id": "tf2_mvm1",
		"name": "matchaland.net | TF2 MvM",
		"ip": "199.247.78.239:20040",
		"game": "tf2"
	},
	{
		"id": "tf2classic_standard1",
		"name": "matchaland.net | TF2C Standard Maps",
		"ip": "199.247.78.239:21010",
		"game": "hl2dm",
		"overridegame": "tf2classic"
	},
	{
		"id": "tf2classic_custom1",
		"name": "matchaland.net | TF2C Custom Maps",
		"ip": "199.247.78.239:21020",
		"game": "hl2dm",
		"overridegame": "tf2classic"
	},
	{
		"id": "tf2classic_grabbag1",
		"name": "matchaland.net | TF2C Grab Bag",
		"ip": "199.247.78.239:21030",
		"game": "hl2dm",
		"overridegame": "tf2classic"
	},
	{
		"id": "dmc",
		"name": "matchaland.net | DMC Grab Bag",
		"ip": "199.247.78.239:30010",
		"game": "dmc"
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