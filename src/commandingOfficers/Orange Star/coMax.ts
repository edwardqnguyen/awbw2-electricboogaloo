import { CommandingOfficer } from "../commandingOfficerType";
import { isIndirectUnit, isDirectUnit } from "../../gameData/unitTypes";

export const coMax: CommandingOfficer = {
    name: "Max",
    copSize: 3,
    scopSize: 3,
    
    d2dAttackBonus: (data) => {
        if(isDirectUnit(data.unitName)){
            return 20;
        }
        else if(isIndirectUnit(data.unitName)) {
            return -10;
        }
        else return 0;
    },
    d2dDefenseBonus: (data, atkUnit) => 0,
    copAttackBonus: (data) => {
        if(isDirectUnit(data.unitName)){
            return 40;
        }
        else if(isIndirectUnit(data.unitName)) {
            return 0;
        }
        else return 10;
    },
    copDefenseBonus: (data, atkUnit) => 10,
    scopAttackBonus: (data) => {
        if(isDirectUnit(data.unitName)){
            return 60;
        }
        else if(isIndirectUnit(data.unitName)) {
            return 0;
        }
        else return 10;
    },
    scopDefenseBonus: (data, atkUnit) => 10,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}