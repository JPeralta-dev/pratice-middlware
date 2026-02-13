export interface TokenDto {
  token: string;
  tokenType: string;
}

export interface AuthTokenDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
}
