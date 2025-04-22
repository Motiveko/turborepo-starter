export interface User {
  id: number;
  email: string;
  displayName: string;
  avatarUrl: string;
}

export interface CreateUserDto {
  email: string;
  displayName: string;
}

export interface PatchUserDto {
  displayName?: string;
  avatarUrl?: string;
}

export interface UserResponseDto {
  id: number;
  email: string;
  displayName: string;
  avatarUrl: string;
  createdAt: Date;
}
