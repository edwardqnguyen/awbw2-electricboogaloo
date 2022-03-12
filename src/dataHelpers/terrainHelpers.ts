const urbanTerrain = ["City", "Base", "Airport", "Port", "Headquarters", "Lab", "Communication Tower"];
const connectedTerrain = ["River", "Road", "Pipe", "Shoal", "Bridge"];
const hiddenTerrain = ["Forest", "Reef"];

export const terrainDefenseDict = {
    "Plain": 1,
    "Mountain": 4,
    "Forest": 2, 
    "River": 0,
    "Road": 0,
    'Bridge': 0,
    "Sea": 0,
    "Shoal": 0,
    'Reef': 1,
    'City': 3,
    'Base': 3,
    'Airport': 3,
    'Port': 3,
    'Headquarters': 4,
    'Pipe': 0,
    'Silo': 3,
    'Communication Tower': 3,
    'Lab': 3,
}
export const terrainNames = Object.keys(terrainDefenseDict);

export const terrainRepresentationDict = {
    "Plain": ".",
    "Mountain": "^",
    "Forest": "@", 
    "River": "~",
    "Road": "-",
    'Bridge': "=",
    "Sea": ",",
    "Shoal": ")",
    'Reef': "%",
    'City': "a",
    'Base': "b",
    'Airport': "c",
    'Port': "d",
    'Headquarters': "f",
    'Pipe': "*",
    'Silo': "#",
    'Communication Tower': "g",
    'Lab': "h",
}

function getReverseDict() {
    const reverseDict = {};
    Object.keys(terrainRepresentationDict).forEach(key => {
        reverseDict[terrainRepresentationDict[key]] = key;
    })
    return reverseDict;
}

export const terrainFromRepresentationDict = getReverseDict();

export function isUrbanTerrain(terrain: string): boolean{
    return urbanTerrain.includes(terrain);
}
export function isConnectedTerrain(terrain: string): boolean {
    return connectedTerrain.includes(terrain);
}
export function isHiddenTerrain(terrain: string): boolean{
    return hiddenTerrain.includes(terrain);
}