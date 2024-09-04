// list of servers
const serverList = [
	{
		"id": "minecraft",
		"name": "matchaland.net | Minecraft 1.21.1 Survival",
		"ip": "199.247.78.239:10010",
		"game": "minecraft",
		"overrideMap": "matchaland",
		"dynmap": "http://play.matchaland.net:10015/?mapname=surface&zoom=3"
	},
	{
		"id": "minecraft_creative",
		"name": "matchaland.net | Minecraft 1.21.1 Creative",
		"ip": "199.247.78.239:10020",
		"game": "minecraft",
		"overrideMap": "matchaland_creative",
		"dynmap": "http://play.matchaland.net:10025/?mapname=surface&zoom=3"
	},
	{
		"id": "minecraft_beta",
		"name": "matchaland.net | Minecraft b1.7.3 Survival",
		"ip": "199.247.78.239:11011",
		"game": "minecraftbeta",
		"overrideMap": "matchaland_beta",
		"dynmap": "http://play.matchaland.net:11015/?mapname=surface&zoom=3",
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
		"overrideGame": "tf2classic"
	},
	{
		"id": "tf2classic_custom1",
		"name": "matchaland.net | TF2C Custom Maps",
		"ip": "199.247.78.239:21020",
		"game": "hl2dm",
		"overrideGame": "tf2classic"
	},
	{
		"id": "tf2classic_grabbag1",
		"name": "matchaland.net | TF2C Grab Bag",
		"ip": "199.247.78.239:21030",
		"game": "hl2dm",
		"overrideGame": "tf2classic"
	},
	{
		"id": "dmc",
		"name": "matchaland.net | DMC Grab Bag",
		"ip": "199.247.78.239:30010",
		"game": "dmc"
	}
];

// list of Steam games
const steamGames = [
	"tf2",
	"tf2classic",
	"tfc",
	"hldm",
	"dmc",
	"svencoop"
];

// general variables
var resources = "https://resources.matchaland.net";
var hostname = "play.matchaland.net";

// preload images
new Image().src = resources+"/status/offline.png";
new Image().src = resources+"/status/online.png";
new Image().src = resources+"/games/unknown.png";
new Image().src = resources+"/maps/unknown.png";

// loop through every server
document.addEventListener('DOMContentLoaded', (event) => {
	serverList.forEach(server => listServer(server));
});

// generate dummy server entries
function listServer(server) {
	// for dummy entry
	const serverId = server.id;
	const serverName = server.name;
	const serverGame = server.overrideGame ? server.overrideGame : server.game;

	// jotting down now, displaying later
	const serverIp = server.ip;
	const serverOverrideMap = server.overrideMap;
	const serverDynmap = server.dynmap;

	// create entry element
	const container = document.getElementById("servers");
	const serverElement = document.createElement("div");
	serverElement.id = serverId;
	serverElement.className = "server";

	// populate entry with temp info
	serverElement.innerHTML =
	`
		<div class="serverTitle">
			<img class="serverStatus" src="${resources}/status/offline.png" draggable="false" />
			<img class="serverGame" src="${resources}/games/${serverGame}.png" onerror="this.onerror=null; this.src='${resources}/games/unknown.png';" draggable="false" />
			<div>${serverName}</div>
		</div>
		
		<div class="serverContent">
			<img class="serverMap" src="${resources}/maps/unknown.png" draggable="false" />
			<div class="serverMapName"><b>Map:</b> ---</div>
			<div class="serverPlayers"><b>Players:</b> ---</div>
		</div>

		<div class="serverButtons">
			<a href="${serverId}" class="serverButton serverInfo" style="width:100%;" draggable="false"><div class="info"></div></a>
		</div>
	`

	container.appendChild(serverElement);

	// fetch server data from api
	const url = `https://api.raccoonlagoon.com/v1/server-info?ip=${serverIp}&g=${server.game}`;
	fetch(url)
		.then(response => response.json())
		.then(data => displayServerData(data, serverId, serverGame, serverOverrideMap, serverDynmap))
		.catch(error => console.error("Error fetching server data:", error));
}

// display server data once fetched
function displayServerData(data, serverId, serverGame, serverOverrideMap, serverDynmap) {
	const serverMap = (serverOverrideMap ? serverOverrideMap : data.currentMap);
	const serverElement = document.getElementById(serverId);
	const canConnect = steamGames.includes(serverGame);

	// set updated server info
	// server returned data, so it's online
	serverElement.getElementsByClassName("serverStatus")[0].src = resources+"/status/online.png";

	serverElement.getElementsByClassName("serverStatus")[0].classList.add("asyncImage");
	serverElement.getElementsByClassName("serverMap")[0].dataset.src = resources+"/maps/"+serverGame+"/"+serverMap+".png";

	serverElement.getElementsByClassName("serverMapName")[0].innerHTML = "<b>Map:</b> "+serverMap;
	serverElement.getElementsByClassName("serverMapName")[0].title = serverMap;

	// server player list
	// only show the table if there are players
	const playerListTable = data.humanData.length > 0 ?
	`${data.humanData.map(player => {
		return `${player.name}`;
	}).join("\n")}` : "";

	// only show bots if there are any
	const numOfBots = data.numBots > 0 ? ` (${data.numBots} Bots)` : "";
	// player count, hovering when players are online shows a list
	// TODO: title attribute not mobile friendly
	serverElement.getElementsByClassName("serverPlayers")[0].innerHTML = "<b>Players:</b> "+data.numHumans+"/"+data.maxClients+" "+numOfBots;
	serverElement.getElementsByClassName("serverPlayers")[0].title = playerListTable;
	if (data.numHumans > 0) {
		serverElement.getElementsByClassName("serverPlayers")[0].classList.add("tooltip");
	}

	// server buttons, done a little differently because of how dynamic they can be
	// servers that host a Steam game will replace the copy ip button with a connect button
	serverElement.getElementsByClassName("serverButtons")[0].innerHTML =
	`
		<a ${canConnect ? `href="steam://connect/${data.serverIP}"` : ""} ${canConnect ? "" : `onclick="navigator.clipboard.writeText('${data.serverIP.replace(/^[^:]*/, hostname)}');"`} class="serverButton serverConnect" draggable="false">${canConnect ? "Connect" : "Copy IP"}</a>
		${serverDynmap ? `<a href="${serverDynmap}" class="serverButton serverDynmap" draggable="false"><div class="dynmap"></div></a>` : ""}
		<a href="${serverId}" class="serverButton serverInfo" draggable="false"><div class="info"></div></a>
	`;

	// asynchronously load map images, not replacing if they can't be found
	(() => {
		"use strict";
		const mapElement = serverElement.getElementsByClassName("serverMap")[0];
		const img = new Image();
		img.src = mapElement.dataset.src;
		img.onload = () => {
			mapElement.classList.remove('asyncImage');
			mapElement.src = mapElement.dataset.src;
		};
	})();
}