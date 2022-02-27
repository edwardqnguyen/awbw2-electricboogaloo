const unitDict = {
    "Anti-Air": 'anti-air',
    "APC": 'apc',
    "Artillery":'artillery',
    "B-Copter": 'b-copter',
    "Battleship": 'battleship',
    "Black Boat": 'blackboat',
    "Black Bomb": 'blackbomb',
    "Bomber": 'bomber',
    "Carrier": 'carrier',
    "Cruiser": 'cruiser',
    "Fighter": 'fighter',
    "Infantry": 'infantry',
    "Lander": 'lander',
    "Md. Tank": 'md.tank',
    "Mech": 'mech',
    "Mega Tank": 'megatank',
    "Missile": 'missile',
    "Neotank": 'neotank',
    "Piperunner": 'piperunner',
    "Recon": 'recon',
    "Rocket": 'rocket',
    "Stealth": 'stealth',
    "Sub": 'sub',
    "T-Copter": 't-copter',
    "Tank": 'tank'
}

export const version = ["AW1", "AW2", "AWDS"];
export type Version = "AW1" | "AW2" | "AWDS";

export function unitToImageSrc(unitName: string, faction: string){
    return "/awbwAssets/"+faction+"/"+unitDict[unitName]+".gif";
}

export function coToImageSrc(co: string, version: Version){
    const imageUrl = co.replace(/\s+/,"").toLowerCase()+".jpg";
    return "/awbwCoPortraits/"+version.toLowerCase()+"/"+imageUrl;
}