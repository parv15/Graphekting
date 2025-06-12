import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Avatar,
  Badge,

} from '@mui/material';
import {
  Search as SearchIcon,
  NotificationsNone as NotificationIcon,
  Menu as MenuIcon,
  ArrowForwardRounded,
  NotificationsNone,
  
} from '@mui/icons-material';
import FilterPanel from '../TeacherList/FilterPanel';
import type { FilterOptions } from '../../types';
import notification from '../../assets/Notification 2.png'
interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onFilterChange }) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        marginTop: '20px',
        bgcolor: 'white',
        width:'80vw'
      }}
    >
      <Toolbar sx={{ gap: 2, px: 3 , display:'flex' , justifyContent:'space-between' ,alignItems:'center' }}>
        <Box>
        <Typography
          variant="h6"
          sx={{
            color: '#101828',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
          }}
        >
          Welcome, User!
        </Typography>
        </Box>
      

        <Box sx={{ display:'flex' , alignItems:'center'}} >

        <TextField
          placeholder="Search here..."
          size="small"
          onChange={(e) => onSearch(e.target.value)}
          sx={{
            width: 280,
            
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              bgcolor: '#E3E3E3',
              '& fieldset': {
                borderColor: '#EAECF0',
              },
              '&:hover fieldset': {
                borderColor: '#D0D5DD',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1570EF',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#667085' }} />
              </InputAdornment>
            ),
            endAdornment:(
              <InputAdornment position="end">
                <ArrowForwardRounded sx={{ color: '#667085' }} />
              </InputAdornment>
            )
          }}
        />
        
        {/* Filter Button */}
        <Box sx={{ ml: 2 }}>
          <FilterPanel onFilterChange={onFilterChange} />
        </Box>
       </Box>
        {/* Notification Bell */}
        <Box sx={{display:'flex' , alignItems:'center'}}>
       <img src={notification} alt="notification" height={30} width={30} style={{marginRight:'1rem'}}/>

        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#F2F4F7',
            color: '#475467',
          }}
        >
          U
        </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 