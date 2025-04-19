// src/app/entities/user.model.ts
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // Student specific fields
  age?: number;
  birthDate?: string;
  sex?: string;
  university?: string;
  domain?: string;
  diplomas?: string;
  address?: string;
  phoneNumber?: string;
  secondaryEmail?: string;
  cvFile?: File;

  // Company specific fields
  companyName?: string;
  companyLocation?: string;
  companyAge?: number;
  companyDomain?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyAddress?: string;
  companyLogo?: File;

  phone?: string;
  profileImage?: string;
}
