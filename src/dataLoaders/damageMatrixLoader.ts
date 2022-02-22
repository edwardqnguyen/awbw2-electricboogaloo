import fs from 'fs';

/**
 * Reads in list of unit names and returns them in an array format.
 * @returns {Array<String>} unit names tied to specific indices
 */
export default function unitLoader(){
    const data = fs.readFileSync("src/constants/damage-matrix.txt", "utf-8")
    const damageLineData = data.split(/\r?\n/);
    const damageData = damageLineData.map(line => {
        const lineStringData = line.split(/\s+/);
        const lineNumberData = lineStringData.map(value => parseInt(value));
        return lineNumberData;
    })
    return damageData;
}