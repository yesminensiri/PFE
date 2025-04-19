export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  governorate?: string;
  birthDate?: Date;
  gender?: string;
  education?: {
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
    gpa: number;
  };
  skills?: string[];
  languages?: string[];
  interests?: string[];
  resume?: File;
  coverLetter?: File;
  portfolio?: File;
  profilePicture?: string;
  role: 'admin' | 'student' | 'company';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 