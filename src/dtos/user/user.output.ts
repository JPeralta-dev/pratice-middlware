import { TokenDto } from "../token/token.output";

export interface LoginResponseDTO {
  user: userDto;
  tokens: Record<"accessToken" | "refreshToken", TokenDto>;
}

export interface userDto {
  username: string;
}
