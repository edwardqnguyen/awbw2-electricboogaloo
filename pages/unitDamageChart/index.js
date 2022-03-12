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
import damageMatrixLoader from '../../src/dataLoaders/damageMatrixLoader';
import {unitToImageSrc} from '../../src/dataHelpers/imageHelpers';
import * as React from 'react';

const topFaction = 'CobaltIce';
const sideFaction = 'RedFire';

const Root = styled('div')(
    ({theme}) => `
  td {
    width:0.1%;
    white-space: nowrap;
    } 
`,
);

/**
 * Unit on Unit Base Damage Chart
 * @return {div} Homepage div
 */
export default function unitDamageChart({unitArray, dmgMatrix}) {
  const unitList = unitArray;
  const damageMatrix = dmgMatrix;
  return (
    <Root>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell/>
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
              damageMatrix.map((row, i) => (
                <TableRow>
                  <TableCell align='center'>
                    <img src={unitToImageSrc(unitList[i], sideFaction)}/>
                  </TableCell>
                  {
                    row.map((element) => (
                      <TableCell align='center'>{element === 0 ? '-':element}</TableCell>
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
  const dM = damageMatrixLoader('src/gameData/damage-matrix.txt');

  return {
    props: {unitArray: uA, dmgMatrix: dM},
  };
}
