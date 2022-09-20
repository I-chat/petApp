export interface UserWithPassword {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

export interface UserCredential {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  userStatus: number;
}
