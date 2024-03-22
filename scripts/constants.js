const resourcesBaseUrl = "https://resources.matchaland.net";

const BASE_URLS = {
  games: `${resourcesBaseUrl}/games/`,
  maps: `${resourcesBaseUrl}/maps/`,
  status: `${resourcesBaseUrl}/status/`,
};

export const RESOURCES = {
  BASE_URLS: BASE_URLS,
  IMAGE_SOURCES: {
    serverGame: (game) => `${BASE_URLS.games}${game}.png`,
    unknownGame: `${BASE_URLS.games}unknown.png`,
    serverMap: (game, serverMap) => `${BASE_URLS.maps}${game}/${serverMap}.png`,
    unknownMap: `${BASE_URLS.maps}unknown.png`,
    onlineStatus: `${BASE_URLS.status}online.png`,
    offlineStatus: `${BASE_URLS.status}offline.png`,
  },
  API_ENDPOINT: (ip, game) =>
    `https://api.raccoonlagoon.com/v1/server-info?ip=${ip}&g=${game}`,
};

export const TIME_CONSTANTS = {
  SECONDS_IN_DAY: 24 * 60 * 60,
  SECONDS_IN_HOUR: 60 * 60,
  SECONDS_IN_MINUTE: 60,
};

// abstaction = pain but luckily we're not
// touching this stuff ever again Smiley Face
export const SERVER_INFO = {
  cleanServerName: (data, overrideName) =>
    (overrideName ? overrideName : data.serverName).replace(/�./g, ""),

  botsText: (data) => (data.numBots > 0 ? ` (${data.numBots} bots)` : ""),

  playersText: (data) =>
    `${data.numHumans}/${data.maxClients} ${SERVER_INFO.botsText(data)}`,

  connectOrDynmap: (data, dynmap) =>
    dynmap ? `http://${dynmap}` : `steam://connect/${data.serverIP}`,

  serverButtonText: (dynmap) => (dynmap ? "Dynmap" : "Connect"),
};
