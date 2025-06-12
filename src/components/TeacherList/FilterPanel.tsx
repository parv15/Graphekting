import React, { useState } from 'react';
import {
  Box,
  Button,
  Popover,
  Typography,
  Checkbox,
  Divider,
  IconButton,
  Collapse,
} from '@mui/material';
import { FilterList as FilterIcon, ExpandMore, ExpandLess, Close as CloseIcon, TuneRounded } from '@mui/icons-material';
import type { FilterOptions } from '../../../src/types';

const departments = ['Finance', 'Engineer', 'Arts'];
const statuses = [
  { label: 'Active', color: '#27C200' },
  { label: 'Inactive', color: '#FFB800' },
  { label: 'Blocked', color: '#F04438' },
  { label: 'Suspended', color: '#FFB800' },
];

const FilterPanel: React.FC<{ onFilterChange: (filters: FilterOptions) => void }> = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [openDept, setOpenDept] = useState(true);
  const [openStatus, setOpenStatus] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  // Department logic
  const handleDepartmentChange = (department: string) => {
    let newSelection: string[];
    if (department === 'All') {
      newSelection = [];
    } else {
      newSelection = selectedDepartments.includes(department)
        ? selectedDepartments.filter(d => d !== department)
        : [...selectedDepartments, department];
    }
    setSelectedDepartments(newSelection);
    onFilterChange({ department: newSelection, status: selectedStatuses });
  };
  const clearDepartments = () => {
    setSelectedDepartments([]);
    onFilterChange({ department: [], status: selectedStatuses });
  };

  // Status logic
  const handleStatusChange = (status: string) => {
    let newSelection: string[];
    if (status === 'All') {
      newSelection = [];
    } else {
      newSelection = selectedStatuses.includes(status)
        ? selectedStatuses.filter(s => s !== status)
        : [...selectedStatuses, status];
    }
    setSelectedStatuses(newSelection);
    onFilterChange({ department: selectedDepartments, status: newSelection });
  };
  const clearStatuses = () => {
    setSelectedStatuses([]);
    onFilterChange({ department: selectedDepartments, status: [] });
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<TuneRounded sx={{ color: 'white', fontSize: 20 }} />}
        onClick={handleClick}
        sx={{
          ' .MuiButton-startIcon':{
            margin: 0,
          },
          height: '52px',
          minWidth: '52px',
          width: '52px',
          color: '#344054',
          borderColor: '#D0D5DD',
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 500,
          bgcolor: '#034DB0',
          borderRadius: '18px',
          '&:hover': {
            borderColor: '#D0D5DD',
            bgcolor: '#034DB0',
          },
        }}
      >
        
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
            borderRadius: '16px',
            border: '1px solid #EAECF0',
            minWidth: 320,
            p: 0,
          },
        }}
      >
        <Box sx={{ p: '20px 20px 0 20px' }}>
          <Typography sx={{ color: '#101828', fontSize: '16px', fontWeight: 600, mb: 2 }}>
            Data Filters
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#EAECF0', my: 1 }} />
        {/* Department Group */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography
              sx={{
                color: openDept ? '#1570EF' : '#101828',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                flex: 1,
              }}
              onClick={() => setOpenDept(v => !v)}
            >
              Department
            </Typography>
            {selectedDepartments.length > 0 && openDept && (
              <IconButton size="small" onClick={clearDepartments}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => setOpenDept(v => !v)}>
              {openDept ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <Collapse in={openDept}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontSize: '14px', color: '#101828', flex: 1 }}>All</Typography>
                <Checkbox
                  checked={selectedDepartments.length === 0}
                  onChange={() => handleDepartmentChange('All')}
                  size="small"
                />
              </Box>
              {departments.map(department => (
                <Box key={department} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#101828',
                      flex: 1,
                      ...(selectedDepartments.includes(department) && { color: '#1570EF', fontWeight: 600 }),
                    }}
                  >
                    {department}
                  </Typography>
                  <Checkbox
                    checked={selectedDepartments.includes(department)}
                    onChange={() => handleDepartmentChange(department)}
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>
        <Divider sx={{ borderColor: '#EAECF0', my: 1 }} />
        {/* Status Group */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography
              sx={{
                color: openStatus ? '#1570EF' : '#101828',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                flex: 1,
              }}
              onClick={() => setOpenStatus(v => !v)}
            >
              Status
            </Typography>
            {selectedStatuses.length > 0 && openStatus && (
              <IconButton size="small" onClick={clearStatuses}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => setOpenStatus(v => !v)}>
              {openStatus ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <Collapse in={openStatus}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontSize: '14px', color: '#101828', flex: 1 }}>All</Typography>
                <Checkbox
                  checked={selectedStatuses.length === 0}
                  onChange={() => handleStatusChange('All')}
                  size="small"
                />
              </Box>
              {statuses.map(status => (
                <Box key={status.label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#101828',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      ...(selectedStatuses.includes(status.label) && { color: '#1570EF', fontWeight: 600 }),
                    }}
                  >
                    {status.label}
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: status.color,
                        ml: 1,
                      }}
                    />
                  </Typography>
                  <Checkbox
                    checked={selectedStatuses.includes(status.label)}
                    onChange={() => handleStatusChange(status.label)}
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>
      </Popover>
    </>
  );
};

export default FilterPanel;
