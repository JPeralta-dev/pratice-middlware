import { AuthTokenDto } from "../token/token.output";

export interface LoginResponseDTO {
  user: userDto;
  tokens: AuthTokenDto;
}

export interface userDto {
  username: string;
}
