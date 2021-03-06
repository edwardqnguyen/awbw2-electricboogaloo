type PowerStatus = "D2D" | "COP" | "SCOP";
type UnitCombatData = {
    unitName: string;
    terrain: string;
    funds: number;
    commTowers: number;
    cities: number;
    powerStatus: PowerStatus;
}

// Commanding officers will often have bonuses tied to their D2D/CO/SCO powers.
// Constants to represent these should be of the form <CO>_<UnitType>_<PowerStatus>_<BonusType>
export const DEFAULT_POWER_ATK_BONUS = 10;
export const DEFAULT_POWER_DEF_BONUS = 10;
export const DEFAULT_BADLUCKMAX = 0;
export const DEFAULT_GOODLUCKMAX = 9;
export const POWER_STATUS_OPTIONS = ["D2D", "COP", "SCOP"];

export interface CommandingOfficer {
    name: string;
    copSize: number;
    scopSize: number;
    
    attackBonus: (data: UnitCombatData) => number;
    counterAttackBonus: (data: UnitCombatData) => number;
    defenseBonus: (data: UnitCombatData, atkUnit: string) => number;
    moveBonus: (data: UnitCombatData) => number;

    goodLuckMax: (powerStatus: PowerStatus) => number;
    badLuckMax: (powerStatus: PowerStatus) => number;

    applyCOPower: (game: any) => null;
    applySCOPower: (game: any) => null;

}