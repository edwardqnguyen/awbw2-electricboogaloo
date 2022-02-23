import { CommandingOfficer, DEFAULT_POWER_ATK_BONUS, DEFAULT_POWER_DEF_BONUS } from "../commandingOfficerType";

const ANDY_SCOP_ATK_BONUS = 10;
const ANDY_SCOP_MOVE_BONUS = 1;

export const coAndy: CommandingOfficer = {
    name: "Andy",
    copSize: 3,
    scopSize: 3,
    
    d2dAttackBonus: (data) => 0,
    copAttackBonus: (data) => DEFAULT_POWER_ATK_BONUS,
    scopAttackBonus: (data) => DEFAULT_POWER_ATK_BONUS+ANDY_SCOP_ATK_BONUS,

    d2dDefenseBonus: (data, atkUnit) => 0,
    copDefenseBonus: (data, atkUnit) => DEFAULT_POWER_DEF_BONUS,
    scopDefenseBonus: (data, atkUnit) => DEFAULT_POWER_DEF_BONUS,

    d2dMoveBonus: (data) => 0,
    copMoveBonus: (data) => 0,
    scopMoveBonus: (data) => ANDY_SCOP_MOVE_BONUS,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}