const urbanTerrain = ["City", "Base", "Airport", "Port", "Headquarters", "Lab", "Communication Tower"]
const hiddenTerrain = ["Forest", "Reef"];

export function isUrbanTerrain(terrain: string): boolean{
    return urbanTerrain.includes(terrain);
}
export function isHiddenTerrain(terrain: string): boolean{
    return hiddenTerrain.includes(terrain);
}