const resourcesBaseUrl = "https://resources.matchaland.net";

// game/map images or lack thereof
export const serverGameSrc = `${resourcesBaseUrl}/games/${game}.png`;
export const serverMapSrc = `${resourcesBaseUrl}/maps/${game}/${serverMapImg}`;
export const unknownGameSrc = `${resourcesBaseUrl}/games/unknown.png`;
export const unknownMapSrc = `${resourcesBaseUrl}/maps/unknown.png`;

// online/offline status images
export const onlineStatusSrc = `${resourcesBaseUrl}/status/online.png`;
export const offlineStatusSrc = `${resourcesBaseUrl}/status/offline.png`;

// raccoonlagoon api
export const apiEndpoint = `https://api.raccoonlagoon.com/v1/server-info?ip=${ip}&g=${game}`

// arithmetic constants
export const SECONDS_IN_DAY = 24 * 60 * 60;
export const SECONDS_IN_HOUR = 60 * 60;
export const SECONDS_IN_MINUTE = 60;

/* TODO: format this nicely and bring more stuff over from servers.js

e.g:

export const RESOURCES = {
    BASE_URLS: {
        games: `${resourcesBaseUrl}/games/`,
        maps: `${resourcesBaseUrl}/maps/`,
        status: `${resourcesBaseUrl}/status/`
    },
    IMAGE_SOURCES: {
        game: (game) => `${BASE_URLS.games}${game}.png`,
        unknownGame: `${BASE_URLS.games}unknown.png`,
        map: (game, serverMap) => `${BASE_URLS.maps}${game}/${serverMap}.png`,
        unknownMap: `${BASE_URLS.maps}unknown.png`,
        onlineStatus: `${BASE_URLS.status}online.png`,
        offlineStatus: `${BASE_URLS.status}offline.png`
    },
}
*/