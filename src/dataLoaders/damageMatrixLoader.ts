import fs from 'fs';

/**
 * Reads in list of unit names and returns them in an array format.
 * @returns {Array<String>} unit names tied to specific indices
 */
export default function damageMatrixLoader(file){
    const data = fs.readFileSync(file, "utf-8")
    const damageLineData = data.split(/\r?\n/);
    const damageData = damageLineData.map(line => {
        const lineStringData = line.trim().split(/\s+/);
        const lineNumberData = lineStringData.map(value => parseInt(value));
        return lineNumberData;
    })
    return damageData;
}