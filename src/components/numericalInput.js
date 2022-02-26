import {
  Box,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import * as React from 'react';

/**
 *
 * @param {*} param0
 * @return {React.Component}
 */
export default function numericalInput({value, onChangeSetter, label}) {
  const prefix = label.trim().toLowerCase().replace(/\s+/, '-');
  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id={prefix+'-select-label'}>{label}</InputLabel>
        <TextField
          labelId={prefix+'-select-label'}
          id={prefix+'-select'}
          inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          value={value}
          label={label}
          onChange={onChangeSetter}
        >
        </TextField>
      </FormControl>
    </Box>
  );
}
