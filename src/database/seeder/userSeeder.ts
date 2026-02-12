import { UserRole } from '../entities/user.entity';

export interface UserSeed {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const adminSeeds: UserSeed[] = [
  {
    name: 'Admin A',
    email: 'adminA@example.com',
    password: 'admin123',
    role: UserRole.ADMIN,
  },
  {
    name: 'Admin B',
    email: 'adminB@example.com',
    password: 'admin123',
    role: UserRole.ADMIN,
  },
];

export const customerSeeds: UserSeed[] = [
  {
    name: 'Customer One',
    email: 'cust1@example.com',
    password: 'customer123',
    role: UserRole.CUSTOMER,
  },
  {
    name: 'Customer Two',
    email: 'cust2@example.com',
    password: 'customer123',
    role: UserRole.CUSTOMER,
  },
  {
    name: 'Customer Three',
    email: 'cust3@example.com',
    password: 'customer123',
    role: UserRole.CUSTOMER,
  },
  {
    name: 'Customer Four',
    email: 'cust4@example.com',
    password: 'customer123',
    role: UserRole.CUSTOMER,
  },
  {
    name: 'Customer Five',
    email: 'cust5@example.com',
    password: 'customer123',
    role: UserRole.CUSTOMER,
  },
  {
    name: 'Customer Six',
    email: 'cust6@example.com',
    password: 'customer123',
    role: UserRole.CUSTOMER,
  },
  {
    name: 'Customer Seven',
    email: 'cust7@example.com',
    password: 'customer123',
    role: UserRole.CUSTOMER,
  },
];
