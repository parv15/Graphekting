import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Teacher } from '../../../src/types';

interface StatusChipProps {
  status: Teacher['status'];
}

const getStatusColor = (status: Teacher['status']) => {
  switch (status) {
    case 'Active':
      return {
        color: '#027A48',
        bgColor: '#ECFDF3',
      };
    case 'Inactive':
      return {
        color: '#B42318',
        bgColor: '#FEF3F2',
      };
    case 'Blocked':
      return {
        color: '#B42318',
        bgColor: '#FEF3F2',
      };
    case 'Suspended':
      return {
        color: '#B54708',
        bgColor: '#FFFAEB',
      };
    default:
      return {
        color: '#344054',
        bgColor: '#F2F4F7',
      };
  }
};

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const { color, bgColor } = getStatusColor(status);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: '22px',
        px: 1,
        borderRadius: '16px',
        backgroundColor: bgColor,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: color,
          mr: 1,
        }}
      />
      <Typography
        sx={{
          fontSize: '12px',
          lineHeight: 1,
          fontWeight: 500,
          color: color,
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};

export default StatusChip; 