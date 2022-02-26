const capturingUnits = ["Infantry", "Mech"];
const indirectUnits = ["Artillery", "Rocket", "Battleship", "Missile", "Piperunner", "Carrier"];
const directUnits = ["Anti-Air", "B-Copter", "Bomber", "Cruiser", "Fighter", "Infantry", "Md. Tank" 
   , "Mech", "Mega Tank", "Neotank", "Recon", "Stealth", "Sub", "Tank"];
const airUnits = ["B-Copter", "Fighter", "Stealth", "Bomber", "T-Copter"];
const seaUnits = ["Battleship", "Cruiser", "Sub", "Black Boat", "Carrier", "Lander"];
const infantryTransportUnits = ["T-Copter", "Black Boat", "Lander", "APC"];
const transportUnits = [...infantryTransportUnits, "Cruiser", "Carrier"];

export function isCapturingUnit(unit: string): boolean{
    return capturingUnits.includes(unit);
}
export function isIndirectUnit(unit: string): boolean{
    return indirectUnits.includes(unit);
}
export function isDirectUnit(unit: string): boolean{
    return directUnits.includes(unit);
}
export function isAirUnit(unit: string): boolean{
    return airUnits.includes(unit);
}
export function isSeaUnit(unit: string): boolean{
    return seaUnits.includes(unit);
}
export function isInfantryTransportUnit(unit: string): boolean{
    return infantryTransportUnits.includes(unit);
}
export function isTransportUnit(unit: string): boolean{
    return transportUnits.includes(unit);
}