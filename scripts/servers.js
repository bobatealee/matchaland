// list of servers
const serverList = [
	{
		id: "minecraft",
		name: "matchaland.net | Minecraft 1.21.10 Survival",
		ip: "play.matchaland.net:10010",
		game: "minecraft",
		overrideMap: "matchaland",
		dynmap: "http://play.matchaland.net:10015/?mapname=surface&zoom=3",
	},
	{
		id: "minecraft_creative",
		name: "matchaland.net | Minecraft 1.21.10 Creative",
		ip: "play.matchaland.net:10020",
		game: "minecraft",
		overrideMap: "matchaland_creative",
		dynmap: "http://play.matchaland.net:10025/?mapname=surface&zoom=3",
	},
	{
		id: "minecraft_beta",
		name: "matchaland.net | Minecraft b1.7.3 Survival",
		ip: "play.matchaland.net:11011",
		game: "minecraftbeta",
		overrideMap: "matchaland_beta",
		dynmap: "http://play.matchaland.net:11015/?mapname=surface&zoom=3",
	},
	{
		id: "tf2_standard1",
		name: "matchaland.net | TF2 Standard Maps",
		ip: "play.matchaland.net:20010",
		game: "tf2",
	},
	{
		id: "tf2_custom1",
		name: "matchaland.net | TF2 Custom Maps",
		ip: "play.matchaland.net:20020",
		game: "tf2",
	},
	{
		id: "tf2_grabbag1",
		name: "matchaland.net | TF2 Grab Bag",
		ip: "play.matchaland.net:20030",
		game: "tf2",
	},
	{
		id: "tf2_mvm1",
		name: "matchaland.net | TF2 Mann vs. Machine",
		ip: "play.matchaland.net:20040",
		game: "tf2",
	},
	{
		id: "tf2classic_standard1",
		name: "matchaland.net | TF2C Standard Maps",
		ip: "play.matchaland.net:21010",
		game: "hl2dm",
		overrideGame: "tf2classic",
	},
	{
		id: "tf2classic_grabbag1",
		name: "matchaland.net | TF2C Grab Bag",
		ip: "play.matchaland.net:21020",
		game: "hl2dm",
		overrideGame: "tf2classic",
	},
	{
		id: "dmc",
		name: "matchaland.net | DMC Grab Bag",
		ip: "play.matchaland.net:30010",
		game: "dmc",
	},
];

// list of Steam games, for direct connection
const steamGames = ["tf2", "tf2classic", "dmc"];

// general variables
const RESOURCES_URL = "https://resources.matchaland.net";
const HOSTNAME = "play.matchaland.net";
const API_BASE_URL = "https://api.raccoonlagoon.com/v1/";

// preload critical images
function preloadImages(...urls) {
	urls.forEach((url) => {
		const img = new Image();
		img.src = url;
	});
}

// load images as soon as script is parsed
preloadImages(
	`${RESOURCES_URL}/status/offline.png`,
	`${RESOURCES_URL}/status/online.png`,
	`${RESOURCES_URL}/games/unknown.png`,
	`${RESOURCES_URL}/maps/unknown.png`,
);

