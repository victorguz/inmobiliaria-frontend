export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Usuario {
  id?: string;
  username?: string;
  password?: string;
  users?: Usuario[];
}

