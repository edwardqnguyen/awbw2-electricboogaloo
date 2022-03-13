import { isUrbanTerrain, isConnectedTerrain } from "./terrainHelpers";
import { unitDict, terrainDict } from "./imageDicts";
import fs from 'fs';

export const version = ["AW1", "AW2", "AWDS"];
export type Version = "AW1" | "AW2" | "AWDS";
const errorTile = "/awbwAssets/Urban/PurpleLightning/hq.gif"

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
        directoryPrefix += "Urban/"+"Neutral"+"/";
    } else if(isConnectedTerrain(terrain)){
        directoryPrefix += "Terrain/"+terrain+"/"
    } else {
        directoryPrefix += "Terrain/Other/";
    }
    let filename = terrainDict[terrain]+specifierTranslation(terrain, specifier);
    if(weather) filename += "_" + weather;
    const testFile = directoryPrefix+filename+".gif";

    try{
        // TODO: Check if image exists or not.

        // if(fs.existsSync("/public"+testFile)){
        //     return testFile;
        // }
        // else {
        //     return errorTile;
        // }
        return testFile;
    } catch(err) {
        console.error(err)
    }
}