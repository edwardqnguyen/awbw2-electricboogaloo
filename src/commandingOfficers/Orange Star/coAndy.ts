import { CommandingOfficer } from "../commandingOfficerType";

export const coAndy: CommandingOfficer = {
    name: "Andy",
    copSize: 3,
    scopSize: 3,
    
    d2dAttackBonus: (data) => 0,
    d2dDefenseBonus: (data, atkUnit) => 0,
    copAttackBonus: (data) => 10,
    copDefenseBonus: (data, atkUnit) => 10,
    scopAttackBonus: (data) => 20,
    scopDefenseBonus: (data, atkUnit) => 10,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}