import { isUrbanTerrain, isConnectedTerrain } from "./terrainHelpers";
const unitDict = {
    "Anti-Air": 'anti-air',
    "APC": 'apc',
    "Artillery":'artillery',
    "B-Copter": 'b-copter',
    "Battleship": 'battleship',
    "Black Boat": 'blackboat',
    "Black Bomb": 'blackbomb',
    "Bomber": 'bomber',
    "Carrier": 'carrier',
    "Cruiser": 'cruiser',
    "Fighter": 'fighter',
    "Infantry": 'infantry',
    "Lander": 'lander',
    "Md. Tank": 'md.tank',
    "Mech": 'mech',
    "Mega Tank": 'megatank',
    "Missile": 'missile',
    "Neotank": 'neotank',
    "Piperunner": 'piperunner',
    "Recon": 'recon',
    "Rocket": 'rocket',
    "Stealth": 'stealth',
    "Sub": 'sub',
    "T-Copter": 't-copter',
    "Tank": 'tank'
}

const terrainDict = {
    "Plain": "plain",
    "Mountain": "mountain",
    "Forest": "wood", 
    "River": "river",
    "Road": "road",
    'Bridge': "bridge",
    "Sea": "sea",
    "Shoal": "shoal",
    'Reef': "reef",
    'City': "city",
    'Base': "base",
    'Airport': "airport",
    'Port': "port",
    'Headquarters': "hq",
    'Pipe': "pipe",
    'Silo': "silo",
    'Communication Tower': "comtower",
    'Lab': "lab",
}

export const version = ["AW1", "AW2", "AWDS"];
export type Version = "AW1" | "AW2" | "AWDS";

export function unitToImageSrc(unitName: string, faction: string){
    return "/awbwAssets/"+faction+"/"+unitDict[unitName]+".gif";
}

export function coToImageSrc(co: string, version: Version){
    const imageUrl = co.replace(/\s+/,"").toLowerCase()+".jpg";
    return "/awbwCoPortraits/"+version.toLowerCase()+"/"+imageUrl;
}

function specifierTranslation(terrain: string, specifier: string){
    return "";
}

export function terrainToImageSrc(terrain: string, specifier: string, weather?: string){
    let directoryPrefix = "/awbwAssets/";
    if(isUrbanTerrain(terrain)){
        directoryPrefix += "Neutral"+"/";
    } else if(isConnectedTerrain(terrain)){
        directoryPrefix += "Terrain/"+terrain+"/"
    } else {
        directoryPrefix += "Terrain/Other/";
    }
    let filename = terrainDict[terrain]+specifierTranslation(terrain, specifier);
    if(weather) filename += "_" + weather;
    return directoryPrefix+filename+".gif";
}