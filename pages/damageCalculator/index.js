import unitLoader from '../../src/dataLoaders/unitLoader';
import damageMatrixLoader from '../../src/dataLoaders/damageMatrixLoader';
import {terrainDefenseDict, terrainNames} from '../../src/dataHelpers/terrainHelpers';
import {POWER_STATUS_OPTIONS} from '../../src/commandingOfficers/commandingOfficerType';
import {coLibrary} from '../../src/commandingOfficers/coLibrary';
import {isAirUnit} from '../../src/dataHelpers/unitHelpers';
import {damageEquationCalculator, damageRangeCalculator} from '../../src/engine/combatCalculator';
import selectBox from '../../src/components/selectBox';
import numericalInput from '../../src/components/numericalInput';
import * as React from 'react';
import {range} from 'lodash';

/**
 * @return {React.Component} React Component representing damage calculator
 */
export default function damageCalculator({unitArray, dmgMatrix}) {
  // Game Data Lists.
  const unitList = unitArray;
  const damageMatrix = dmgMatrix;
  const terrainList = terrainNames;
  const availableCOS = Object.keys(coLibrary);
  // This gives [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // See: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  const hpValues = Array.from({length: 10}, (_, i) => i+1);

  // state variables and setter definitions
  const [atkUnit, setAtkUnit] = React.useState(unitList[0]);
  const [defUnit, setDefUnit] = React.useState(unitList[0]);
  const [atkHP, setAtkHP] = React.useState(10);
  const [defHP, setDefHP] = React.useState(10);
  const [atkCO, setAtkCO] = React.useState(availableCOS[0]);
  const [defCO, setDefCO] = React.useState(availableCOS[0]);
  const [atkFunds, setAtkFunds] = React.useState(0);
  const [defFunds, setDefFunds] = React.useState(0);
  const [atkCommTower, setAtkCommTower] = React.useState(0);
  const [defCommTower, setDefCommTower] = React.useState(0);
  const [atkTerrain, setAtkTerrain] = React.useState(terrainList[0]);
  const [defTerrain, setDefTerrain] = React.useState(terrainList[0]);
  const [atkCities, setAtkCities] = React.useState(0);
  const [defCities, setDefCities] = React.useState(0);
  const [atkPowerStatus, setAtkPowerStatus] = React.useState(POWER_STATUS_OPTIONS[0]);
  const [defPowerStatus, setDefPowerStatus] = React.useState(POWER_STATUS_OPTIONS[0]);

  // combat data to send to Commanding Officer to calculate attack and defense bonuses
  const atkUnitCombatData = {
    unitName: atkUnit,
    terrain: atkTerrain,
    funds: atkFunds,
    commTowers: atkCommTower,
    cities: atkCities,
    powerStatus: atkPowerStatus,
  };

  const defUnitCombatData = {
    unitName: defUnit,
    terrainDefense: defTerrain,
    funds: defFunds,
    commTowers: defCommTower,
    cities: defCities,
    powerStatus: defPowerStatus,
  };

  // Helpers
  const getDamageBase = (atk, def) => {
    const atkUnitIndex = unitList.indexOf(atk);
    const defUnitIndex = unitList.indexOf(def);
    return damageMatrix[atkUnitIndex][defUnitIndex];
  };

  const onChangeHelper = (setter) => {
    const helper = (event) => {
      setter(event.target.value);
    };
    return helper;
  };

  const getCombatDamageRange = () => {
    const atkCOObject = coLibrary[atkCO];
    const defCOObject = coLibrary[defCO];
    const atkBonus = 10*atkCommTower + atkCOObject.attackBonus(atkUnitCombatData);
    const terrainDef = isAirUnit(defUnit) ? 0 : terrainDefenseDict[defTerrain];
    const defBonus = defCOObject.defenseBonus(defUnitCombatData, atkUnit);

    const {baseAttack: base, modifier: mod} = damageEquationCalculator(getDamageBase(atkUnit, defUnit),
        100+atkBonus, 100+defBonus, terrainDef, atkHP, defHP);
    const badLuck = atkCOObject.badLuckMax(atkPowerStatus);
    const goodLuck = atkCOObject.goodLuckMax(atkPowerStatus);
    const damageRange = damageRangeCalculator(base, mod, badLuck, goodLuck);
    return damageRange;
  };

  const getCounterAttackDamageRange = (possibleHealths) => {
    return possibleHealths.map((health) => {
      const atkCOObject = coLibrary[atkCO];
      const defCOObject = coLibrary[defCO];
      const counterAtkBonus = 10*defCommTower + defCOObject.attackBonus(defUnitCombatData) + defCOObject.counterAttackBonus(defUnitCombatData);
      const terrainDef = isAirUnit(atkUnit) ? 0 : terrainDefenseDict[atkTerrain];
      const defBonus = atkCOObject.defenseBonus(atkUnitCombatData, defUnit);

      const {baseAttack: base, modifier: mod} = damageEquationCalculator(getDamageBase(defUnit, atkUnit),
          100+counterAtkBonus, 100+defBonus, terrainDef, health, atkHP);
      const badLuck = defCOObject.badLuckMax(defPowerStatus);
      const goodLuck = defCOObject.goodLuckMax(defPowerStatus);
      const damageRange = damageRangeCalculator(base, mod, badLuck, goodLuck);
      return damageRange;
    });
  };

  const getCombatReport = () => {
    const atkDamageRange = getCombatDamageRange();
    const defHPRange = atkDamageRange.map((dmg) => defHP - (dmg-(dmg%10))/10);
    const defHPValues = range(defHPRange[0], defHPRange[1]+1);
    const counterDamageRange = getCounterAttackDamageRange(defHPValues);
    let report =`Attack Damage Range is: ${atkDamageRange.toString()}\n`;
    report += `Counter Attack Damage Range is: \n`;
    counterDamageRange.forEach((dmgRange, i) => {
      report += `At ${defHPValues[i]} health: ${dmgRange}\n`;
    });
    return report;
  };

  return (
    <>
      {
        selectBox({ // Atk Unit
          value: atkUnit,
          onChangeSetter: onChangeHelper(setAtkUnit),
          label: 'Attacking Unit',
          valueList: unitList,
        })
      }
      {
        selectBox({ // Def Unit
          value: defUnit,
          onChangeSetter: onChangeHelper(setDefUnit),
          label: 'Defending Unit',
          valueList: unitList,
        })
      }
      {
        selectBox({ // Atk HP
          value: atkHP,
          onChangeSetter: onChangeHelper(setAtkHP),
          label: 'Attacking Unit HP',
          valueList: hpValues,
        })
      }
      {
        selectBox({ // Def HP
          value: defHP,
          onChangeSetter: onChangeHelper(setDefHP),
          label: 'Defending Unit HP',
          valueList: hpValues,
        })
      }
      {
        selectBox({ // Atk Terrian
          value: atkTerrain,
          onChangeSetter: onChangeHelper(setAtkTerrain),
          label: 'Attacking Terrain',
          valueList: terrainList,
        })
      }
      {
        selectBox({ // Def Terrain
          value: defTerrain,
          onChangeSetter: onChangeHelper(setDefTerrain),
          label: 'Defending Terrain',
          valueList: terrainList,
        })
      }
      {
        selectBox({ // Atk CO
          value: atkCO,
          onChangeSetter: onChangeHelper(setAtkCO),
          label: 'Attacking CO',
          valueList: availableCOS,
        })
      }
      {
        selectBox({ // Def CO
          value: defCO,
          onChangeSetter: onChangeHelper(setDefCO),
          label: 'Defending CO',
          valueList: availableCOS,
        })
      }
      {
        selectBox({ // Atk Power Status
          value: atkPowerStatus,
          onChangeSetter: onChangeHelper(setAtkPowerStatus),
          label: 'Attacker Power Status',
          valueList: POWER_STATUS_OPTIONS,
        })
      }
      {
        selectBox({ // Def Power Status
          value: defPowerStatus,
          onChangeSetter: onChangeHelper(setDefPowerStatus),
          label: 'Defender Power Status',
          valueList: POWER_STATUS_OPTIONS,
        })
      }
      {
        numericalInput({ // Atk Funds
          value: atkFunds,
          onChangeSetter: onChangeHelper(setAtkFunds),
          label: 'Attacker Funds',
        })
      }
      {
        numericalInput({ // Def Funds
          value: defFunds,
          onChangeSetter: onChangeHelper(setDefFunds),
          label: 'Defender Funds',
        })
      }
      {
        numericalInput({ // Atk Comm Towers
          value: atkCommTower,
          onChangeSetter: onChangeHelper(setAtkCommTower),
          label: 'Attacker Comm Towers',
        })
      }
      {
        numericalInput({ // Def Comm Towers
          value: defCommTower,
          onChangeSetter: onChangeHelper(setDefCommTower),
          label: 'Defender Comm Towers',
        })
      }
      {
        numericalInput({ // Atk Cities
          value: atkCities,
          onChangeSetter: onChangeHelper(setAtkCities),
          label: 'Attacker Cities',
        })
      }
      {
        numericalInput({ // Def Cities
          value: defFunds,
          onChangeSetter: onChangeHelper(setDefCities),
          label: 'Defender Cities',
        })
      }
      <text>
        {'Stuff '+ getCombatReport()}
      </text>
    </>
  );
}

/**
 * Runs file loading server side.
 * @return {Object} JSON Object with relevant damage data.
 */
export async function getServerSideProps() {
  const uA = unitLoader('src/gameData/units.txt');
  const dM = damageMatrixLoader('src/gameData/damage-matrix.txt');

  return {
    props: {unitArray: uA, dmgMatrix: dM},
  };
}
