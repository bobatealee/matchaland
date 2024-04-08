export const servers = [
  {
    uniqueId: "tf2_standard1",
    displayName: "matchaland.net | TF2 Standard Maps + Custom Classes",
    serverIp: "64.5.76.253:27015",
    game: "tf2",
  },
  {
    uniqueId: "tf2_custom1",
    displayName: "matchaland.net | TF2 Custom Maps + Custom Classes",
    serverIp: "64.5.76.253:27045",
    game: "tf2",
  },
  {
    uniqueId: "tf2_mvm1",
    displayName: "matchaland.net | TF2 MvM + Custom Classes",
    serverIp: "64.5.76.253:27055",
    game: "tf2",
  },
  {
    uniqueId: "tf2_mge1",
    displayName: "matchaland.net | TF2 MGE + Custom Classes",
    serverIp: "64.5.76.253:27065",
    game: "tf2",
  },
  {
    uniqueId: "tf2classic_standard1",
    displayName: "matchaland.net | TF2C Standard Maps + Bhop",
    serverIp: "64.5.76.253:27025",
    game: "hl2dm",
    overrideGame: "tf2classic",
  },
  {
    uniqueId: "tf2classic_custom1",
    displayName: "matchaland.net | TF2C Custom Maps + Bhop",
    serverIp: "64.5.76.253:27035",
    game: "hl2dm",
    overrideGame: "tf2classic",
  },
  {
    uniqueId: "dmc",
    displayName: "matchaland.net | Half-Life DMC",
    serverIp: "64.5.76.253:17015",
    game: "dmc",
  },
  {
    uniqueId: "minecraft",
    displayName: "matchaland.net | Minecraft 1.20.4 Survival",
    serverIp: "64.5.76.253:25565",
    game: "minecraft",
    overrideMap: "matchaland",
    dynMap: "64.5.76.253:8123",
  },
  {
    uniqueId: "minecraftbeta",
    displayName: "matchaland.net | Minecraft b1.7.3 Survival",
    serverPort: "64.5.76.253:25576", // might be intended to use a different key for port
    game: "minecraftbeta",
    overrideName: "matchaland.net | Minecraft b1.7.3 Survival", // this = `displayName`, consider if it's necessary
    overrideMap: "matchaland_beta",
    dynMap: "64.5.76.253:8133",
  },
];