// fetch base IP
var baseIP = HOSTNAME;
function fetchBaseIP() {
	const url = `${API_BASE_URL}resolve-dns?hostname=${HOSTNAME}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => updateConnectLinks(data))
		.catch((error) => console.error("Error fetching IP:", error));
}

// update base IP and any existing elements
function updateConnectLinks(data) {
	if (!data.error) {
		baseIP = data.address;

		document.querySelectorAll(".steam").forEach((connectElement) => {
			connectElement.href = connectElement.href.replace(HOSTNAME, baseIP);
		});
	}
}

// main function to initialize the server list
function initializeServerList() {
	// loop through every server
	const container = document.getElementById("servers");
	serverList.forEach((server) => {
		const serverElement = createServerElement(server);
		container.appendChild(serverElement);
		fetchServerData(server, serverElement);
	});
}

// generate dummy server entries
function createServerElement(server) {
	const { id, name, overrideGame, game } = server;
	const serverGame = overrideGame || game;

	// create entry element
	const serverElement = document.createElement("div");
	serverElement.id = id;
	serverElement.className = "server";

	// populate entry with temp info
	serverElement.innerHTML = `
			<div class="serverTitle">
				<img class="serverStatus" src="${RESOURCES_URL}/status/offline.png" alt="status" draggable="false">
				<img class="serverGame" src="${RESOURCES_URL}/games/${serverGame}.png" alt="${serverGame}" onerror="this.onerror=null; this.src='${RESOURCES_URL}/games/unknown.png';" draggable="false">
				<div>${name}</div>
			</div>
			<div class="serverContent">
				<img class="serverMap asyncImage" src="${RESOURCES_URL}/maps/unknown.png" alt="map" draggable="false">
				<div class="serverMapName"><b>Map:</b> ---</div>
				<div class="serverPlayers"><b>Players:</b> ---</div>
			</div>
			<div class="serverButtons">
				<a href="${id}" class="serverButton serverInfo" style="width:100%;" draggable="false"><div class="info"></div></a>
			</div>
		`;
	return serverElement;
}

// fetch server data from api
function fetchServerData(server, serverElement) {
	const url = `${API_BASE_URL}server-info?ip=${server.ip}&g=${server.game}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => updateServerElement(data, server, serverElement))
		.catch((error) => console.error("Error fetching server data:", error));
}

// display server data once fetched
function updateServerElement(data, server, serverElement) {
	const { overrideMap, dynmap } = server;
	const canConnect = steamGames.includes(server.overrideGame || server.game);
  
	// check if server is offline/has an error
	if (data.error) {
		serverElement.classList.add("offline");

		serverElement.querySelector(".serverMapName").innerHTML = "<b>Offline!</b>";
		serverElement.querySelector(".serverPlayers").innerHTML = "";

		return;
	}

	// set updated server info
	// server returned data, so it's online
	serverElement.querySelector(".serverStatus").src =
		`${RESOURCES_URL}/status/online.png`;

	// update map image
	const serverMap = overrideMap || data.currentMap;
	const mapImage = serverElement.querySelector(".serverMap");
	mapImage.dataset.src = `${RESOURCES_URL}/maps/${server.overrideGame || server.game}/${serverMap}.png`;
	loadMapImage(mapImage);

	serverElement.querySelector(".serverMapName").innerHTML = `<b>Map:</b> ${serverMap}`;
	serverElement.querySelector(".serverMapName").title = serverMap;

	// server player list
	const playersElement = serverElement.querySelector(".serverPlayers");
	const numOfBots = data.numBots > 0 ? ` (${data.numBots} Bots)` : "";
	playersElement.innerHTML = `<b>Players:</b> ${data.numHumans}/${data.maxClients}${numOfBots}`;

	// only show the table if there are players
	const playerList = data.humanData.map((player) => player.name).join("\n");
	if (data.numHumans > 0) {
		playersElement.classList.add("tooltip");
		playersElement.title = playerList;
	}

	// server buttons
	// servers that host a Steam game will replace the copy ip button with a connect button
	const buttonsHtml = `
			<a ${canConnect ? `href="steam://connect/${baseIP+data.serverIP.replace(HOSTNAME, "")}"` : ""} class="serverButton serverConnect${canConnect ? ` steam` : ""}" ${!canConnect ? `onclick="navigator.clipboard.writeText('${data.serverIP}');"` : ""} draggable="false">
				${canConnect ? "Connect" : "Copy IP"}
			</a>
			${dynmap ? `<a href="${dynmap}" class="serverButton serverDynmap" draggable="false"><div class="dynmap"></div></a>` : ""}
			<a href="${server.id}" class="serverButton serverInfo" draggable="false"><div class="info"></div></a>
		`;
	serverElement.querySelector(".serverButtons").innerHTML = buttonsHtml;
}

// asynchronously load map images, not replacing if they can't be found
function loadMapImage(mapElement) {
	"use strict";
	const img = new Image();
	img.src = mapElement.dataset.src;
	img.onload = () => {
		mapElement.classList.remove("asyncImage");
		mapElement.src = mapElement.dataset.src;
	};
	img.onerror = () => {
		mapElement.src = `${RESOURCES_URL}/maps/unknown.png`;
	};
}

// initialize on DOM load
document.addEventListener("DOMContentLoaded", (event) => {
	fetchBaseIP();
	initializeServerList();
});