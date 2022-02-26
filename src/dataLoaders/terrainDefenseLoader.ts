import fs from 'fs';

/**
 * Reads in list of defense numbers and returns them in an array format.
 * These are tied to the terrain names in terrainDefense.txt
 * @returns {Array<number>} 
 */
export default function terrainDefenseLoader(file){
    const data = fs.readFileSync(file, "utf-8")
    const terrainDefenseStrings = data.split(/\r?\n/);
    const terrainDefenseNumbers = terrainDefenseStrings.map(str => parseInt(str));
    return terrainDefenseNumbers;
}