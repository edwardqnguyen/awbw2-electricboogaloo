import terrainLoader from "../dataLoaders/terrainLoader";
import terrainDefenseLoader from "../dataLoaders/terrainDefenseLoader";

const tA = terrainLoader('src/gameData/terrain.txt');
const tDA = terrainDefenseLoader('src/gameData/terrainDefense.txt');

const terrainDict = {}
tA.forEach((e, i) => {
    terrainDict[e] = tDA[i];
})

const urbanTerrain = ["City", "Base", "Airport", "Port", "Headquarters", "Lab", "Communication Tower"]
const hiddenTerrain = ["Forest", "Reef"];

export function isUrbanTerrain(terrain: string): boolean{
    return urbanTerrain.includes(terrain);
}
export function isHiddenTerrain(terrain: string): boolean{
    return hiddenTerrain.includes(terrain);
}
export function getTerrainDefense(terrain: string): number{
    return terrainDict[terrain];
}