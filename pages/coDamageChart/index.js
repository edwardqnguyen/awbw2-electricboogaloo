import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {styled} from '@mui/system';
import unitLoader from '../../src/dataLoaders/unitLoader';
import {unitToImageSrc, coToImageSrc} from '../../src/dataHelpers/imageHelpers';
import {coLibrary} from '../../src/commandingOfficers/coLibrary';
import * as React from 'react';

const topFaction = 'CobaltIce';
const version = 'AW2';

/**
 * Generates sample combat data for atk/def bonus calculation
 * @param {string} unit
 * @param {string} powerStatus
 * @return {any} combat data
 */
function getSampleCombatData(unit, powerStatus) {
  return {
    unitName: unit,
    terrain: 'Shoal',
    funds: 0,
    commTowers: 0,
    cities: 0,
    powerStatus: powerStatus,
  };
}
/**
 * Generates text display for co and unit
 * @param {string} co
 * @param {string} unit
 * @return {any} combat data
 */
function getCombatDisplay(co, unit) {
  const d2dAtkBonus = coLibrary[co].attackBonus(getSampleCombatData(unit, 'D2D'));
  const d2dDefBonus = coLibrary[co].defenseBonus(getSampleCombatData(unit, 'D2D'), 'Tank');
  const copAtkBonus = coLibrary[co].attackBonus(getSampleCombatData(unit, 'COP')) - d2dAtkBonus;
  const copDefBonus = coLibrary[co].defenseBonus(getSampleCombatData(unit, 'COP'), 'Tank') - d2dDefBonus;
  const scopAtkBonus = coLibrary[co].attackBonus(getSampleCombatData(unit, 'SCOP')) - d2dAtkBonus;
  const scopDefBonus = coLibrary[co].defenseBonus(getSampleCombatData(unit, 'SCOP'), 'Tank') - d2dDefBonus;

  const d2dLine = (100+d2dAtkBonus)+'/'+(100+d2dDefBonus);
  const copLine = '+'+copAtkBonus+'/+'+copDefBonus;
  const scopLine = '+'+scopAtkBonus+'/+'+scopDefBonus;

  return (
    <>
      <span>{d2dLine}</span>
      <span className="copLine">{copLine}</span>
      <span className="scopLine">{scopLine}</span>
    </>
  );
}

const Root = styled('div')(
    ({theme}) => `
    span {
      display: block
    }
    .copLine {
      color: red
    }
    .scopLine {
      color: blue
    }
  `,
);

/**
   * CO Atk/Def Bonus Chart for D2D/COP/SCOP
   * @return {div} Homepage div
   */
export default function coDamageChart({unitArray}) {
  const unitList = unitArray;
  const availableCOS = Object.keys(coLibrary);
  return (
    <Root>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell align='center'>CO</TableCell>
            {
              unitList.map((unit) => (
                <TableCell align='center'>
                  <img src={unitToImageSrc(unit, topFaction)}/>
                </TableCell>
              ))
            }
          </TableHead>
          <TableBody>
            {
              availableCOS.map((co) => (
                <TableRow>
                  <TableCell align='center'>
                    <img src={coToImageSrc(co, version)}/>
                  </TableCell>
                  {
                    unitList.map((unit) => (
                      <TableCell align='center' display='block'>
                        {
                          getCombatDisplay(co, unit)
                        }
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
}

/**
   * Runs file loading server side.
   * @return {Object} JSON Object with relevant damage data.
   */
export async function getServerSideProps() {
  const uA = unitLoader('src/gameData/units.txt');

  return {
    props: {unitArray: uA},
  };
}
