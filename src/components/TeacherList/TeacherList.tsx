import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Pagination,
} from '@mui/material';
import { KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';
import type { Teacher, TableState, FilterOptions } from '../../../src/types';
import StatusChip from './StatusChip';
import { mockTeachers } from '../../data/mockData';

interface TeacherListProps {
  searchQuery: string;
  filters: FilterOptions;
}

const TeacherList: React.FC<TeacherListProps> = ({ searchQuery, filters }) => {
  const [tableState, setTableState] = useState<{ page: number; rowsPerPage: number }>({
    page: 1,
    rowsPerPage: 10,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setTableState(prev => ({ ...prev, page: value }));
  };

  const filteredData = mockTeachers.filter(teacher => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      teacher.teacherName.toLowerCase().includes(searchLower) ||
      teacher.teacherId.toLowerCase().includes(searchLower) ||
      teacher.department.toLowerCase().includes(searchLower);

    const matchesDepartment =
      !filters.department?.length ||
      filters.department.includes(teacher.department);

    const matchesStatus =
      !filters.status?.length ||
      filters.status.includes(teacher.status);

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const paginatedData = filteredData.slice(
    (tableState.page - 1) * tableState.rowsPerPage,
    tableState.page * tableState.rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>


      <TableContainer 
        component={Paper} 
        sx={{ 
          mb: 3,
          boxShadow: 'none',
          border: 'none',
          overflow: 'hidden',
          width: '100%',
          p: 0,
          m: 0,
        }}
      >
        <Table sx={{ width: '100%', m: 0, p: 0 }}>
          <TableHead sx={{backgroundColor:'#034DB0',borderRadius:50 , border:'none' , marginBottom:'1rem'}} >
            <TableRow hover={false} sx={{'&:hover':{backgroundColor:'transparent'}}} >
              <TableCell sx={{ pl: 3 , borderRadius:'25px 0 0 25px'}}>Record ID</TableCell>
              <TableCell>Teacher Name</TableCell>
              <TableCell>Teacher Id</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ pr: 3 , borderRadius:'0 25px 25px 0' }}>All Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(teacher => (
              <TableRow key={teacher.recordId}>
                <TableCell sx={{ pl: 3 }}>{teacher.recordId}</TableCell>
                <TableCell>{teacher.teacherName}</TableCell>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.student}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StatusChip status={teacher.status} />
                    <IconButton size="small" sx={{ p: 0 }}>
                      <ArrowDownIcon sx={{ fontSize: 16, color: '#98A2B3' }} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell sx={{ pr: 3 }}>
                  <Typography
                    sx={{ 
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#1570EF',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#175CD3',
                      },
                    }}
                  >
                    View More {'>'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'2rem' }}>
        <Pagination
          count={Math.ceil(filteredData.length / tableState.rowsPerPage)}
          page={tableState.page}
          onChange={handlePageChange}
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px',
              fontWeight: 500,
              color: '#344054',
              '&.Mui-selected': {
                backgroundColor: '#F9F5FF',
                color: '#1570EF',
                '&:hover': {
                  backgroundColor: '#F9F5FF',
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TeacherList; 