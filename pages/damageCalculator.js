import unitLoader from '../src/dataLoaders/unitLoader';
import damageMatrixLoader from '../src/dataLoaders/damageMatrixLoader';
import terrainLoader from '../src/dataLoaders/terrainLoader';
import {terrainDefenseDict} from '../src/dataHelpers/terrainHelpers';
import {POWER_STATUS_OPTIONS} from '../src/commandingOfficers/commandingOfficerType';
import {coLibrary} from '../src/commandingOfficers/coLibrary';
import {isAirUnit} from '../src/dataHelpers/unitHelpers';
import {damageEquationCalculator, damageRangeCalculator} from '../src/engine/combatCalculator';
import selectBox from '../src/components/selectBox';
import numericalInput from '../src/components/numericalInput';
import * as React from 'react';

/**
 * @return {React.Component} React Component representing damage calculator
 */
export default function damageCalculator({unitArray, dmgMatrix, terrainArray}) {
  // Game Data Lists.
  const unitList = unitArray;
  const damageMatrix = dmgMatrix;
  const terrainList = terrainArray;
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
  const getDamageBase = () => {
    const atkUnitIndex = unitList.indexOf(atkUnit);
    const defUnitIndex = unitList.indexOf(defUnit);
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


    const {baseAttack: base, modifier: mod} = damageEquationCalculator(getDamageBase(), 100+atkBonus, 100+defBonus, terrainDef, atkHP, defHP);
    const badLuck = atkCOObject.badLuckMax(atkPowerStatus);
    const goodLuck = atkCOObject.goodLuckMax(atkPowerStatus);
    const damageRange = damageRangeCalculator(base, mod, badLuck, goodLuck);
    return damageRange;
  };

  return (
    <>
      {
        selectBox({
          value: atkUnit,
          onChangeSetter: onChangeHelper(setAtkUnit),
          label: 'Attacking Unit',
          valueList: unitList,
        })
      }
      {
        selectBox({
          value: defUnit,
          onChangeSetter: onChangeHelper(setDefUnit),
          label: 'Defending Unit',
          valueList: unitList,
        })
      }
      {
        selectBox({
          value: atkHP,
          onChangeSetter: onChangeHelper(setAtkHP),
          label: 'Attacking Unit HP',
          valueList: hpValues,
        })
      }
      {
        selectBox({
          value: defHP,
          onChangeSetter: onChangeHelper(setDefHP),
          label: 'Defending Unit HP',
          valueList: hpValues,
        })
      }
      {
        selectBox({
          value: atkTerrain,
          onChangeSetter: onChangeHelper(setAtkTerrain),
          label: 'Attacking Terrain',
          valueList: terrainList,
        })
      }
      {
        selectBox({
          value: defTerrain,
          onChangeSetter: onChangeHelper(setDefTerrain),
          label: 'Defending Terrain',
          valueList: terrainList,
        })
      }
      {
        selectBox({
          value: atkCO,
          onChangeSetter: onChangeHelper(setAtkCO),
          label: 'Attacking CO',
          valueList: availableCOS,
        })
      }
      {
        selectBox({
          value: defCO,
          onChangeSetter: onChangeHelper(setDefCO),
          label: 'Defending CO',
          valueList: availableCOS,
        })
      }
      {
        selectBox({
          value: atkPowerStatus,
          onChangeSetter: onChangeHelper(setAtkPowerStatus),
          label: 'Attacker Power Status',
          valueList: POWER_STATUS_OPTIONS,
        })
      }
      {
        selectBox({
          value: defPowerStatus,
          onChangeSetter: onChangeHelper(setDefPowerStatus),
          label: 'Defender Power Status',
          valueList: POWER_STATUS_OPTIONS,
        })
      }
      {
        numericalInput({
          value: atkFunds,
          onChangeSetter: onChangeHelper(setAtkFunds),
          label: 'Attacker Funds',
        })
      }
      {
        numericalInput({
          value: defFunds,
          onChangeSetter: onChangeHelper(setDefFunds),
          label: 'Defender Funds',
        })
      }
      {
        numericalInput({
          value: atkCommTower,
          onChangeSetter: onChangeHelper(setAtkCommTower),
          label: 'Attacker Comm Towers',
        })
      }
      {
        numericalInput({
          value: defCommTower,
          onChangeSetter: onChangeHelper(setDefCommTower),
          label: 'Defender Comm Towers',
        })
      }
      {
        numericalInput({
          value: atkCities,
          onChangeSetter: onChangeHelper(setAtkCities),
          label: 'Attacker Cities',
        })
      }
      {
        numericalInput({
          value: defFunds,
          onChangeSetter: onChangeHelper(setDefCities),
          label: 'Defender Cities',
        })
      }
      <text>
        Damage Range is: {getCombatDamageRange().toString()}
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
  const tA = terrainLoader('src/gameData/terrain.txt');

  return {
    props: {unitArray: uA, dmgMatrix: dM, terrainArray: tA},
  };
}
