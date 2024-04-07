import { servers } from "./serversData.js";
import * as c from "./constants.js";
import { RESOURCES, SERVER_INFO } from "./constants.js";

// loop through every server
document.addEventListener("DOMContentLoaded", (_event) => {
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
    uniqueId,
    game,
    overrideName,
    overrideGame,
    overrideMap,
    dynMap,
  } = server;

  fetch(RESOURCES.API_ENDPOINT(server.server_ip, game))
    .then((response) => response.json())
    .then((serverData) =>
      displayServerData(
        serverData,
        uniqueId,
        overrideGame ? overrideGame : game,
        overrideName,
        overrideMap,
        dynMap,
      ),
    )
    .catch((error) => console.error("Error fetching server data:", error));
}

// display server data once fetched
function displayServerData(
  serverData,
  uniqueId,
  overrideGame,
  overrideName,
  overrideMap,
  dynMap,
) {
  const serverElement = document.getElementById(uniqueId);

  // **************************************************

  // TODO: hnnggg must abstract even further until we reach the singularity
  // also bring across the other constants from the constants file
  serverElement.innerHTML = `
		<img class="serverMap" src=${RESOURCES.IMAGE_SOURCES.serverMap(overrideGame, overrideMap)} onerror="this.onerror=null; this.src=${RESOURCES.IMAGE_SOURCES.unknownMap}" />

		<div class="serverInfo">
			<div class="serverTitle">
				<img class="serverStatus" src=${RESOURCES.IMAGE_SOURCES.onlineStatus} />
				<img class="serverGame" src=${c.serverGameSrc} onerror="this.onerror=null; this.src=${c.unknownGameSrc};" />
				<div>${cleanServerName}</div>
			</div>

			<div><b>IP:</b> ${servers}</div>
			<div><b>Map:</b> ${serverMap}</div>
			<div><b>Players:</b> ${playersText}</div>
		</div>

		<div class="serverButtons">
			<a href="${uniqueId}" class="serverButton" draggable="false">Info</a>
			<a href=${connectOrDynmap} class="serverButton connect" draggable="false">${serverButtonText}</a>
		</div>
	`;
}
