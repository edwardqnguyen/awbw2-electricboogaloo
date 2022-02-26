import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isTransportUnit } from "../../dataHelpers/unitHelpers";

const KOAL_SCOP_MOVE_BONUS = 1;
const KOAL_COP_MOVE_BONUS = 1;
const KOAL_D2D_ROAD_ATK_BONUS = 10;
const KOAL_COP_ROAD_ATK_BONUS = 10;
const KOAL_SCOP_ROAD_ATK_BONUS = 20;

export const coKoal: CommandingOfficer = {
    name: "Koal",
    copSize: 3,
    scopSize: 2,
    
    attackBonus: (data) => {
        let bonus = 0;
        if(isTransportUnit(data.unitName)) return bonus;
        switch(data.powerStatus){
            case 'SCOP':
                if(data.terrain === 'Road') bonus += KOAL_SCOP_ROAD_ATK_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
                if(data.terrain === 'Road') bonus += KOAL_COP_ROAD_ATK_BONUS;
            case 'D2D':
                if(data.terrain === 'Road') bonus += KOAL_D2D_ROAD_ATK_BONUS;
                break;
        }
        return bonus;
    },
    defenseBonus: (data, atkUnit) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_DEF_BONUS;
            case 'D2D':
                break;
        }
        return bonus;
    },
    moveBonus: (data) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
                bonus += KOAL_SCOP_MOVE_BONUS;
            case 'COP':
                bonus += KOAL_COP_MOVE_BONUS;
            case 'D2D':
                break;
        }
        return bonus;
    },

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}