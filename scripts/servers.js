// TODO: fix use of import here & research how
// to do that in vanilla js + browser context
import { forEach } from './servers.json';
import * as c from './constants.js';

// loop through every server
document.addEventListener('DOMContentLoaded', (event) => {
	forEach(server => listServer(server));
	forEach(server => fetchServerData(server));
});

// generate dummy server entries
function listServer(server) {

	// TODO: use object destructuring here instead,
	// and move as much of this as possible to constants.js
	const id = server.id;

	const name = server.overridename
		? server.overridename
		: server.name;

	const game = server.overridegame
		? server.overridegame
		: server.game;

	const container = document.getElementById("servers");
	const serverElement = document.createElement("div");

	serverElement.id = id;
	serverElement.className = "server";
	serverElement.style.width = "100%"; // temp

	serverElement.innerHTML =`
		<img class="serverMap" src=${c.unknownMapSrc} />

		<div class="serverInfo">
			<div class="serverTitle">
				<img class="serverStatus" src=${c.offlineStatusSrc} />
				<img class="serverGame" src=${c.serverGameSrc} onerror="this.onerror=null; this.src=${c.unknownGameSrc};" />
				<div>${name}</div>
			</div>
		</div>
`
	container.appendChild(serverElement);
}

// fetch server data from api
function fetchServerData(server) {
	const { id, ip, game, overrideName, overrideGame, overrideMap, dynmap } = server;
	const trueGame = overrideGame ? overrideGame : game;

	fetch(c.apiEndpoint)
		.then(response => response.json())
		.then(data => displayServerData(data, id, trueGame, overrideName, overrideMap, dynmap))
		.catch(error => console.error("Error fetching server data:", error));
}

// display server data once fetched
function displayServerData(data, id, game, overrideName, overrideMap, dynmap) {

	const serverElement = document.getElementById(id);

	// **************************************************
	// TODO: most if not all of these should be moved to constants.js

	const cleanServerName = (overrideName
		? overrideName
		: data.serverName).replace(/�./g, "");

	const numOfBots = data.numBots > 0
		? ` (${data.numBots} bots)`
		: ""; // only show bots if there are any

	const serverIP = data.serverIP;
	
	const serverMap = overrideMap ? overrideMap : data.currentMap;

	const serverMapImg = `${serverMap}.png`;

	const players = `${data.numHumans}/${data.maxClients} ${numOfBots}`;

	const connectOrDynmap = dynmap ? "http://"+dynmap : "steam://connect/"+data.serverIP;

	const serverButtonText = dynmap ? "Dynmap" : "Connect";

	// **************************************************

	serverElement.innerHTML = `
		<img class="serverMap" src=${c.serverMapSrc} onerror="this.onerror=null; this.src=${c.unknownMapSrc};" />

		<div class="serverInfo">
			<div class="serverTitle">
				<img class="serverStatus" src=${c.onlineStatusSrc} />
				<img class="serverGame" src=${c.serverGameSrc} onerror="this.onerror=null; this.src=${c.unknownGameSrc};" />
				<div>${cleanServerName}</div>
			</div>

			<div><b>IP:</b> ${serverIP}</div>
			<div><b>Map:</b> ${serverMap}</div>
			<div><b>Players:</b> ${players}</div>
		</div>

		<div class="serverButtons">
			<a href="${id}" class="serverButton" draggable="false">Info</a>
			<a href=${connectOrDynmap} class="serverButton connect" draggable="false">${serverButtonText}</a>
		</div>
	`;
}

// TODO: adjust exports to satisfy the linter when things are called by other files
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