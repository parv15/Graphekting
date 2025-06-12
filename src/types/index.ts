export interface Teacher {
  recordId: number;
  teacherId: string;
  teacherName: string;
  department: string;
  student: number;
  status: 'Active' | 'Inactive' | 'Blocked' | 'Suspended';
}

export interface FilterOptions {
  department?: string[];
  status?: string[];
}

export interface TableState {
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  filters: FilterOptions;
}

export type Department = 'Finance' | 'Engineer' | 'Arts' | 'All'; 