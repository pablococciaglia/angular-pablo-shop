export interface User {
  id: string;
  email: Email;
  fullName: FullName;
  isActive: boolean;
  roles: Role[];
}

export enum Email {
  Test1GoogleCOM = 'test1@google.com',
}

export enum FullName {
  TestOne = 'Test One',
}

export enum Role {
  Admin = 'admin',
}

export enum AuthStatus {
  CHECKING = 'checking',
  AUTHENTICATED = 'authenticated',
  NOT_AUTHENTICATED = 'not-authenticated',
}

export const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$';
