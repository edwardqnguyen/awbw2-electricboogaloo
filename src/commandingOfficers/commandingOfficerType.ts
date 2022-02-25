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

export interface CommandingOfficer {
    name: string;
    copSize: number;
    scopSize: number;
    
    attackBonus: (data: UnitCombatData) => number;
    defenseBonus: (data: UnitCombatData, atkUnit: string) => number;
    moveBonus: (data: UnitCombatData) => number;

    applyCOPower: (game: any) => null;
    applySCOPower: (game: any) => null;

}