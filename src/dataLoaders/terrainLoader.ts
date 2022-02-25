import fs from 'fs';

/**
 * Reads in list of terrain names and returns them in an array format.
 * @returns {Array<String>} terrain names tied to specific indices
 */
export default function terrainLoader(file){
    const data = fs.readFileSync(file, "utf-8")
    const terrainNames = data.split(/\r?\n/);
    return terrainNames;
}