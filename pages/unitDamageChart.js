import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import unitLoader from '../src/dataLoaders/unitLoader';
import damageMatrixLoader from '../src/dataLoaders/damageMatrixLoader';
import * as React from 'react';

// TODO: replace with awbw assets
/**
 *
 * @param {string} unitName
 * @return {any} representation of that unit.
 */
function getUnitRepresentation(unitName) {
  return 'x';
}

/**
 * Root of application, currently set to damage calculator
 * as part of milestone 1
 * @return {div} Homepage div
 */
export default function unitDamageChart({unitArray, dmgMatrix}) {
  const unitList = unitArray;
  const damageMatrix = dmgMatrix;
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell/>
            {
              unitList.map((unit) => (
                <TableCell align='center'>
                  {getUnitRepresentation(unit)}
                </TableCell>
              ))
            }
          </TableHead>
          <TableBody>
            {
              damageMatrix.map((row, i) => (
                <TableRow>
                  <TableCell align='center'>
                    {getUnitRepresentation(unitArray[i])}
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
