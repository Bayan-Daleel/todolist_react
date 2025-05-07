import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Snakebar = ({openSnakeBar ,handleCloseSnake ,titleSnakeBar}) => {

  return (
    <div>
  <Snackbar
   open={openSnakeBar} autoHideDuration={3000} onClose={handleCloseSnake}>
        <Alert
          onClose={handleCloseSnake}
          severity="success"
          variant="filled"
          sx={{ width: '100%' ,
          }}
        >
          {titleSnakeBar}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Snakebar