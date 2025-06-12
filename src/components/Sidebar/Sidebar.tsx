import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import teacher from '../../assets/1.png';
import department from '../../assets/2.png';
import library from '../../assets/3.png';
import addTeacher from '../../assets/4.png';

import logo from '../../assets/Final Logo 3.png';
import selectedBg from '../../assets/selected.png';


import { Menu as MenuIcon } from '@mui/icons-material';
const menuItems = [
  { text: 'Teachers', icon: teacher, active: true },
  { text: 'Department', icon: department},
  { text: 'Library', icon: library},
  { text: 'Add Teacher', icon: addTeacher},
];

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('Teachers');

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: '20vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '20vw',
          boxSizing: 'border-box',
          bgcolor: '#194895',
          color: 'white',
          border: 'none',
          borderRadius: '0px 40px 0px 0px',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-around'}}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{width: '50px', height: '50px'}}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '24px',
            color: 'white',
          }}
        >
          QMS
        </Typography>
        <MenuIcon sx={{color: 'white' }} />
      </Box>

      <List sx={{ px: 2, py: 4 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding 
            sx={{ mb: 1 }}
            onClick={() => setSelectedItem(item.text)}
          >
            <ListItemButton
              sx={{
                position: 'relative',
                borderRadius: 1,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '&::before': selectedItem === item.text ? {
                  height: '210%',
                  content: '""',
                  position: 'absolute',
                  right: -27,
                  top: -34,
                  width: '219px',
                  backgroundImage: `url(${selectedBg})`,
                  backgroundPosition: 'right center',
                  backgroundRepeat: 'no-repeat',
                  zIndex: -1,
                } : {}
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: selectedItem === item.text ? '#194895' : 'white', 
                  minWidth: 40,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <img src={item.icon} alt={item.text} style={{ width: '45px', height: '45px' }} />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  display:'flex',
                  justifyContent:'center',
                  fontSize: '16px',
                  fontWeight: selectedItem === item.text ? 600 : 400,
                  color: selectedItem === item.text ? '#194895' : 'white',
                  position: 'relative',
                  zIndex: 1
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 