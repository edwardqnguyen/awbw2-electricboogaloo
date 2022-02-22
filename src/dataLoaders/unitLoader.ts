import fs from 'fs';

/**
 * Reads in list of unit names and returns them in an array format.
 * @returns {Array<String>} unit names tied to specific indices
 */
export default function unitLoader(){
    const data = fs.readFileSync("src/constants/units.txt", "utf-8")
    const unitNames = data.split(/\r?\n/);
    return unitNames;
}