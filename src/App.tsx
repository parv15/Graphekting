import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import TeacherList from './components/TeacherList/TeacherList';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import type { FilterOptions } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#344054',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '& .MuiTableCell-root': {
            color: 'white',
            fontWeight: 500,
            fontSize: '12px',
            border:'none',
            '&:hover':{
            backgroundColor:'transparent'
           }
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#EAECF0',
          padding: '16px 24px',
          fontSize: '14px',
          color: '#101828',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F9FAFB',
          },
        },
      },
    },
  },
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<any>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      console.log(debouncedSearch)
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', width: '20vw' }}>
        <Sidebar />
        <Box 
          sx={{ 
            flexGrow: 1,
            display: 'flex', 
            flexDirection: 'column',
            minWidth: 0, // This prevents flex items from overflowing
          }}
        >
          <Header  onSearch={handleSearch} onFilterChange={handleFilterChange} />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              bgcolor: '#FFFFFF',
            
              width: '80vw'
            }}
          >
            <TeacherList searchQuery={debouncedSearch} filters={filters} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
