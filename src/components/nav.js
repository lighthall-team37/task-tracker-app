import React from "react";
import {logout} from '../base'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar () {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ background: '#626262' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Tracker
          </Typography>
          <Button onClick={logout} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
