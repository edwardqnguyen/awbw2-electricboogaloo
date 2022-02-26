import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import * as React from 'react';

/**
 *
 * @param {*} param0
 * @return {React.Component}
 */
export default function SelectBox({value, onChangeSetter, label, valueList}) {
  const prefix = label.trim().toLowerCase().replace(/\s+/, '-');
  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id={prefix+'-select-label'}>{label}</InputLabel>
        <Select
          labelId={prefix+'-select-label'}
          id={prefix+'-select'}
          value={value}
          label={label}
          onChange={onChangeSetter}
        >
          {
            valueList.map((value) => {
              return <MenuItem key={value} value={value}>{value}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
