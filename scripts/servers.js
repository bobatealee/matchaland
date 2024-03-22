import { servers } from "./serversData.js";
import * as c from "./constants.js";
import { RESOURCES, SERVER_INFO } from "./constants.js";

// loop through every server
document.addEventListener("DOMContentLoaded", (event) => {
  servers.forEach((server) => listServer(server));
  servers.forEach((server) => fetchServerData(server));
});

// generate dummy server entries
function listServer(server) {
  // TODO: im satisfied with this for now,
  // but could be improved with a template literal
  // and a cleaner approach to the server object in general
  const {
    id,
    overridename: name = server.name,
    overridegame: game = server.game,
  } = server;

  const serverParent = document.getElementById("servers");
  const serverElement = document.createElement("div");

  serverElement.id = id;
  serverElement.className = "server";
  serverElement.style.width = "100%"; // temp

  // TODO: make this a template literal and bring over
  // naming conventions from the constants file
  serverElement.innerHTML = `
		<img class="serverMap" src=${c.unknownMapSrc} />

		<div class="serverInfo">
			<div class="serverTitle">
				<img class="serverStatus" src=${c.offlineStatusSrc} />
				<img class="serverGame" src=${c.serverGameSrc} onerror="this.onerror=null; this.src=${c.unknownGameSrc};" />
				<div>${name}</div>
			</div>
		</div>
`;
  serverParent.appendChild(serverElement);
}

// fetch server data from api
function fetchServerData(server) {
  // TODO: make these variable names consistent across files in camelCase
  const {
    unique_id,
    game,
    override_name,
    override_game,
    override_map,
    dynmap,
  } = server;

  fetch(RESOURCES.API_ENDPOINT(server.server_ip, game))
    .then((response) => response.json())
    .then((data) =>
      displayServerData(
        data,
        unique_id,
        override_game ? override_game : game,
        override_name,
        override_map,
        dynmap,
      ),
    )
    .catch((error) => console.error("Error fetching server data:", error));
}

// display server data once fetched
function displayServerData(
  data,
  unique_id,
  override_game,
  override_name,
  override_map,
  dynmap,
) {
  const serverElement = document.getElementById(id);

  // **************************************************

  // TODO: hnnggg must abstract even further until we reach the singularity
  // also bring across the other constants from the constants file
  serverElement.innerHTML = `
		<img class="serverMap" src=${RESOURCES.IMAGE_SOURCES.serverMap(override_game, override_map)} onerror="this.onerror=null; this.src=${RESOURCES.IMAGE_SOURCES.unknownMap}" />

		<div class="serverInfo">
			<div class="serverTitle">
				<img class="serverStatus" src=${RESOURCES.IMAGE_SOURCES.onlineStatus} />
				<img class="serverGame" src=${c.serverGameSrc} onerror="this.onerror=null; this.src=${c.unknownGameSrc};" />
				<div>${cleanServerName}</div>
			</div>

			<div><b>IP:</b> ${serverIP}</div>
			<div><b>Map:</b> ${serverMap}</div>
			<div><b>Players:</b> ${playersText}</div>
		</div>

		<div class="serverButtons">
			<a href="${id}" class="serverButton" draggable="false">Info</a>
			<a href=${connectOrDynmap} class="serverButton connect" draggable="false">${serverButtonText}</a>
		</div>
	`;
}

// currently unnecessary; player data is not displayed on the frontend.
// function convertTime(time) {
// 	const days = Math.floor(time / SECONDS_IN_DAY);
// 	const hours = Math.floor((time % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
// 	const minutes = Math.floor((time % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
// 	const seconds = Math.floor(time % SECONDS_IN_MINUTE);

// 	let formattedTime = "";

// 	// only show applicable time units
// 	if (days > 0) formattedTime += `${days}d `;
// 	if (hours > 0) formattedTime += `${hours}h `;
// 	if (minutes > 0 || hours > 0) formattedTime += `${minutes}m `;

// 	formattedTime += `${seconds.toString()}s`; // add seconds
// 	return formattedTime; // return formatted time string
// }
